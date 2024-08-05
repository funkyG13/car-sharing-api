package org.reservation.carsharingapi.security.oauth2;

import lombok.RequiredArgsConstructor;
import org.reservation.carsharingapi.models.User;
import org.reservation.carsharingapi.security.CustomUserDetails;
import org.reservation.carsharingapi.services.UserService;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserService userService;
    private final List<OAuth2UserInfoExtractor> oAuth2UserInfoExtractors;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Optional<OAuth2UserInfoExtractor> oAuth2UserInfoExtractorOptional = oAuth2UserInfoExtractors.stream()
                .filter(oAuth2UserInfoExtractor -> oAuth2UserInfoExtractor.accepts(userRequest))
                .findFirst();
        if (oAuth2UserInfoExtractorOptional.isEmpty()) {
            throw new InternalAuthenticationServiceException("The OAuth2 provider is not supported yet");
        }

        CustomUserDetails customUserDetails = oAuth2UserInfoExtractorOptional.get().extractUserInfo(oAuth2User);
        User user = insertUser(customUserDetails);
        customUserDetails.setId(user.getId());
        return customUserDetails;
    }

    private User insertUser(CustomUserDetails customUserDetails) {
        Optional<User> userOptional = userService.getUserByUsername(customUserDetails.getUsername());
        User user;
        if (userOptional.isEmpty()) {
            user = new User();
            user.setUsername(customUserDetails.getUsername());
            user.setName(customUserDetails.getName());
            user.setEmail(customUserDetails.getEmail());
            user.setImageUrl(customUserDetails.getAvatarUrl());
            user.setProvider(customUserDetails.getProvider());
            user.setRole(customUserDetails.getRole());
//            user.setAge(customUserDetails.getAge());
//            user.setYears_of_experience(customUserDetails.getYearsOfExperience());
            user.setAddress(customUserDetails.getAddress());
        } else {
            user = userOptional.get();
            user.setEmail(customUserDetails.getEmail());
            user.setImageUrl(customUserDetails.getAvatarUrl());
        }
        return userService.createUser(user);
    }
}
