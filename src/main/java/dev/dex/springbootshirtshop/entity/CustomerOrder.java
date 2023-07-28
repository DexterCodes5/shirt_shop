package dev.dex.springbootshirtshop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "customer_order")
@Data
@NoArgsConstructor
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "billing_address_id")
    private Address billingAddress;

    private String payment;
    private String voucher;
    private String phoneNumber;

    public CustomerOrder(Address address, Address billingAddress, String payment, String voucher, String phoneNumber) {
        this.address = address;
        this.billingAddress = billingAddress;
        this.payment = payment;
        this.voucher = voucher;
        this.phoneNumber = phoneNumber;
    }
}
