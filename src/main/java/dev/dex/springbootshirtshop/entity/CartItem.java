package dev.dex.springbootshirtshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_item")
@Data
@NoArgsConstructor
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long customerOrderId;
    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "shirt_id")
    private Shirt shirt;
    private int quantity;

    public CartItem(long customerOrderId, Shirt shirt, int quantity) {
        this.customerOrderId = customerOrderId;
        this.shirt = shirt;
        this.quantity = quantity;
    }
}
