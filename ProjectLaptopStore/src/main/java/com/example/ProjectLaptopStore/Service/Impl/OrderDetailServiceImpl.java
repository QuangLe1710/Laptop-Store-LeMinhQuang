package com.example.ProjectLaptopStore.Service.Impl;

import com.example.ProjectLaptopStore.DTO.OrderDetail_CountQuantityProductPerMonthDTO;
import com.example.ProjectLaptopStore.Repository.IOrderDetailRepository;
import com.example.ProjectLaptopStore.Service.IOrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class OrderDetailServiceImpl implements IOrderDetailService {

    @Autowired
    private IOrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetail_CountQuantityProductPerMonthDTO> listCountQuantityProductPerMonth() {
        List<OrderDetail_CountQuantityProductPerMonthDTO> result = orderDetailRepository.listCountQuantityProductPerMonth();
        return result;
    }

    @Override
    public Integer getQuantityProductCurrentMonthAtService() {
        Integer result = orderDetailRepository.getTotalQuantityProductCurrentMonth();
        return result;
    }
}
