package com.example.ProjectLaptopStore.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@Builder
public class CartDetailDTO {
    private int cartDetailID;
    private int productId;
    private String productName;
    private BigDecimal price;
    private int quantity;
    private BigDecimal lineTotal;
}
