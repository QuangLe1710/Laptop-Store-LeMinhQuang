package com.example.ProjectLaptopStore.Response;

import com.example.ProjectLaptopStore.DTO.ImportExport_ReceiptDTO;
import com.example.ProjectLaptopStore.DTO.ProductsInWarehouse_DTO;
import com.example.ProjectLaptopStore.Entity.WareHouseEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Admin_WarehouseResponseDTO {
    private List<WareHouseEntity> warehouseList;
    private WareHouseEntity warehouseInfo;
    private Integer totalQuantity;
    private Integer countProductsMaxStockLevel;
    private Integer countProductsMinStockLevel;
    private List<ImportExport_ReceiptDTO> listExportReceipt;
    private List<ImportExport_ReceiptDTO> listImportReceipt;
    private List<ProductsInWarehouse_DTO> listProductsInWarehouse;

}
