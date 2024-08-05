package org.reservation.carsharingapi.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.models.Vehicle;

import org.reservation.carsharingapi.repositories.UserRepository;
import org.reservation.carsharingapi.services.VehicleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    private final VehicleService vehicleService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        final List<Vehicle> vehicleList = vehicleService.getAllVehicles();
        return new ResponseEntity<>(vehicleList, HttpStatus.OK);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Vehicle>> getAllVehicles(@PathVariable("email") final String email) {
        final User user = userRepository.findByEmail(email).orElse(null);
        List<Vehicle> vehicleList = new ArrayList<>();
        if(user != null){
            vehicleList = vehicleService.getAllVehiclesByOwnerId(user);
        }
        return new ResponseEntity<>(vehicleList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable("id") final int id) {
        final Vehicle vehicle = vehicleService.getVehicleById(id);
        return new ResponseEntity<>(vehicle, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestParam("vehicle") String vehicleString,
                                                 @RequestParam("email") String email,
                                               @RequestParam(value = "image") MultipartFile imageFile) throws JsonProcessingException {
        final ObjectMapper objectMapper = new ObjectMapper();
        final Vehicle vehicle = objectMapper.readValue(vehicleString, Vehicle.class);
        final User user = userRepository.findByEmail(email).orElse(null);
        vehicle.setOwner(user);
        final Vehicle createdVehicle = vehicleService.createVehicle(vehicle, imageFile);
        return new ResponseEntity<>(createdVehicle, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Vehicle> updateVehicleById(@RequestParam("vehicle") String vehicleString,
                                                     @RequestParam("email") String email,
                                                   @RequestParam(value="image", required = false) MultipartFile imageFile) throws JsonProcessingException {
        final ObjectMapper objectMapper = new ObjectMapper();
        final Vehicle vehicle = objectMapper.readValue(vehicleString, Vehicle.class);
        final User user = userRepository.findByEmail(email).orElse(null);
        vehicle.setOwner(user);
        final Vehicle updatedVehicle = vehicleService.updateVehicle(vehicle, imageFile);
        return new ResponseEntity<>(updatedVehicle, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable("id") final int id) {
        vehicleService.deleteVehicleById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
