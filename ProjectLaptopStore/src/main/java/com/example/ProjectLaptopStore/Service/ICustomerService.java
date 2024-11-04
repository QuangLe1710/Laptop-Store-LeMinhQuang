package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.Customer_CountNewCustomerPerMonthDTO;
import com.example.ProjectLaptopStore.DTO.Customer_CreateCustomerDTO;
import com.example.ProjectLaptopStore.DTO.Customer_FindTopCustomerInMonthDTO;
import com.example.ProjectLaptopStore.DTO.Customer_UpdateCustomerDTO;

import java.util.List;
import java.util.Map;

public interface ICustomerService {
//    Integer countCustomers(Map<String, Object> params);
    List<Customer_CountNewCustomerPerMonthDTO> listCountNewCustomerPerMonth();
    void deleteCustomerAtService(Long[] ids);
    void createCustomerAtService(Customer_CreateCustomerDTO customerCreate);
    void updateCustomerAtService(Customer_UpdateCustomerDTO customerUpdate);
    List<Customer_FindTopCustomerInMonthDTO> listTopCustomerInMonth();
    Integer getNewCustomerCurrentMonth();
}
