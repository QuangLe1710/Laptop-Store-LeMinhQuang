package com.example.ProjectLaptopStore.Repository.Custom;

import com.example.ProjectLaptopStore.DTO.Product_CreateProductDTO;
import com.example.ProjectLaptopStore.DTO.Product_FindTopPurchasedProductsDTO;
import com.example.ProjectLaptopStore.DTO.Product_DisplayForHomePageDTO;
import com.example.ProjectLaptopStore.DTO.Product_UpdateProductDTO;
import com.example.ProjectLaptopStore.Entity.ProductsEntity;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IProductRepositoryCustom {
    List<Product_FindTopPurchasedProductsDTO> findAllProductsWithTotalQuantityOrdered();
    void createProduct(Product_CreateProductDTO createProductDTO);
    void updateProduct(Product_UpdateProductDTO updateProductDTO, ProductsEntity productsEntityById);
    List<Product_DisplayForHomePageDTO> findAllProductsByKey(Object key);

//    Page<Product_DisplayForHomePageDTO> findAllProductsByPage(int pageNo, int pageSize);
}
