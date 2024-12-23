package com.example.ProjectLaptopStore.Exception;

public class QuantityExceedsStockException extends RuntimeException {
    public QuantityExceedsStockException(String message) {
        super(message);
    }
}
