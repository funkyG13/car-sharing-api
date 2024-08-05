package org.reservation.carsharingapi.converter;

import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.models.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EntityToDtoConverter {

    public UserDto userToUserDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getUsername(), user.getName(), user.getEmail(), user.getRole());
    }


    public UserDto userToUserDto(Optional<User> userOptional) {
        return userOptional.map(user -> new UserDto(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getRole()
        )).orElse(null);
    }
}
