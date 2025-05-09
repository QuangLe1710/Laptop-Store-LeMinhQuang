package com.example.ProjectLaptopStore.Repository.Custom;

import com.example.ProjectLaptopStore.DTO.ImportExport_ReceiptDTO;

import java.util.List;

public interface ImportReceiptDetailsRepositoryCustom {
    List<ImportExport_ReceiptDTO> listImportReceipt(Integer warehouseID);
}
