package com.example.ProjectLaptopStore.DTO;

import com.example.ProjectLaptopStore.Entity.UserEntity;
import com.example.ProjectLaptopStore.Repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CustomUserDetails{

    private int id_User;
    private int id_Customer;
    private int id_Cart;
    private String phoneNumber;
    private GrantedAuthority authorities;



    public CustomUserDetails() {
    }

//    public Collection<? extends GrantedAuthority> getAuthorities(UserEntity user) {
//        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
//        authorityList.add(new SimpleGrantedAuthority("ROLE_"+user.getUserType()));
////        authorityList.add(new SimpleGrantedAuthority("ROLE_USER"));
//        return authorityList;
//    }



}
