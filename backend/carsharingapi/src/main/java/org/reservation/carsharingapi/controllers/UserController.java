package org.reservation.carsharingapi.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.reservation.carsharingapi.converter.EntityToDtoConverter;
import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.models.dto.UserDto;
import org.reservation.carsharingapi.security.CustomUserDetails;
import org.reservation.carsharingapi.services.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

import static org.reservation.carsharingapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("/admin/users")
public class UserController {

    private final UserService userService;
    private final EntityToDtoConverter userToUserDtoConverter;

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/current")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        User user = userService.validateAndGetUserByUsername(currentUser.getUsername());
        UserDto userDto= userToUserDtoConverter.userToUserDto(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping
    public ResponseEntity<List<UserDto>> getUsers() {
        List<UserDto> users = userService.getUsers().stream()
                .map(userToUserDtoConverter::userToUserDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/sorted")
    public ResponseEntity<List<UserDto>> getUsersSorted() {
        List<UserDto> allUsersSorted = userService.getAllUsersSorted(1, 10, "id").stream()
                .map(userToUserDtoConverter::userToUserDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(allUsersSorted, HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        UserDto user = userToUserDtoConverter.userToUserDto(userService.validateAndGetUserByUsername(username));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") final Long id) {
        Optional<User> user = userService.getUserById(id);
        UserDto userDto =  userToUserDtoConverter.userToUserDto(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable("email") final String email) {
        Optional<User> user = userService.getUserByEmail(email);
        UserDto userDto =  userToUserDtoConverter.userToUserDto(user);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody final User user) {
        final User createdUser = userService.createUser(user);
        final UserDto userDto =  userToUserDtoConverter.userToUserDto(createdUser);
        return new ResponseEntity<>(userDto, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<UserDto> updateUser(@RequestBody final User user) {
        final User updatedUser = userService.updateUser(user);
        final UserDto userDto =  userToUserDtoConverter.userToUserDto(updatedUser);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUserByUsername(@PathVariable String username) {
        final User user = userService.validateAndGetUserByUsername(username);
        userService.deleteUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
