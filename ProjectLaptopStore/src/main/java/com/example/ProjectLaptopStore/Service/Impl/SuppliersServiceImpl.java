package com.example.ProjectLaptopStore.Service.Impl;

import com.example.ProjectLaptopStore.DTO.Supplier_CreateSupplierDTO;
import com.example.ProjectLaptopStore.DTO.Supplier_FindTopSupplierDTO;
import com.example.ProjectLaptopStore.DTO.Supplier_UpdateSupplierDTO;
import com.example.ProjectLaptopStore.Entity.SuppliersEntity;
import com.example.ProjectLaptopStore.Repository.ISuppliersRepository;
import com.example.ProjectLaptopStore.Service.ISuppliersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SuppliersServiceImpl implements ISuppliersService {
    @Autowired
    private ISuppliersRepository suppliersRepository;

    @Override
    public List<Supplier_FindTopSupplierDTO> listTopSupplier() {
        List<Supplier_FindTopSupplierDTO> result = suppliersRepository.listTopSuppliers();
        return result;
    }

    @Override
    public void createSupplier(Supplier_CreateSupplierDTO creatSuppliers) {
        suppliersRepository.createSupplier(creatSuppliers);
    }

    @Override
    public void deleteSupplier(Long[] ids) {
        suppliersRepository.deleteBySupplierIDIn(ids);
    }

    @Override
    public void updateSupplier(Supplier_UpdateSupplierDTO updateSuppliers) {
        SuppliersEntity suppliersEntity = suppliersRepository.findById(updateSuppliers.getSupplierId()).get();
        suppliersRepository.updateSupplier(updateSuppliers, suppliersEntity);
    }

    //hàm lấy nhà cung cấp cho checkbox homepage
    @Override
    public Map<Integer, String> getSupplierForCheckbox() {
        Map<Integer,String> suppliers = new HashMap<>();
        List<SuppliersEntity> suppliersEntities = suppliersRepository.findAll();
        for (SuppliersEntity supplier : suppliersEntities) {
            suppliers.put(supplier.getSupplierID(),supplier.getSupplierName());
        }
        return suppliers;
    }
}
