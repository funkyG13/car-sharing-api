package org.reservation.carsharingapi.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "renter_id")
    private User renter;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    @OneToOne(mappedBy = "reservation")
    private Review review;
    private Date dateFrom;
    private Date dateTo;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    private String addressOfDeliver;
    private double totalPrice;
}
