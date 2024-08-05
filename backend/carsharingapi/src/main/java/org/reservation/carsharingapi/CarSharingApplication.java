package org.reservation.carsharingapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CarSharingApplication {

    public static void main(String[] args) {
        SpringApplication.run(CarSharingApplication.class, args);
    }

}
