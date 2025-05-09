package com.example.ProjectLaptopStore.Repository.Custom;

import com.example.ProjectLaptopStore.DTO.ImportExport_ReceiptDTO;

import java.util.List;

public interface ExportReceiptDetailsRepositoryCustom {
    List<ImportExport_ReceiptDTO> listExportReceipt(Integer warehouseID);
}
