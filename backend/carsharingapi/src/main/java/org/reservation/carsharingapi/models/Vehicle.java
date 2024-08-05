package org.reservation.carsharingapi.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String photo;
    private String model;
    private String cubic;
    private int year;
    private double pricePerDay;
    private double latitude;
    private double longitude;
    private String address;

    @Enumerated(EnumType.STRING)
    private AvailabilityStatus isAvailable;
    private String comments;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
