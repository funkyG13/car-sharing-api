package org.reservation.carsharingapi.services.impl;

import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.exceptions.UserNotFoundException;
import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.repositories.UserRepository;
import org.reservation.carsharingapi.services.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<User> getAllUsersSorted(final Integer pageStartIndex, final Integer pageSize, final String columnToSort) {
        final Pageable paging = PageRequest.of(pageStartIndex, pageSize, Sort.by(columnToSort).descending());
        List<User> sortedUserList = new ArrayList<>();
        final Page<User> pagedResult = userRepository.findAll(paging);
        if (pagedResult.hasContent()) {
            sortedUserList = pagedResult.getContent();
        }
        return sortedUserList;
    }
    @Override
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User validateAndGetUserByUsername(String username) {
        return getUserByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with username %s not found", username)));
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User updateUser(final User user) {
        final boolean isExistingUser = userRepository.existsById(user.getId());
        User updatedUser = null;
        if (isExistingUser) {
            updatedUser = userRepository.save(user);
        }
        return updatedUser;
    }
}
