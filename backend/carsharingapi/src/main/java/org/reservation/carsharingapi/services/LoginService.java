package org.reservation.carsharingapi.services;

import org.reservation.carsharingapi.models.User;

public interface LoginService {

    boolean hasUserWithUsername(String username);

    boolean hasUserWithEmail(String email);
    void saveUser(User user);
}
