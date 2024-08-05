package org.reservation.carsharingapi.services.impl;


import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.models.EmailDetails;
import org.reservation.carsharingapi.services.EmailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Async
    public CompletableFuture<String> sendSimpleMail(EmailDetails details) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("ticketReserveSystem@no-reply.com");
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());
            javaMailSender.send(mailMessage);
            return CompletableFuture.completedFuture("Mail Sent Successfully...");
        } catch (Exception e) {
            return CompletableFuture.completedFuture("Error while Sending Mail");
        }
    }
}
