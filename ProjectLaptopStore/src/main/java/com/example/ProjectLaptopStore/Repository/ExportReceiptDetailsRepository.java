package com.example.ProjectLaptopStore.Repository;

import com.example.ProjectLaptopStore.Entity.ExportReceiptEntity;
import com.example.ProjectLaptopStore.Repository.Custom.ExportReceiptDetailsRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExportReceiptDetailsRepository extends JpaRepository<ExportReceiptEntity,Integer>, ExportReceiptDetailsRepositoryCustom {
}
