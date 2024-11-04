package com.example.ProjectLaptopStore.Repository;

import com.example.ProjectLaptopStore.Repository.Custom.IOrderRepositoryCustom;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigDecimal;
import com.example.ProjectLaptopStore.Entity.OrdersEntity;

@Repository
public interface IOrderRepository extends JpaRepository<OrdersEntity, Integer> , IOrderRepositoryCustom {
    //lấy tổng tiền từ các hóa đơn từ cột TotalAmount từ bảng Order ,được thanh toán trong tháng hiện tại
    @Query(value = "SELECT SUM(o.TotalAmount) " +
        "FROM Orders o " +
        "WHERE o.OrderDate >= DATE_FORMAT(CURDATE(), '%Y-%m-01') " +
        "AND o.OrderDate <= CURDATE()", nativeQuery = true)
    BigDecimal findTotalAmount();

    //đếm số khách hàng trong tháng hiện tại
    @Query(value = "SELECT COUNT(DISTINCT o.CustomerID) " +
            "FROM Orders o " +
            "WHERE o.OrderDate >= DATE_FORMAT(CURDATE(), '%Y-%m-01') " +
            "AND o.OrderDate <= CURDATE()", nativeQuery = true )
    Integer countCustomersForCurrentMonth();

}
