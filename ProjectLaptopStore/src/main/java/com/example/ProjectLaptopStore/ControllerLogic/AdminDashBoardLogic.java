package com.example.ProjectLaptopStore.ControllerLogic;

import com.example.ProjectLaptopStore.DTO.*;
import com.example.ProjectLaptopStore.Response.Admin_DashBoardResponseDTO;
import com.example.ProjectLaptopStore.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
public class AdminDashBoardLogic {
    @Autowired
    private IProductService productService;

    @Autowired
    private IOrderService orderService;

    @Autowired
    private ICustomerService customerService;

    @Autowired
    private ISuppliersService suppliersService;

    @Autowired
    private IOrderDetailService orderDetailService;

    public Admin_DashBoardResponseDTO setValueForDashBoard(){
        Admin_DashBoardResponseDTO adminInfo = new Admin_DashBoardResponseDTO();
        try {
            Integer productSellInMonth = orderDetailService.getQuantityProductCurrentMonthAtService();
            Integer totalCustomerInMonth = orderService.TotalCustomerInMonthAtService();
            Integer totalNewCustomerInMonth = customerService.getNewCustomerCurrentMonth();
            BigDecimal totalAmountInMonth = orderService.getTotalAmountInMountAtService();
            List<Customer_CountNewCustomerPerMonthDTO> newCustomerForChart = customerService.listCountNewCustomerPerMonth();
            List<Order_CountTotalAmountDTO> totalAmountForChart = orderService.listCountTotalAmountAtService();
            List<OrderDetail_CountQuantityProductPerMonthDTO> quantityProductForChart = orderDetailService.listCountQuantityProductPerMonth();
            List<Product_FindTopPurchasedProductsDTO> listTopProductSell = productService.findTopPurchasedProductAtService();
            List<Customer_FindTopCustomerInMonthDTO> listTopCustomer = customerService.listTopCustomerInMonth();
            adminInfo.setQuantitySellProductCurrentMonth(productSellInMonth);
            adminInfo.setTotalCustomerInCurrentMonth(totalCustomerInMonth);
            adminInfo.setTotalNewCustomerInCurrentMonth(totalNewCustomerInMonth);
            adminInfo.setTotalAmountInCurrentMonth(totalAmountInMonth);
            adminInfo.setNewCustomerPerMonthMap(newCustomerForChart);
            adminInfo.setTotalAmountPerMonthMap(totalAmountForChart);
            adminInfo.setTotalQuantitySellProductPerMonthMap(quantityProductForChart);
            adminInfo.setTopPurchasedProductInMonth(listTopProductSell);
            adminInfo.setTopCustomerInMonth(listTopCustomer);
        }catch (Exception e){
            e.printStackTrace();
        }
        return adminInfo;
    }
}
