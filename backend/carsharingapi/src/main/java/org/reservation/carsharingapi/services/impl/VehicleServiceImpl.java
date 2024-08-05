package org.reservation.carsharingapi.services.impl;

import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.models.Vehicle;
import org.reservation.carsharingapi.repositories.VehicleRepository;
import org.reservation.carsharingapi.services.VehicleService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class VehicleServiceImpl implements VehicleService {

    private final VehicleRepository vehicleRepository;

    @Value("${images.path}")
    private String imagesPath;

    @Override
    public List<Vehicle> getAllVehiclesByOwnerId(User owner) {
        return vehicleRepository.findByOwner(owner);
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @Override
    public Vehicle getVehicleById(int id) {
        return vehicleRepository.findById(id).orElse(null);
    }

    @Override
    public Vehicle createVehicle(Vehicle vehicle, MultipartFile imageFile) {
        if (imageFile != null && !imageFile.isEmpty()) {
            final String path = handleFileUpload(imageFile);
            vehicle.setPhoto(path);
        }
       System.out.println("mail" + vehicle.getOwner().getEmail());
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(Vehicle vehicle, MultipartFile imageFile) {
        final boolean isExistingVehicle = vehicleRepository.existsById(vehicle.getId());
        Vehicle updatedVehicle = null;
        if (isExistingVehicle) {
            Vehicle existingVehicle = vehicleRepository.findById(vehicle.getId()).orElse(null);
            if (imageFile != null && !imageFile.isEmpty()) {
                String path = handleFileUpload(imageFile);
                vehicle.setPhoto(path);
            } else {
                vehicle.setPhoto(existingVehicle.getPhoto());
            }
            updatedVehicle = vehicleRepository.save(vehicle);
        }
        return updatedVehicle;
    }

    @Override
    public void deleteVehicleById(int id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle with id " + id + " does not exist"));
        vehicleRepository.delete(vehicle);
    }

    private String handleFileUpload(MultipartFile imageFile) {
        try {
            final String filename = UUID.randomUUID() + ".png";
            final Path path = Paths.get(imagesPath + filename);
            //if file directory for images does not exist, it will create it
            if (!Files.exists(path.getParent())) {
                Files.createDirectories(path.getParent());
            }
            imageFile.transferTo(path);
            System.out.println("File uploaded successfully!");
            return filename;
        } catch (IOException e) {
            throw new RuntimeException("Error saving file: " + e.getMessage());
        }
    }
}
