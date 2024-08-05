package org.reservation.carsharingapi.services.impl;

import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.repositories.UserRepository;
import org.reservation.carsharingapi.repositories.VehicleRepository;
import org.reservation.carsharingapi.models.Review;
import org.reservation.carsharingapi.models.Vehicle;
import org.reservation.carsharingapi.repositories.ReviewRepository;
import org.reservation.carsharingapi.services.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    @Override
    public List<Review> getAllReviewsByVehicleId(int vehicleId) {
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle with id " + vehicleId + " does not exist"));
        return reviewRepository.findAllByReservation_Vehicle(vehicle);
    }

    @Override
    public List<Review> getAllReviewsByUserMail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User with email " + email + " does not exist"));
        return reviewRepository.findAllByUser(user);
    }

    @Override
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }
}
