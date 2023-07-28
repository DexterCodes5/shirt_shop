package dev.dex.springbootshirtshop.model;

public record PaymentInfoRequest(int amount, String currency, String receiptEmail) {
}
