package org.reservation.carsharingapi.models.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequest {

    @Schema(example = "user")
    @NotBlank
    private String username;

    @Schema(example = "password")
    @NotBlank
    private String password;

    @Schema(example = "User3")
    @NotBlank
    private String name;

    @Schema(example = "user3@mycompany.com")
    @Email
    private String email;

    @Schema(example = "OWNER")
    @NotBlank
    private String role;

    @Schema(example = "25")
    @NotBlank
    private int age;

    @Schema(example = "5")
    @NotBlank
    private int yearsOfExperience;

    @Schema(example = "123 Main St")
    @NotBlank
    private String address;
}