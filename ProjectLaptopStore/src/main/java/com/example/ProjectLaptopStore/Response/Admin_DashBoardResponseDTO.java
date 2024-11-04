package com.example.ProjectLaptopStore.Response;

import com.example.ProjectLaptopStore.DTO.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Setter
public class Admin_DashBoardResponseDTO {
    private Integer quantitySellProductCurrentMonth;
    private Integer totalCustomerInCurrentMonth;
    private Integer totalNewCustomerInCurrentMonth;
    private BigDecimal totalAmountInCurrentMonth;
    private List<Customer_CountNewCustomerPerMonthDTO> newCustomerPerMonthMap;
    private List<Order_CountTotalAmountDTO> totalAmountPerMonthMap;
    private List<OrderDetail_CountQuantityProductPerMonthDTO> totalQuantitySellProductPerMonthMap;
    private List<Product_FindTopPurchasedProductsDTO> topPurchasedProductInMonth;
    private List<Customer_FindTopCustomerInMonthDTO> topCustomerInMonth;

    public Admin_DashBoardResponseDTO() {
    }

    public Admin_DashBoardResponseDTO(Integer quantitySellProductCurrentMonth, Integer totalCustomerInCurrentMonth, Integer totalNewCustomerInCurrentMonth, BigDecimal totalAmountInCurrentMonth, List<Customer_CountNewCustomerPerMonthDTO> newCustomerPerMonthMap, List<Order_CountTotalAmountDTO> totalAmountPerMonthMap, List<OrderDetail_CountQuantityProductPerMonthDTO> totalQuantitySellProductPerMonthMap, List<Product_FindTopPurchasedProductsDTO> topPurchasedProductInMonth, List<Customer_FindTopCustomerInMonthDTO> topCustomerInMonth) {
        this.quantitySellProductCurrentMonth = quantitySellProductCurrentMonth;
        this.totalCustomerInCurrentMonth = totalCustomerInCurrentMonth;
        this.totalNewCustomerInCurrentMonth = totalNewCustomerInCurrentMonth;
        this.totalAmountInCurrentMonth = totalAmountInCurrentMonth;
        this.newCustomerPerMonthMap = newCustomerPerMonthMap;
        this.totalAmountPerMonthMap = totalAmountPerMonthMap;
        this.totalQuantitySellProductPerMonthMap = totalQuantitySellProductPerMonthMap;
        this.topPurchasedProductInMonth = topPurchasedProductInMonth;
        this.topCustomerInMonth = topCustomerInMonth;
    }

}
