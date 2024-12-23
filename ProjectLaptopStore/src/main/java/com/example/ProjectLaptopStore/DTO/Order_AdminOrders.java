package com.example.ProjectLaptopStore.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class Order_AdminOrders {
    private int orderID;
    private int customerID;
    private Date orderDate;
    private BigDecimal totalAmount;
    private BigDecimal shippingFee;
    private String orderStatus;

    public Order_AdminOrders() {
    }


}
