package org.reservation.carsharingapi.converter;

import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.models.Reservation;
import org.reservation.carsharingapi.models.Review;
import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.models.dto.ReviewDto;
import org.reservation.carsharingapi.repositories.ReservationRepository;
import org.reservation.carsharingapi.repositories.UserRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DtoToEntityConverter {

    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    public Review reviewDtoToReviewEntity(ReviewDto reviewDto) {
        if (reviewDto == null) {
            return null;
        }
        final User user = userRepository.findByEmail(reviewDto.email()).orElse(null);
        final Reservation reservation = reservationRepository.findById(reviewDto.reservationId()).orElse(null);
        return setReviewEntity(reviewDto, user, reservation);
    }

    private static Review setReviewEntity(ReviewDto reviewDto, User user, Reservation reservation) {
        final Review review = new Review();
        review.setUser(user);
        review.setReservation(reservation);
        review.setComment(reviewDto.comment());
        review.setStars(reviewDto.stars());
        return review;
    }
}
