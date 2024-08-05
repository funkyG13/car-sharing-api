package org.reservation.carsharingapi.models.dto;

public record ReviewDto( String email, int reservationId, String comment, int stars) {
}
