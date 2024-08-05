package org.reservation.carsharingapi.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    private String comment;
    private int stars;
}
