package com.example.ProjectLaptopStore.Repository;

import com.example.ProjectLaptopStore.DTO.ProductDescriptionDTO;
import com.example.ProjectLaptopStore.Entity.ProductDescriptionEntity;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IProductDescriptionRepository extends JpaRepository<ProductDescriptionEntity, Long> {
    List<ProductDescriptionEntity> findAll();

    @Query(value = "SELECT * FROM ProductDescription pd WHERE pd.ProductID = :productId", nativeQuery = true)
    ProductDescriptionEntity findAllByProductId(@Param("productId") Long productId);


}

