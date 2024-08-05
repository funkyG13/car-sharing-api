package org.reservation.carsharingapi.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.exceptions.DuplicatedUserInfoException;
import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.models.dto.AuthResponse;
import org.reservation.carsharingapi.models.dto.LoginRequest;
import org.reservation.carsharingapi.models.dto.SignUpRequest;
import org.reservation.carsharingapi.security.CustomUserDetails;
import org.reservation.carsharingapi.security.TokenProvider;
import org.reservation.carsharingapi.security.oauth2.OAuth2Provider;
import org.reservation.carsharingapi.services.EmailService;
import org.reservation.carsharingapi.services.LoginService;
import org.reservation.carsharingapi.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

import static org.reservation.carsharingapi.utils.EmailUtils.constructRegistrationMail;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class LoginController {

    private final LoginService loginService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final EmailService emailService;

    @PostMapping("/authenticate")
    public AuthResponse login(@Valid @RequestBody LoginRequest loginRequest) {
        String token = authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
        return new AuthResponse(token);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public AuthResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (loginService.hasUserWithUsername(signUpRequest.getUsername())) {
            throw new DuplicatedUserInfoException(String.format("Username %s already been used", signUpRequest.getUsername()));
        }
        if (loginService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new DuplicatedUserInfoException(String.format("Email %s already been used", signUpRequest.getEmail()));
        }
        loginService.saveUser(mapSignUpRequestToUser(signUpRequest));
        final String token = authenticateAndGetToken(signUpRequest.getUsername(), signUpRequest.getPassword());
        //send Registration mail to user
        emailService.sendSimpleMail(constructRegistrationMail(signUpRequest));
        return new AuthResponse(token);
    }

    private String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }

    private User mapSignUpRequestToUser(SignUpRequest signUpRequest) {
        final User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setRole(signUpRequest.getRole());
//        user.setAge(signUpRequest.getAge());
//        user.setYears_of_experience(signUpRequest.getYearsOfExperience());
        user.setAddress(signUpRequest.getAddress());
        user.setProvider(OAuth2Provider.LOCAL);
        return user;
    }

    private CustomUserDetails mapCustomUser(User user) {
        final CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setId(user.getId());
        customUserDetails.setUsername(user.getUsername());
        customUserDetails.setPassword(user.getPassword());
        customUserDetails.setName(user.getName());
        customUserDetails.setEmail(user.getEmail());
        customUserDetails.setProvider(user.getProvider());
        customUserDetails.setAuthorities(Collections.singletonList(new SimpleGrantedAuthority(user.getRole())));
        return customUserDetails;
    }

}
