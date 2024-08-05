package org.reservation.carsharingapi.services;

import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.models.Vehicle;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VehicleService {

    List<Vehicle> getAllVehiclesByOwnerId(User user);

    List<Vehicle> getAllVehicles();

    Vehicle getVehicleById(final int id);

    Vehicle createVehicle(final Vehicle vehicle, MultipartFile imageFile);

    Vehicle updateVehicle(final Vehicle vehicle, MultipartFile imageFile);

    void deleteVehicleById(final int id);
}
