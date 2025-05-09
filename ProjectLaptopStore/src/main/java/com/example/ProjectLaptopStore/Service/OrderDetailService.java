package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.OrderDetail_CountQuantityProductPerMonthDTO;
import com.example.ProjectLaptopStore.DTO.OrderDetail_displayForStatusDTO;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetail_CountQuantityProductPerMonthDTO> listCountQuantityProductPerMonth();
    Integer getQuantityProductCurrentMonthAtService();

    //lay danh sach orderdetail
    List<OrderDetail_displayForStatusDTO> listDisplayForStatus(int orderID);

    //hien thi orderdetail theo Status
    List<OrderDetail_displayForStatusDTO> displayForStatus(String status);
}
