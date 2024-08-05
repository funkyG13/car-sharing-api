package org.reservation.carsharingapi.models.dto;

public record UserDto(Long id, String username, String name, String email, String role) {
}
