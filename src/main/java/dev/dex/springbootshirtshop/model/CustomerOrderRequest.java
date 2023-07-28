package dev.dex.springbootshirtshop.model;

import dev.dex.springbootshirtshop.entity.*;

import java.util.*;

public record CustomerOrderRequest(CustomerOrder customerOrder, List<CartItem> cart) {
}
