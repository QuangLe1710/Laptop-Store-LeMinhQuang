package com.example.ProjectLaptopStore.Repository;

import com.example.ProjectLaptopStore.Entity.Enum.User_Enum;
import com.example.ProjectLaptopStore.Entity.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity,Integer> {
    //lay tat ca user
    List<UserEntity> findAll();

    //tim user theo sdt
    UserEntity findAllByPhoneNumber(String phoneNumber);

    // kiem tra sdt da ton tai chua
    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsByEmail(String email);

    //xoa user theo sdt
    void deleteByPhoneNumber(String phoneNumber);

    @Query(value = "SELECT * FROM users u WHERE u.userType = :usertype",nativeQuery = true)
    UserEntity findByUserType(@Param("usertype")String userType);

    @Query(value = "select UserID, fullName, email, password, phoneNumber, userType, registrationDate from users",countQuery = "select count(*) from users", nativeQuery = true)
    List<UserEntity> getUsers(Pageable pageable);

    //tìm nhiều user vào mảng id
    List<UserEntity> findAllByUserIDIn(Long[] ids);
}
