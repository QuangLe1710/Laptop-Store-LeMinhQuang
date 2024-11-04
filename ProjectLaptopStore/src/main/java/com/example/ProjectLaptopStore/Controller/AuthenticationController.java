////package com.example.ProjectLaptopStore.Controller;
////
////import com.example.ProjectLaptopStore.DTO.*;
////import com.example.ProjectLaptopStore.Service.IUserService;
////import com.nimbusds.jose.JOSEException;
////
////import lombok.RequiredArgsConstructor;
////import org.slf4j.Logger;
////import org.slf4j.LoggerFactory;
////import org.springframework.beans.factory.annotation.Autowired;
////import org.springframework.security.core.context.SecurityContextHolder;
////import org.springframework.web.bind.annotation.*;
////
////import java.text.ParseException;
////import java.util.List;
////
////@RestController
////@RequiredArgsConstructor
//////phân quyền
////public class AuthenticationController {
////    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
////    @Autowired
////    IUserService userService;
////
////    @GetMapping(value = "/users/")
////    public List<User_RegisterDTO> listUserLogin() {
////        var authen = SecurityContextHolder.getContext().getAuthentication();
////        log.info("user name: {}", authen.getName());
////        log.info("Role: {}", authen.getAuthorities());
////        List<User_RegisterDTO> users = userService.getAllUsers();
////        return users;
////    }
////
////    @PostMapping(value = "/register")
////    public void createUser(@RequestBody User_RegisterDTO user) {
////
////        userService.createUser(user);
////    }
////
////    @DeleteMapping(value = "/user-delete/{phoneNumber}")
////    public void deleteUser(@PathVariable String phoneNumber) {
////        userService.deleteUser(phoneNumber);
////    }
////
////    @PostMapping(value = "/login")
////    public User_AuthenticationResponseDTO login(@RequestBody User_LoginDTO user) {
////
////        List<User_RegisterDTO> users = userService.getAllUsers();
////        return userService.Authenticate(user.getPhoneNumber(), user.getPassword());
////    }
////    @PostMapping(value = "/token-valid")
////    public TokenValidDTO login(@RequestBody IntrospecTokenDTO token) throws ParseException, JOSEException {
////            return userService.validateToken(token);
////    }
//////    @PostMapping(value = "/token-valid")
//////    public boolean login(@RequestBody IntrospecTokenDTO token) {
//////        return userService.Authenticate(user.getPhoneNumber(), user.getPassword());
//////    }
////
////}
//
//
//package com.example.ProjectLaptopStore.Controller;
//
//import com.example.ProjectLaptopStore.DTO.*;
//import com.example.ProjectLaptopStore.Entity.UserEntity;
//import com.example.ProjectLaptopStore.Service.IUserService;
//import com.nimbusds.jose.JOSEException;
//
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//import java.text.ParseException;
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
////phân quyền
//public class AuthenticationController {
//    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
//    @Autowired
//    IUserService userService;
//
//    //    @GetMapping(value = "/admin/users")
////    public List<User_RegisterDTO> listUserLogin() {
////        var authen = SecurityContextHolder.getContext().getAuthentication();
////        log.info("user name: {}", authen.getName());
////        log.info("Role: {}", authen.getAuthorities());
////        List<User_RegisterDTO> users = userService.getAllUsers();
////        return users;
////    }
//    @GetMapping(value = "/admin/users")
//    public Page<User_DTO> getAllUsers(@RequestParam(name = "pageNo")int pageNo, @RequestParam(name = "pageSize")int pageSize){
//        Page<User_DTO> rs = userService.searchUser(pageNo,pageSize);
//        return rs;
//    }
//
//    @PostMapping(value = "/user/register")
//    public void createUser(@RequestBody User_RegisterDTO user) {
//
//        userService.createUser(user);
//    }
//
//    @DeleteMapping(value = "/user-delete/{phoneNumber}")
//    public void deleteUser(@PathVariable String phoneNumber) {
//        userService.deleteUser(phoneNumber);
//    }
//
//    @PostMapping(value = "/user/login")
//    public User_AuthenticationResponseDTO login(@RequestBody User_LoginDTO user) {
//
//        List<User_RegisterDTO> users = userService.getAllUsers();
//        return userService.Authenticate(user.getPhoneNumber(), user.getPassword());
//    }
//    @PostMapping(value = "/user/token-valid")
//    public TokenValidDTO login(@RequestBody IntrospecTokenDTO token) throws ParseException, JOSEException {
//        return userService.validateToken(token);
//    }
////    @PostMapping(value = "/token-valid")
////    public boolean login(@RequestBody IntrospecTokenDTO token) {
////        return userService.Authenticate(user.getPhoneNumber(), user.getPassword());
////    }
//
//}