package dev.dex.springbootshirtshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "address")
@Data
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String userEmail;
    private String firstName;
    private String lastName;
    private String gender;
    private String city;
    private String postcode;
    private String street;
    private String number;
    private String additionalInformation;
    private String dateOfBirth;

    public Address(String userEmail, String firstName, String lastName, String gender, String city, String postcode, String street, String number, String additionalInformation, String dateOfBirth) {
        this.userEmail = userEmail;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.city = city;
        this.postcode = postcode;
        this.street = street;
        this.number = number;
        this.additionalInformation = additionalInformation;
        this.dateOfBirth = dateOfBirth;
    }
}
