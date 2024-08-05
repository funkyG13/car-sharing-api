package org.reservation.carsharingapi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotWritableException.class)
    public ResponseEntity<Object> handleHttpMessageNotWritableException(HttpMessageNotWritableException ex) {
        // Log the exception, create an error response and return it
        // Replace "Error message" with a suitable error message
        return new ResponseEntity<>("Error message", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleOtherExceptions(Exception ex) {
        // Catch any other unexpected exceptions
        return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}