package org.reservation.carsharingapi.services.impl;

import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.repositories.UserRepository;
import org.reservation.carsharingapi.services.LoginService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LoginServiceImpl implements LoginService {

    private final UserRepository userRepository;

    @Override
    public boolean hasUserWithUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void saveUser(User user) {
        userRepository.save(user);
    }
}
