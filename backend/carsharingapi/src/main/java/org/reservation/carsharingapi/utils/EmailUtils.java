package org.reservation.carsharingapi.utils;

import org.reservation.carsharingapi.models.EmailDetails;
import org.reservation.carsharingapi.models.dto.SignUpRequest;

import static org.reservation.carsharingapi.utils.AppConstants.*;

public final class EmailUtils {

    public static EmailDetails constructRegistrationMail(SignUpRequest signUpRequest) {
        final EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(signUpRequest.getEmail());
        emailDetails.setSubject(REGISTRATION_MAIL_SUBJECT);
        emailDetails.setMsgBody(String.format("Hi %s!\n%s", signUpRequest.getUsername(), REGISTRATION_MAIL_MSG_BODY));
        return emailDetails;
    }

    public static EmailDetails constructReservationMail(String email) {
        final EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(email);
        emailDetails.setSubject(RESERVATION_MAIL_SUBJECT);
        emailDetails.setMsgBody(String.format("Hi %s!\n%s", email, RESERVATION_MAIL_MSG_BODY));
        return emailDetails;
    }

    public static EmailDetails constructCancelReservationMail(String email, String model) {
        final EmailDetails emailDetails = new EmailDetails();
        emailDetails.setRecipient(email);
        emailDetails.setSubject(CANCEL_RESERVATION_MAIL_SUBJECT);
        emailDetails.setMsgBody(String.format("Dear %s,\n\nWe regret to inform you that your reservation for the " +
                "vehicle '%s' has been cancelled.\n\nBest regards,\nCar Sharing App Team",
                email, model));
        return emailDetails;
    }
}
