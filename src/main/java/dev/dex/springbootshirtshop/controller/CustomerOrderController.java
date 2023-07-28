package dev.dex.springbootshirtshop.controller;

import com.stripe.exception.*;
import com.stripe.model.*;
import dev.dex.springbootshirtshop.model.*;
import dev.dex.springbootshirtshop.service.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer-order")
public class CustomerOrderController {
    private final CustomerOrderService customerOrderService;

    @Autowired
    public CustomerOrderController(CustomerOrderService customerOrderService) {
        this.customerOrderService = customerOrderService;
    }

    @PostMapping("/secure/place-order")
    private ResponseEntity<?> postCustomerOrder(@RequestBody CustomerOrderRequest customerOrderRequest) {
        customerOrderService.placeOrder(customerOrderRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/secure/payment-intent")
    private ResponseEntity<?> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws StripeException {
        PaymentIntent paymentIntent = customerOrderService.createPaymentIntent(paymentInfoRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentIntent.toJson());
    }

}
