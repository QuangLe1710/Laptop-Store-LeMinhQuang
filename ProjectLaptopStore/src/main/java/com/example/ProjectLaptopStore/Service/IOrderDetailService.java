package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.OrderDetail_CountQuantityProductPerMonthDTO;

import java.util.List;

public interface IOrderDetailService {
    List<OrderDetail_CountQuantityProductPerMonthDTO> listCountQuantityProductPerMonth();
    Integer getQuantityProductCurrentMonthAtService();
}
