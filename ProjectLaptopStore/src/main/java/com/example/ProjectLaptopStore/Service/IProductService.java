package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.*;

import java.util.List;

public interface IProductService {
    List<Product_FindTopPurchasedProductsDTO> findTopPurchasedProductAtService();
    void createNewProduct(Product_CreateProductDTO createProductDTO);
    void updateProduct(Product_UpdateProductDTO updateProductDTO);
    void deleteProduct(Long[] ids);
    List<Product_DisplayForHomePageDTO> listSearchProductByKey(Object key);
    List<Product_DisplayForHomePageDTO> listProductForHomePage();
}
