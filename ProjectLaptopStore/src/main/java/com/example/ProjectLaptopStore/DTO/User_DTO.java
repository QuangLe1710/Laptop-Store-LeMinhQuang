package com.example.ProjectLaptopStore.DTO;

import com.example.ProjectLaptopStore.Entity.Enum.User_Enum;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class User_DTO {
    private int UserID;
    private String fullName;
    private String email;
    private String password;
    private String phoneNumber;
    private User_Enum userType;
    private Date registrationDate;

    public User_DTO(int userID, String fullName, String email, String password, String phoneNumber, User_Enum userType, Date registrationDate) {
        UserID = userID;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.userType = userType;
        this.registrationDate = registrationDate;
    }
}
