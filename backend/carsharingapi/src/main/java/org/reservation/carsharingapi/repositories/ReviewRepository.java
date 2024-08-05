package org.reservation.carsharingapi.repositories;

import org.reservation.carsharingapi.models.Review;
import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.models.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    List<Review> findAllByReservation_Vehicle(Vehicle vehicle);

    List<Review> findAllByUser(User user);
}
