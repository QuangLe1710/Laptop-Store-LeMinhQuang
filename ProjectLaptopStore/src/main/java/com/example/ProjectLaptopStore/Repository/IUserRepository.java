package com.example.ProjectLaptopStore.Repository;

import com.example.ProjectLaptopStore.DTO.User_DTO;
import com.example.ProjectLaptopStore.Entity.Enum.User_Enum;
import com.example.ProjectLaptopStore.Entity.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IUserRepository extends JpaRepository<UserEntity,Integer> {
    //lay tat ca user
    List<UserEntity> findAll();

    //tim user theo sdt
    UserEntity findAllByPhoneNumber(String phoneNumber);

    // kiem tra sdt da ton tai chua
    boolean existsByPhoneNumber(String phoneNumber);

    //xoa user theo sdt
    void deleteByPhoneNumber(String phoneNumber);

//    String findByUserType(User_Enum userType);
    @Query(value = "select UserID, fullName, email, password, phoneNumber, userType, registrationDate from users",countQuery = "select count(*) from users", nativeQuery = true)
    List<UserEntity> getUsers(Pageable pageable);
}
