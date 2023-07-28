package dev.dex.springbootshirtshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "question")
@Data
@NoArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String userEmail;
    private String title;
    private String question;
    private String response;

    public Question(String userEmail, String title, String question, String response) {
        this.userEmail = userEmail;
        this.title = title;
        this.question = question;
        this.response = response;
    }
}
