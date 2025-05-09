package com.example.ProjectLaptopStore.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class OrderDetail_displayForStatusDTO {
    private int orderId;
    private int productId;
    private String productName;
    private BigDecimal price;
    private String imageURL;


}
