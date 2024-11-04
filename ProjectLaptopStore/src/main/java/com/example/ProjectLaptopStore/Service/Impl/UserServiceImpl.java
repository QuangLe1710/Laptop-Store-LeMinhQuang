package com.example.ProjectLaptopStore.Service.Impl;

import com.example.ProjectLaptopStore.DTO.*;
import com.example.ProjectLaptopStore.Entity.Enum.User_Enum;
import com.example.ProjectLaptopStore.Entity.UserEntity;
import com.example.ProjectLaptopStore.Exception.UserAlreadyExistsException;
import com.example.ProjectLaptopStore.Exception.UserNotFoundException;
import com.example.ProjectLaptopStore.Repository.IUserRepository;
import com.example.ProjectLaptopStore.Service.IUserService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal=true)
public class UserServiceImpl implements IUserService {

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
    IUserRepository userRepository;
    ModelMapper modelMapper;
//    private final Authentication authentication;
    @NonFinal
    @Value("${jwt.signerKey}")
    protected  String SIGNER_KEY;

//    private final UserAPI userAPI;

    // lay tat ca user
    @Override
    public List<User_RegisterDTO> getAllUsers() {
        List<UserEntity> entities = userRepository.findAll();
        List<User_RegisterDTO> user_loginDTO = new ArrayList<>();
        for (UserEntity entity : entities) {
            User_RegisterDTO loginDTO = new User_RegisterDTO();
            loginDTO = modelMapper.map(entity, User_RegisterDTO.class);
            user_loginDTO.add(loginDTO);
        }
        return  user_loginDTO;
    }

    // tao user
    @Override
    public void createUser(User_RegisterDTO user) {
        if(userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            try {
                throw new UserAlreadyExistsException("User already exists");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Date date = Date.from(user.getRegisterDate().atZone(ZoneId.systemDefault()).toInstant());
        UserEntity userEntity = new UserEntity();
        userEntity = modelMapper.map(user, UserEntity.class);
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userEntity.setRegistrationDate(date);
        userEntity.setUserType(User_Enum.customer);
        userRepository.save(userEntity);
    }

    //update user
    @Override
    public void updateUser(String phoneNumber, User_RegisterDTO user) {
        UserEntity userEntity = userRepository.findAllByPhoneNumber(phoneNumber);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if(userEntity != null) {
            userEntity = modelMapper.map(user,UserEntity.class);
            userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        else throw new UserNotFoundException("User not found");
    }


    // xoa user
    @Transactional
    @Override
    public void deleteUser(String phoneNumber) {
        if(userRepository.existsByPhoneNumber(phoneNumber)) {
            userRepository.deleteByPhoneNumber(phoneNumber);
        }
        else throw new RuntimeException("So dien thoai khong ton tai");
    }
// tra ve token
    @Override
    public User_AuthenticationResponseDTO Authenticate(String phoneNumber, String password) {
        UserEntity userEntity = userRepository.findAllByPhoneNumber(phoneNumber);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if(userEntity != null) {
            boolean status =  passwordEncoder.matches(password, userEntity.getPassword());
            var token = generateToken(userEntity);
            if(!status)
                token = null;
            return User_AuthenticationResponseDTO.builder()
                    .status(status)
                    .token(token)
                    .build();
        }
        else throw new UserNotFoundException("User not found");

    }

    // kiem tra token co hop le khong
    @Override
    public TokenValidDTO validateToken(IntrospecTokenDTO token) throws JOSEException, ParseException {
        var tk = token.getToken();
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(tk);
        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        var verified = signedJWT.verify(verifier);
        boolean ms = verified && expirationTime.after(new Date());
        String message;
        if (ms == true){
            message = "Login Success";
        }
        else {
            message = "Invalid Token";
        }
        return TokenValidDTO.builder()
                .token(tk)
                .valid(ms)
                .message(message)
                .build();
    }


    //phan trang user
    @Override
    public Page<User_DTO> searchUser(int page, int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        List<UserEntity> entities = userRepository.getUsers(pageable);
        List<User_DTO> userDTOs = new ArrayList<>();
        for (UserEntity entity : entities) {
            User_DTO userDTO = modelMapper.map(entity, User_DTO.class);
            userDTOs.add(userDTO);
        }
        Page<User_DTO> userDTOPage = new PageImpl<>(userDTOs);
        return userDTOPage;
    }

    // tao token
    private String generateToken(UserEntity user){
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);
        String role;
        if(user.getUserType().equals(User_Enum.customer)) {
            role = "customer";
        }
        else {
            role = "admin";
        }
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getPhoneNumber())
                .issuer("laptopabc.com")
                .issueTime(new Date())
                .claim("scope",role)
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(jwsHeader,payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error(e.getMessage() + "Can not create token");
            throw new RuntimeException(e);
        }
    }
}

