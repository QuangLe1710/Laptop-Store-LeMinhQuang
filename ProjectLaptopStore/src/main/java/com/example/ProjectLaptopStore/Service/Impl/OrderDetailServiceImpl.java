package com.example.ProjectLaptopStore.Service.Impl;

import com.example.ProjectLaptopStore.DTO.OrderDetail_CountQuantityProductPerMonthDTO;
import com.example.ProjectLaptopStore.DTO.OrderDetail_displayForStatusDTO;
import com.example.ProjectLaptopStore.Repository.OrderDetailRepository;
import com.example.ProjectLaptopStore.Service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

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

    @Override
    public List<OrderDetail_displayForStatusDTO> listDisplayForStatus(int orderID) {
        List<Object[]> ob = orderDetailRepository.getOrderDetail(orderID);
        List<OrderDetail_displayForStatusDTO> result = new ArrayList<>();
        for (Object[] o : ob) {
            OrderDetail_displayForStatusDTO dto = OrderDetail_displayForStatusDTO.builder()
                    .orderId((int) o[0])
                    .productId((int) o[1])
                    .productName((String) o[2])
                    .price((BigDecimal) o[3])
                    .imageURL((String) o[4])
                    .build();
            result.add(dto);

        }
        return result;
    }

    @Override
    public List<OrderDetail_displayForStatusDTO> displayForStatus(String status) {
        List<Object[]> ob = orderDetailRepository.SearchOrderDetailByStatus(status);
        List<OrderDetail_displayForStatusDTO> result = new ArrayList<>();
        for (Object[] o : ob) {
            OrderDetail_displayForStatusDTO dto = OrderDetail_displayForStatusDTO.builder()
                    .orderId((int) o[0])
                    .productId((int) o[1])
                    .productName((String) o[2])
                    .price((BigDecimal) o[3])
                    .imageURL((String) o[4])
                    .build();
            result.add(dto);

        }
        return result;
    }
}
