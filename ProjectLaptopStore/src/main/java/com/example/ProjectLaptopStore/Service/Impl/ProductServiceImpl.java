package com.example.ProjectLaptopStore.Service.Impl;

import com.example.ProjectLaptopStore.Convert.Product_DisplayForHomePageConverter;
import com.example.ProjectLaptopStore.Convert.Product_SearchBuilderConverter;
import com.example.ProjectLaptopStore.DTO.*;
import com.example.ProjectLaptopStore.Entity.ProductsEntity;
import com.example.ProjectLaptopStore.Repository.IProductRepository;
import com.example.ProjectLaptopStore.Service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductServiceImpl implements IProductService {
    @Autowired
    private IProductRepository productRepository;

    @Autowired
    private Product_SearchBuilderConverter productSearchBuilderConverter;

    @Autowired
    private Product_DisplayForHomePageConverter productDisplayForHomePageConverter;
    @Override
    public List<Product_FindTopPurchasedProductsDTO> findTopPurchasedProductAtService() {
        List<Product_FindTopPurchasedProductsDTO> result = productRepository.findAllProductsWithTotalQuantityOrdered();
        return result;
    }

    @Override
    public void createNewProduct(Product_CreateProductDTO createProductDTO) {
        productRepository.createProduct(createProductDTO);
    }

    @Override
    public void updateProduct(Product_UpdateProductDTO updateProductDTO) {
        ProductsEntity productsEntity = productRepository.findById(updateProductDTO.getProductId()).get();
        productRepository.updateProduct(updateProductDTO, productsEntity);
    }

    @Override
    public void deleteProduct(Long[] ids) {
        productRepository.deleteByProductIDIn(ids);
    }

    @Override
    public List<Product_DisplayForHomePageDTO> listSearchProductByKey(Object key) {
        List<Product_DisplayForHomePageDTO> result = productRepository.findAllProductsByKey(key);
        return result;
    }

    //hàm lấy sản phẩm ra cho trang chủ nhưng giới hạn trong 30 sản phẩm và sắp xếp theo sản phẩm mới
    @Override
    public List<Product_DisplayForHomePageDTO> listProductForHomePage() {
        List<ProductsEntity> listProduct = productRepository.findTop30ByOrderByReleaseDateDesc();
        List<Product_DisplayForHomePageDTO> result = new ArrayList<>();
        for(ProductsEntity item : listProduct){
            Product_DisplayForHomePageDTO productDisplayForHomePageDTO = productDisplayForHomePageConverter.toDisplayHomePage(item);
            result.add(productDisplayForHomePageDTO);
        }
        return result;
    }


}
