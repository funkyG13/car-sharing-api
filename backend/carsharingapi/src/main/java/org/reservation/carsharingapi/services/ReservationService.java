package org.reservation.carsharingapi.services;

import java.util.List;
import org.reservation.carsharingapi.models.Reservation;

public interface ReservationService {

    List<Reservation> getAllReservations();

    Reservation getReservationById(final int id);

    Reservation createReservation(final Reservation reservation, String email);

    void cancelReservationById(final int id);

    void approveReservation(int reservationId);

    void rejectReservation(int reservationId);

    void completeReservation(int reservationId);
}
