package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.Order_CountTotalAmountDTO;
import com.example.ProjectLaptopStore.DTO.Order_InvoiceDetailDTO;
import com.example.ProjectLaptopStore.DTO.Order_ListBillDTO;

import java.math.BigDecimal;
import java.util.List;

public interface IOrderService {
    BigDecimal getTotalAmountInMountAtService();
    Integer TotalCustomerInMonthAtService();
    List<Order_ListBillDTO> ListBillAtService();
    List<Order_InvoiceDetailDTO> ListInvoiceDetailAtService();
    List<Order_CountTotalAmountDTO> listCountTotalAmountAtService();
}
