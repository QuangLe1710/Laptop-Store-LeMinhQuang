package com.example.ProjectLaptopStore.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Product_DisplayForHomePageDTO {
    private Integer productId;
    private String productName;
    private Float productPrice;
    private String imageURL;

    public Product_DisplayForHomePageDTO() {
    }

    public Product_DisplayForHomePageDTO(Integer productId, String productName, Float productPrice, String imageURL) {
        this.productId = productId;
        this.productName = productName;
        this.productPrice = productPrice;
        this.imageURL = imageURL;
    }
}
