package com.example.ProjectLaptopStore.Service.Impl;

import com.example.ProjectLaptopStore.Builder.CustomerSearchBuilder;
import com.example.ProjectLaptopStore.Convert.Customer_CountNewCustomerConverter;
import com.example.ProjectLaptopStore.DTO.Customer_CountNewCustomerPerMonthDTO;
import com.example.ProjectLaptopStore.DTO.Customer_CreateCustomerDTO;
import com.example.ProjectLaptopStore.DTO.Customer_FindTopCustomerInMonthDTO;
import com.example.ProjectLaptopStore.DTO.Customer_UpdateCustomerDTO;
import com.example.ProjectLaptopStore.Entity.CustomerEntity;
import com.example.ProjectLaptopStore.Entity.UserEntity;
import com.example.ProjectLaptopStore.Repository.ICustomerRepository;
import com.example.ProjectLaptopStore.Repository.IUserRepository;
import com.example.ProjectLaptopStore.Service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CustomerServiceImpl implements ICustomerService {
    @Autowired
    private ICustomerRepository customerRepository;
    @Autowired
    private Customer_CountNewCustomerConverter customerCountNewCustomerConverter;

    @Autowired
    private IUserRepository userRepository;
    @Override
    public List<Customer_CountNewCustomerPerMonthDTO> listCountNewCustomerPerMonth() {
        List<Customer_CountNewCustomerPerMonthDTO> result = customerRepository.listNewCustomerPerMonth();
        return result;
    }

    @Override
    public void deleteCustomerAtService(Long[] ids) {
        List<CustomerEntity> listCustomerDeleteById = customerRepository.findAllByCustomerIDIn(ids);
        customerRepository.deleteCustomer(listCustomerDeleteById);

    }

    @Override
    public void createCustomerAtService(Customer_CreateCustomerDTO customerCreate) {
        customerRepository.createCustomer(customerCreate);
    }

    @Override
    public void updateCustomerAtService(Customer_UpdateCustomerDTO customerUpdate) {
        CustomerEntity customerEntity = customerRepository.findById(customerUpdate.getCustomerId()).get();
        UserEntity userEntity = userRepository.findById(customerEntity.getUser().getUserID()).get();
        customerRepository.updateCustomer(customerUpdate,customerEntity,userEntity);
    }

    @Override
    public List<Customer_FindTopCustomerInMonthDTO> listTopCustomerInMonth() {
        List<Customer_FindTopCustomerInMonthDTO> result = customerRepository.listTopCustomerInMonth();
        return result;
    }

    @Override
    public Integer getNewCustomerCurrentMonth() {
        Integer result = customerRepository.getNewCustomerCurrentMonth();
        return result;
    }

//    @Override
//    public Integer countCustomers(Map<String, Object> params) {
//        CustomerSearchBuilder customerSearchBuilder = customerCountNewCustomerConverter.toCustomerSearchBuilder(params);
//        Integer result = customerRepository.countNewCustomer(customerSearchBuilder);
//        return result;
//    }


}
