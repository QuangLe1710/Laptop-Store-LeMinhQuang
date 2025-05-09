package com.example.ProjectLaptopStore.Repository;

import com.example.ProjectLaptopStore.Entity.ProductsEntity;
import com.example.ProjectLaptopStore.Repository.Custom.ProductRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
//sử dụng spring data jpa, và custom để lấy dữ liệu
public interface ProductRepository extends JpaRepository<ProductsEntity,Integer>, ProductRepositoryCustom {
//    List<ProductsEntity> findByProductNameContainingAndBrandContaining(String productName, String brand);
//    List<ProductsEntity> findByProductNameContainingAndSupplier_SupplierNameContaining(String productName, String supplierName);
    void deleteByProductIDIn(Long[] ids);
    List<ProductsEntity> findTop30ByOrderByReleaseDateDesc();
//    List<ProductsEntity> findByProductIDIn(Long[] ids);
}
