package dev.dex.springbootshirtshop.util;

import dev.dex.springbootshirtshop.model.*;

public class TextFormatter {

    public static String formatCustomerOrderRequest(CustomerOrderRequest customerOrderRequest) {
        String text = String.format(
                "Customer email: %s\n"
                + "Name: %s %s\n"
                + "Telephone: %s\n"
                + "Products: \n"
                + "Id, Name, Brand, Quantity, Price\n",
                customerOrderRequest.customerOrder().getAddress().getUserEmail(),
                customerOrderRequest.customerOrder().getAddress().getFirstName(),
                customerOrderRequest.customerOrder().getAddress().getLastName(),
                customerOrderRequest.customerOrder().getPhoneNumber()
                );

        double total = 0;
        for (var cartItem: customerOrderRequest.cart()) {
            text += cartItem.getShirt().getId() + ", " + cartItem.getShirt().getTitle() + ", " + cartItem.getShirt().getBrand() + ", "
                    + cartItem.getQuantity() + ", " + cartItem.getShirt().getPrice() * cartItem.getQuantity() + " BGN\n";
            total += cartItem.getShirt().getPrice() * cartItem.getQuantity();
        }

        text += "=".repeat(30) + "\n"
                + "Total: " + total + " BGN";
        return text;
    }
}
