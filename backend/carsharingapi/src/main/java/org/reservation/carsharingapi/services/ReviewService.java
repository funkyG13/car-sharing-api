package org.reservation.carsharingapi.services;

import org.reservation.carsharingapi.models.Review;

import java.util.List;

public interface ReviewService {

    List<Review> getAllReviewsByVehicleId(final int vehicleId);
    List<Review> getAllReviewsByUserMail(final String mail);
    Review createReview(final Review review);
}
