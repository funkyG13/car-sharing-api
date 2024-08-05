package org.reservation.carsharingapi.controllers;

import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.converter.DtoToEntityConverter;
import org.reservation.carsharingapi.models.Review;
import org.reservation.carsharingapi.models.dto.ReviewDto;
import org.reservation.carsharingapi.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final DtoToEntityConverter dtoToEntityConverter;

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Review>> getVehicleReviews(@PathVariable("vehicleId") int vehicleId) {
        List<Review> reviewList = reviewService.getAllReviewsByVehicleId(vehicleId);
        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Review>> getUserReviews(@PathVariable("email") String email) {
        List<Review> reviewList = reviewService.getAllReviewsByUserMail(email);
        return new ResponseEntity<>(reviewList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody ReviewDto reviewDto) {
        final Review review = dtoToEntityConverter.reviewDtoToReviewEntity(reviewDto);
        final Review createdReview = reviewService.createReview(review);
        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
    }
}
