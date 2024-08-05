package org.reservation.carsharingapi.services;

import org.reservation.carsharingapi.models.EmailDetails;

import java.util.concurrent.CompletableFuture;

public interface EmailService {
    CompletableFuture<String> sendSimpleMail(EmailDetails details);

}
