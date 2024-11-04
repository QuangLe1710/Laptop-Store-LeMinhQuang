package com.example.ProjectLaptopStore.Repository;

import com.example.ProjectLaptopStore.Entity.CustomerEntity;
import com.example.ProjectLaptopStore.Repository.Custom.ICustomerRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface ICustomerRepository extends JpaRepository<CustomerEntity,Integer>, ICustomerRepositoryCustom {
    List<CustomerEntity> findAllByCustomerIDIn(Long[] ids);

    //đếm số lượng khách hàng mới trong tháng
    @Query(value =
                    "SELECT count(c.CustomerID) as newcustomer " +
                    "FROM Customers c " +
                    "WHERE MONTH(c.RegistrationDate) = MONTH(CURDATE()) " +
                    "AND YEAR(c.RegistrationDate) = YEAR(CURDATE());", nativeQuery = true)
    Integer getNewCustomerCurrentMonth();
}
