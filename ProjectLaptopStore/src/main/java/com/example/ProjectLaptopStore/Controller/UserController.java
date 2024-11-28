package com.example.ProjectLaptopStore.Controller;


import com.example.ProjectLaptopStore.Response.User_HomeResponseDTO;
import com.example.ProjectLaptopStore.Service.ProductDescriptionService;
import com.example.ProjectLaptopStore.Service.ProductService;
import com.example.ProjectLaptopStore.Service.UserService;

import com.example.ProjectLaptopStore.DTO.*;
import com.example.ProjectLaptopStore.Entity.Enum.ProDescription_FindByUserDemand_Enum;
import com.example.ProjectLaptopStore.Entity.Enum.Product_FindProductsByPriceRange_Enum;
import com.example.ProjectLaptopStore.Entity.ShippingAddressEntity;
import com.example.ProjectLaptopStore.Repository.ShippingAddressesRepository;
import com.example.ProjectLaptopStore.Response.User_HomeResponseDTO;
import com.example.ProjectLaptopStore.Service.*;
import com.example.ProjectLaptopStore.Util.JwtTokenUtil;
import com.nimbusds.jose.JOSEException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RestController
public class UserController {
    @Autowired
    private ProductDescriptionService productDescriptionService;

    @Autowired
    private SuppliersService suppliersService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;


    @Autowired
    OrderService orderService;

    @Autowired
    OrderDetailService orderDetailService;

    @Autowired
    private ShippingAddressesService shippingAddressesService;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    CartDetailService cartDetailService;


    //API lấy thông tin cho homepage
    @GetMapping(value = "/user/home/")
    public User_HomeResponseDTO getHomePage(@RequestParam(value = "keyword",required = false) String keyword){
        User_HomeResponseDTO result = userService.userHomePage(keyword);
        return result;
    }

    // hien thi thong tin ca nhan
    @GetMapping(value = "/user/myInfor")
    public User_DTO getMyInfor(){
        User_DTO dto = userService.UserInfor();
        return  dto;
    }

    // API cap nhat thong tin user
    @PostMapping(value = "/user/update-infor")
    public ResponseEntity<?> updateUser(@RequestBody(required = true) User_UpdateUserDTO dto,
                                        @RequestHeader("Authorization") String authorization){
        String token = authorization.substring("Bearer ".length());
        int userID = jwtTokenUtil.getUserID(token);
        userService.updateUser(dto,userID);
        return ResponseEntity.ok("User updated successfully");
    }


    //API hien thi danh sach order
    @GetMapping(value = "/user/orders/")
    public List<OrderDetail_displayForStatusDTO> getOrders(@RequestParam(name = "customerID")int customerID){
        List<OrderDetail_displayForStatusDTO> rs = orderDetailService.listDisplayForStatus(customerID);
        return rs;
    }


    // API hien thi danh sach order theo status
    @GetMapping(value = "/user/orders/status")
    public List<OrderDetail_displayForStatusDTO> displayOrderDetalByStatus(@RequestParam(name = "status")String status){
        List<OrderDetail_displayForStatusDTO> rs = orderDetailService.displayForStatus(status);
        return rs;
    }

    // API lay danh sach Shipping address
    @GetMapping(value = "/user/shipping-address")
    public List<ShippingAddressesDTO> getShippingAddresses(@RequestHeader("Authorization")String authorization){
        String token = authorization.substring("Bearer ".length());
        int customerID = jwtTokenUtil.getCustomerID(token);
        List<ShippingAddressesDTO> rs = shippingAddressesService.getAllShippingAddresses(customerID);
        return rs;
    }

    // API them dia chi nhan hang
    @PostMapping(value = "/user/add-shipping-address")
    public ResponseEntity<?> addShippingAddress(@RequestHeader("Authorization")String authorization,
                                                    @RequestBody ShippingAddressesDTO dto){
        String token = authorization.substring("Bearer ".length());
        int customerID = jwtTokenUtil.getCustomerID(token);
        shippingAddressesService.addShippingAddresses(dto,customerID);
        return ResponseEntity.ok("Shipping address added successfully");
    }

    // API cap nhat thon tin dia chi nhan hang
    @PutMapping(value = "/user/update-shipping-address")
    public ResponseEntity<?> updateShippingAddress(@RequestBody ShippingAddressesDTO dto){
        shippingAddressesService.updateShippingAddresses(dto);
        return ResponseEntity.ok("Shipping address updated successfully");
    }

    // API xoa dia chi nhan hang
    @DeleteMapping(value = "/user/remove-shipping-address")
    public ResponseEntity<?> removeShippingAddress(@RequestParam(value = "addressID")int addressID){
        shippingAddressesService.deleteShippingAddresses(addressID);
        return ResponseEntity.ok("Shipping address removed successfully");
    }

    // API lay ra cartdetail
    @GetMapping(value = "/user/mycart/cart-detail")
    public List<CartDetailDTO> getCartDetail(@RequestHeader("Authorization")String authorization){
        String token = authorization.substring("Bearer ".length());
        int cartID = jwtTokenUtil.getCartID(token);
        List<CartDetailDTO> rs = cartDetailService.getAllCartDetails(cartID);
        return rs;
    }

    // API xoa sp trong cart
    @DeleteMapping(value = "/user/mycart/remove-cartdetail")
    public ResponseEntity<?> deleteCartDetail(@RequestParam("cartDetailID")int cartDetailID){
        cartDetailService.deleteCartDetail(cartDetailID);
        return ResponseEntity.ok("Cart detail deleted successfully");
    }

    //API tao don hang moi
    @PutMapping(value = "/user/mycart/create-order")
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO dto,
                                         @RequestHeader("Authorization")String authorization){
        String token = authorization.substring("Bearer ".length());
        try {
            TokenValidDTO valid = jwtTokenUtil.validateToken(token);
            if(!valid.isValid())
                return ResponseEntity.badRequest().body(valid);
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        int customerID = jwtTokenUtil.getCustomerID(token);
        orderService.createOrder(dto,customerID);
        return ResponseEntity.ok("Order created successfully");
    }

    @PostMapping(value = "/user/mycart/addition-quantity")
    public ResponseEntity<?> additionQuantity(@RequestParam("cartDetailID")int cartDetailID){
            cartDetailService.additionQuantity(cartDetailID);
            return ResponseEntity.ok("Addition quantity added successfully");
    }

    @PostMapping(value = "/user/mycart/subtraction-quantity")
    public ResponseEntity<?> subtractionQuantity(@RequestParam("cartDetailID")int cartDetailID){
        cartDetailService.subtractionQuantity(cartDetailID);
        return ResponseEntity.ok("Subtraction quantity subtraction successfully");
    }

}
