package com.example.ProjectLaptopStore.Repository.Custom.Impl;

import com.example.ProjectLaptopStore.DTO.Supplier_CreateSupplierDTO;
import com.example.ProjectLaptopStore.DTO.Supplier_FindTopSupplierDTO;
import com.example.ProjectLaptopStore.DTO.Supplier_UpdateSupplierDTO;
import com.example.ProjectLaptopStore.Entity.SuppliersEntity;
import com.example.ProjectLaptopStore.Repository.Custom.ISuppliersRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Transactional
@Repository
public class ISuppliersRepositoryCustomImpl implements ISuppliersRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Supplier_FindTopSupplierDTO> listTopSuppliers() {
        String query = "SELECT s.SupplierName, s.Address, s.PhoneNumber, s.Email, s.TaxCode, s.Website, s.Representative, s.PartnershipStartDate " +
                "FROM Suppliers s";
        Query queryNative = entityManager.createNativeQuery(query);
        List<Supplier_FindTopSupplierDTO> list = new ArrayList<>();
        List<Object[]> resultQuery = queryNative.getResultList();
        for (Object[] rowOfResult : resultQuery) {
            Supplier_FindTopSupplierDTO dto = new Supplier_FindTopSupplierDTO(
                    (String) rowOfResult[0],
                    (String) rowOfResult[1],
                    (String) rowOfResult[2],
                    (String) rowOfResult[3],
                    (String) rowOfResult[4],
                    (String) rowOfResult[5],
                    (String) rowOfResult[6],
                    (Date) rowOfResult[7]
            );
            list.add(dto);
        }
        return list;
    }

    @Override
    public void createSupplier(Supplier_CreateSupplierDTO createSupplier) {
        SuppliersEntity suppliersEntity = new SuppliersEntity();
        suppliersEntity.setSupplierName(createSupplier.getSupplierName());
        suppliersEntity.setAddress(createSupplier.getAddress());
        suppliersEntity.setPhoneNumber(createSupplier.getPhoneNumber());
        suppliersEntity.setEmail(createSupplier.getEmail());
        suppliersEntity.setTaxCode(createSupplier.getTaxcode());
        suppliersEntity.setWebsite(createSupplier.getWebsite());
        suppliersEntity.setRepresentative(createSupplier.getRepresentative());
        suppliersEntity.setPartnershipStartDate(createSupplier.getPartnershipStartDate());
        entityManager.persist(suppliersEntity);

    }

    @Override
    public void updateSupplier(Supplier_UpdateSupplierDTO updateSupplier,SuppliersEntity suppliersEntity) {
        suppliersEntity.setSupplierName(updateSupplier.getSupplierName());
        suppliersEntity.setAddress(updateSupplier.getAddress());
        suppliersEntity.setPhoneNumber(updateSupplier.getPhoneNumber());
        suppliersEntity.setEmail(updateSupplier.getEmail());
        suppliersEntity.setTaxCode(updateSupplier.getTaxcode());
        suppliersEntity.setWebsite(updateSupplier.getWebsite());
        suppliersEntity.setRepresentative(updateSupplier.getRepresentative());
        suppliersEntity.setPartnershipStartDate(updateSupplier.getPartnershipStartDate());
        entityManager.merge(suppliersEntity);
        entityManager.flush();

    }
}
