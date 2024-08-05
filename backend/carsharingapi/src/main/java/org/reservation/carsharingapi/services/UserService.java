package org.reservation.carsharingapi.services;

import org.reservation.carsharingapi.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getUsers();

    List<User> getAllUsersSorted(Integer pageStartIndex, Integer pageSize, String columnToSort);

    Optional<User> getUserByUsername(String username);

    Optional<User> getUserById(Long id);

    Optional<User> getUserByEmail(String email);

    User validateAndGetUserByUsername(String username);

    User createUser(final User user);

    User updateUser(final User user);

    void deleteUser(User user);

    User findUserByEmail(String email);
}
