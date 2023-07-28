package dev.dex.springbootshirtshop.controller;

import com.fasterxml.jackson.databind.*;
import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.model.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.boot.test.context.*;
import org.springframework.http.*;
import org.springframework.test.web.servlet.*;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CustomerOrderControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void canPostCustomerOrder() throws Exception {
        // given
        Address address = new Address("dexter@mail.com", "Dexter", "McPherson", "Mr", "Sofia", "1000", "ul. \"Goshe\"", "1", "", "1.02.2000");
        CustomerOrder customerOrder = new CustomerOrder(address, null, "Cash on delivery", null, "0883456789");
        Shirt shirt = new Shirt();
        shirt.setId(1);
        CartItem cartItem = new CartItem(0, shirt, 1);
        List<CartItem> cart = new ArrayList<>();
        CustomerOrderRequest customerOrderRequest = new CustomerOrderRequest(customerOrder, cart);

        // when
        ResultActions resultActions = mockMvc
                                        .perform(post("/api/customer-order/secure/place-order")
                                                .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpHamlNUmNWTXhXeXpBejNFYWZSOCJ9.eyJ1c2VyVHlwZXMiOltdLCJpc3MiOiJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NGE5MzAxODNhOTcwZGM4ZmQyODk4MzUiLCJhdWQiOlsiaHR0cHM6Ly9zaGlydC1zaG9wLWFwaS5jb20iLCJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTA1NTM3OTcsImV4cCI6MTY5MDY0MDE5NywiYXpwIjoidXpya0ZwMnVlUzB6Y1RRSEdPVFFqcGJtSnptd1JTVzYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.A5AnuNZMGTGEMKVEK8LPadAEn0cW6VaFOl3L0bLM646QLeMKruyMvJpRc5OOVLJ6cVq2fXHosjMLipviJUGK5wKMsMNq73BK0JMQYxdWtddmG06Eqqj7Ckjpp1eHuykyhLdJdXTIDfd05TVeQeXOJZ25O-1UDYhgdnJ6ybMRxD8SYUsTTepBmDWtehYql8jty0iOqqhAkcakc_OzQKx-KzAJRhgUaRpM5ajncc7t9zqbz4RKAqJV9Fi_I1THRDBebcWsi00o8t95XOe8XayDjdUr6rbFd-2R8iLS6AgG36CFY04_hZwOEy7hSc36ca-h4ejej1aZLLD3HYcTp8Y2EA")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content(objectMapper.writeValueAsString(customerOrderRequest)));

        // then
        resultActions.andExpect(status().isCreated());
    }

    @Test
    void canCreatePaymentIntent() throws Exception {
        // given
        PaymentInfoRequest paymentInfoRequest = new PaymentInfoRequest(100, "BGN", "dexter@mail.com");

        // when
        ResultActions resultActions = mockMvc
                .perform(post("/api/customer-order/secure/payment-intent")
                        .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpHamlNUmNWTXhXeXpBejNFYWZSOCJ9.eyJ1c2VyVHlwZXMiOltdLCJpc3MiOiJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NGE5MzAxODNhOTcwZGM4ZmQyODk4MzUiLCJhdWQiOlsiaHR0cHM6Ly9zaGlydC1zaG9wLWFwaS5jb20iLCJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTA1NTM3OTcsImV4cCI6MTY5MDY0MDE5NywiYXpwIjoidXpya0ZwMnVlUzB6Y1RRSEdPVFFqcGJtSnptd1JTVzYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.A5AnuNZMGTGEMKVEK8LPadAEn0cW6VaFOl3L0bLM646QLeMKruyMvJpRc5OOVLJ6cVq2fXHosjMLipviJUGK5wKMsMNq73BK0JMQYxdWtddmG06Eqqj7Ckjpp1eHuykyhLdJdXTIDfd05TVeQeXOJZ25O-1UDYhgdnJ6ybMRxD8SYUsTTepBmDWtehYql8jty0iOqqhAkcakc_OzQKx-KzAJRhgUaRpM5ajncc7t9zqbz4RKAqJV9Fi_I1THRDBebcWsi00o8t95XOe8XayDjdUr6rbFd-2R8iLS6AgG36CFY04_hZwOEy7hSc36ca-h4ejej1aZLLD3HYcTp8Y2EA")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentInfoRequest)));

        // then
        resultActions.andExpect(status().isCreated());
    }

}