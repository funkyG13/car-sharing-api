package org.reservation.carsharingapi.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.reservation.carsharingapi.security.oauth2.OAuth2Provider;

import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String name;
    private String email;
    private String role;
    private String imageUrl;
    @Enumerated(EnumType.STRING)
    private OAuth2Provider provider;

    private Date birthday;
    private Date driverLicenceDate;
    private String address;

    @OneToMany(mappedBy = "renter")
    @JsonBackReference
    private Set<Reservation> reservations;
}
