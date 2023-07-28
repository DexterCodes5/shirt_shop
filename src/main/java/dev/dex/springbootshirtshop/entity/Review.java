package dev.dex.springbootshirtshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "review")
@Data
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String userEmail;
    private String date;
    private double rating;
    private long shirtId;
    private String description;

    public Review(String userEmail, String date, double rating, long shirtId, String description) {
        this.userEmail = userEmail;
        this.date = date;
        this.rating = rating;
        this.shirtId = shirtId;
        this.description = description;
    }
}
