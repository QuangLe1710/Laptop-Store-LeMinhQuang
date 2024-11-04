package com.example.ProjectLaptopStore.Repository.Custom;

import com.example.ProjectLaptopStore.DTO.Customer_CountNewCustomerPerMonthDTO;
import com.example.ProjectLaptopStore.DTO.Customer_CreateCustomerDTO;
import com.example.ProjectLaptopStore.DTO.Customer_FindTopCustomerInMonthDTO;
import com.example.ProjectLaptopStore.DTO.Customer_UpdateCustomerDTO;
import com.example.ProjectLaptopStore.Entity.CustomerEntity;
import com.example.ProjectLaptopStore.Entity.UserEntity;

import java.util.List;


public interface ICustomerRepositoryCustom {
    List<Customer_CountNewCustomerPerMonthDTO> listNewCustomerPerMonth();
//    Integer countNewCustomer(CustomerSearchBuilder customerSearchBuilder); //đếm số người dùng mới
//    List<Customer_FindTopCustomer> findTopCustomer(); //tìm danh sách khách mua nhiều nhất
    void deleteCustomer(List<CustomerEntity> listCustomerDelete);
    void createCustomer(Customer_CreateCustomerDTO customerCreate);
    void updateCustomer(Customer_UpdateCustomerDTO customerUpdate, CustomerEntity customerEntity, UserEntity userEntity);
    List<Customer_FindTopCustomerInMonthDTO> listTopCustomerInMonth();
}

