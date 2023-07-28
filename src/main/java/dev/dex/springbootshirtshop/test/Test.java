package dev.dex.springbootshirtshop.test;

import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.model.*;
import dev.dex.springbootshirtshop.util.*;

import java.util.*;

public class Test {
    public static void main(String[] args) {
        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setId(1);
        Address address = new Address();
        address.setUserEmail("dexter@mail.com");
        customerOrder.setAddress(address);
        CartItem cartItem = new CartItem();
        Shirt shirt = new Shirt(1, "Slim Fit Shirt 'Ermo'", "HUGO", 157.90, 25, Color.BLACK, "description", "img");
        cartItem.setShirt(shirt);
        CartItem cartItem2 = new CartItem();
        Shirt shirt2 = new Shirt(2, "Slim Fit Shirt 'Elisha'", "HUGO", 157.90, 10, Color.BLACK, "description", "img");
        cartItem2.setShirt(shirt2);
        List<CartItem> cart = new ArrayList<>(List.of(cartItem, cartItem2));
        CustomerOrderRequest customerOrderRequest = new CustomerOrderRequest(customerOrder, cart);
        System.out.println(TextFormatter.formatCustomerOrderRequest(customerOrderRequest));

    }
}
