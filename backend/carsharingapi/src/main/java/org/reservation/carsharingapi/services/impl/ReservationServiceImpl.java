package org.reservation.carsharingapi.services.impl;

import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.models.RequestStatus;
import org.reservation.carsharingapi.models.Reservation;
import org.reservation.carsharingapi.repositories.ReservationRepository;
import org.reservation.carsharingapi.repositories.UserRepository;
import org.reservation.carsharingapi.services.EmailService;
import org.reservation.carsharingapi.services.ReservationService;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.reservation.carsharingapi.models.RequestStatus.CANCELED_FROM_RENTER;
import static org.reservation.carsharingapi.utils.EmailUtils.constructCancelReservationMail;
import static org.reservation.carsharingapi.utils.EmailUtils.constructReservationMail;

@RequiredArgsConstructor
@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    private final EmailService emailService;

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public Reservation getReservationById(int id) {
        return reservationRepository.findById(id).orElse(null);
    }

    @Override
    public Reservation createReservation(Reservation reservation, String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("User not found");
        }
        reservation.setStatus(RequestStatus.SENT);
        reservation.setRenter(userRepository.findByEmail(email).orElse(null));
        final Reservation savedReservation = reservationRepository.save(reservation);
        emailService.sendSimpleMail(constructReservationMail(email));
        return savedReservation;
    }

    @Override
    public void approveReservation(int reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation with id " + reservationId + " does not exist"));
        reservation.setStatus(RequestStatus.APPROVED);
        reservationRepository.save(reservation);

    }

    @Override
    public void rejectReservation(int reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation with id " + reservationId + " does not exist"));
        reservation.setStatus(RequestStatus.DECLINED);
        reservationRepository.save(reservation);
    }

    @Override
    public void completeReservation(int reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation with id " + reservationId + " does not exist"));
        reservation.setStatus(RequestStatus.COMPLETED);
        reservationRepository.save(reservation);
    }

    @Override
    public void cancelReservationById(int id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reservation with id " + id + " does not exist"));
        final String email = reservation.getRenter().getEmail();
        final String vehicleModel = reservation.getVehicle().getModel();
        reservation.setStatus(CANCELED_FROM_RENTER);
        reservationRepository.save(reservation);
        emailService.sendSimpleMail(constructCancelReservationMail(email, vehicleModel));
    }

}
