package com.example.ProjectLaptopStore.Repository;

import com.example.ProjectLaptopStore.Entity.OrderDetailEntity;
import com.example.ProjectLaptopStore.Repository.Custom.IOrderDetailRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface IOrderDetailRepository extends JpaRepository<OrderDetailEntity,Integer>, IOrderDetailRepositoryCustom {

    //lấy số lượng sản phẩm bán được trong tháng hiện tại
    @Query(value =
            "SELECT SUM(od.quantity) as totalquantity " +
                    "FROM orderdetails od " +
                    "JOIN orders o ON o.OrderID = od.OrderID " +
                    "WHERE MONTH(o.OrderDate) = MONTH(CURDATE()) " +
                    "  AND YEAR(o.OrderDate) = YEAR(CURDATE())", nativeQuery = true)
    Integer getTotalQuantityProductCurrentMonth();

}
