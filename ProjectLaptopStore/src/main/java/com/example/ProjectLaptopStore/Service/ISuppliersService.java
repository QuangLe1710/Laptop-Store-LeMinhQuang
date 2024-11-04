package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.Supplier_CreateSupplierDTO;
import com.example.ProjectLaptopStore.DTO.Supplier_FindTopSupplierDTO;
import com.example.ProjectLaptopStore.DTO.Supplier_UpdateSupplierDTO;

import java.util.List;
import java.util.Map;

public interface ISuppliersService {
    List<Supplier_FindTopSupplierDTO> listTopSupplier();
    void createSupplier(Supplier_CreateSupplierDTO creatSuppliers);
    void deleteSupplier(Long[] ids);
    void updateSupplier(Supplier_UpdateSupplierDTO updateSuppliers);
    Map<Integer,String> getSupplierForCheckbox();
}
