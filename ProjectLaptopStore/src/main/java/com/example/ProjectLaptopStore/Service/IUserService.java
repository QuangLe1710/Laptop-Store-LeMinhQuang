package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.*;
import com.example.ProjectLaptopStore.Entity.UserEntity;
import com.nimbusds.jose.JOSEException;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.text.ParseException;
import java.util.List;

public interface IUserService {
    // lay user
    List<User_RegisterDTO> getAllUsers();

    //dang ki user
    void createUser(User_RegisterDTO user) ;

    //update user
    void updateUser(String phoneNumber, User_RegisterDTO user);

    //xoa user
    void deleteUser(String phoneNumber);

    //dang nhap
    User_AuthenticationResponseDTO Authenticate(String phoneNumber, String password);

    // kiem tra hon le token
    TokenValidDTO validateToken(IntrospecTokenDTO token) throws JOSEException, ParseException;

    // phan trang user
    Page<User_DTO> searchUser(int page, int size);
}
