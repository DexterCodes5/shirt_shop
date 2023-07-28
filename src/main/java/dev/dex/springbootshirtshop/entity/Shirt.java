package dev.dex.springbootshirtshop.entity;

import dev.dex.springbootshirtshop.util.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "shirt")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Shirt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "brand")
    private String brand;

    @Column(name = "price")
    private double price;

    @Column(name = "in_stock")
    private int inStock;

    @Enumerated(EnumType.STRING)
    @Column(name  = "color")
    private Color color;

    @Column(name = "description")
    private String description;

    @Column(name = "img")
    private String img;

    public Shirt(String title, String brand, double price, int inStock, Color color, String description, String img) {
        this.title = title;
        this.brand = brand;
        this.price = price;
        this.inStock = inStock;
        this.color = color;
        this.description = description;
        this.img = img;
    }
}
