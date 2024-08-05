package org.reservation.carsharingapi.repositories;

import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.models.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    List<Vehicle> findByOwner(User owner);
}
