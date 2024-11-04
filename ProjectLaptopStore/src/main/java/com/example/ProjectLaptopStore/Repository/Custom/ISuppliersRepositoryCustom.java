package com.example.ProjectLaptopStore.Repository.Custom;

import com.example.ProjectLaptopStore.DTO.Supplier_CreateSupplierDTO;
import com.example.ProjectLaptopStore.DTO.Supplier_FindTopSupplierDTO;
import com.example.ProjectLaptopStore.DTO.Supplier_UpdateSupplierDTO;
import com.example.ProjectLaptopStore.Entity.SuppliersEntity;

import java.util.List;

public interface ISuppliersRepositoryCustom {
    List<Supplier_FindTopSupplierDTO> listTopSuppliers();
    void createSupplier(Supplier_CreateSupplierDTO createSupplier);
    void updateSupplier(Supplier_UpdateSupplierDTO updateSupplier, SuppliersEntity suppliersEntity);
}
