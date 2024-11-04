package com.example.ProjectLaptopStore.DTO;

import com.example.ProjectLaptopStore.Entity.Enum.User_Enum;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class User_RegisterDTO {
    private int id;
    private String fullName;
    private String email;
    private String password;
    private String phoneNumber;
    private String role;
    private LocalDateTime registerDate = LocalDateTime.now();
}
