//package com.example.ProjectLaptopStore.Config;
//
//import com.example.ProjectLaptopStore.Entity.AdminEntity;
//import com.example.ProjectLaptopStore.Entity.Enum.User_Enum;
//import com.example.ProjectLaptopStore.Entity.UserEntity;
//import com.example.ProjectLaptopStore.Repository.IUserRepository;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.beans.Encoder;
//
//@Configuration
//@Slf4j
//public class ApplicationConfifAdmin {
//
//    @Bean
//    ApplicationRunner applicationRunner(IUserRepository userRepository) {
//        return args -> {
//            String  user = userRepository.findByUserType(User_Enum.admin).toString();
//            AdminEntity adminEntity = new AdminEntity();
//            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//            if(user == null){
//                UserEntity admin = new UserEntity();
//                admin.setUserType(User_Enum.admin);
//                admin.setPassword(encoder.encode("admin"));
//                admin.setFullName("admin");
//                userRepository.save(admin);
//                log.error("admin added with name " + admin.getFullName() + " and password " + admin.getPassword());
//            }
//        };
//    }
//
//}
