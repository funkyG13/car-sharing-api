package org.reservation.carsharingapi.controllers;

import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.models.Reservation;
import org.reservation.carsharingapi.services.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservationList = reservationService.getAllReservations();
        return new ResponseEntity<>(reservationList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable("id") final int id) {
        Reservation reservation = reservationService.getReservationById(id);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestParam("email") String email,
                                                         @RequestBody final Reservation reservation) {
        final Reservation createdReservation = reservationService.createReservation(reservation,email);
        return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<Void> approveReservation(@PathVariable("id")  final int reservationId) {
        reservationService.approveReservation(reservationId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/reject/{id}")
    public ResponseEntity<Void> rejectReservation(@PathVariable("id")  final int reservationId) {
        reservationService.rejectReservation(reservationId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/complete/{id}")
    public ResponseEntity<Void> completeReservation(@PathVariable("id")  final int reservationId) {
        reservationService.completeReservation(reservationId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelReservationById(@PathVariable("id") final int id) {
        reservationService.cancelReservationById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
