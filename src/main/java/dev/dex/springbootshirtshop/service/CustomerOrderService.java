package dev.dex.springbootshirtshop.service;

import com.stripe.*;
import com.stripe.exception.*;
import com.stripe.model.*;
import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.model.*;
import dev.dex.springbootshirtshop.repository.*;
import dev.dex.springbootshirtshop.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.*;

@Service
public class CustomerOrderService {
    private final CustomerOrderRepository customerOrderRepository;
    private final CartItemRepository cartItemRepository;
    private final MailService mailService;

    @Autowired
    public CustomerOrderService(CustomerOrderRepository customerOrderRepository,
                                CartItemRepository cartItemRepository,
                                MailService mailService,
                                @Value("${stripe.key.secret}") String secretKey) {
        this.customerOrderRepository = customerOrderRepository;
        this.cartItemRepository = cartItemRepository;
        this.mailService = mailService;
        Stripe.apiKey = secretKey;
    }

    public void placeOrder(CustomerOrderRequest customerOrderRequest) {
        CustomerOrder customerOrder = customerOrderRepository.save(customerOrderRequest.customerOrder());
        for (var cartItem: customerOrderRequest.cart()) {
            cartItem.setCustomerOrderId(customerOrder.getId());
            cartItemRepository.save(cartItem);
        }

        mailService.sendMail("dtanchev081@gmail.com", String.format("Order n. %d", customerOrder.getId()),
                TextFormatter.formatCustomerOrderRequest(customerOrderRequest));

        String text = "Thank you for choosing Shirt Shop!";
        if (customerOrder.getPayment() == "Cash on delivery") {
            text += " We are going to contact you in the following days, to confirm the order.";
        }
        else {
            text += " We are going to send the shipment in the following days.";
        }
        mailService.sendMail(customerOrder.getAddress().getUserEmail(), "Successful Order", text);
    }

    public PaymentIntent createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfoRequest.amount());
        params.put("currency", paymentInfoRequest.currency());
        List<String> paymentMethodTypes = new ArrayList<>(List.of("card"));
        params.put("payment_method_types", paymentMethodTypes);
        return PaymentIntent.create(params);
    }

}
