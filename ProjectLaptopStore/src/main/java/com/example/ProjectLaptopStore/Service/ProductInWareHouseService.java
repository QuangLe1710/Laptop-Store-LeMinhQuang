package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.ProductsInWarehouse_DTO;

public interface ProductInWareHouseService {
    ProductsInWarehouse_DTO getProductInWarehouse(Integer idProduct);
    void productInWareHouseUpdate(ProductsInWarehouse_DTO productsInWarehouse_Update);
}

