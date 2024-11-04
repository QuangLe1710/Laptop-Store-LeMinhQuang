package com.example.ProjectLaptopStore.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
@Getter
@Setter
@Entity
@Table(name = "ShippingAddresses")
public class ShippingAddressEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer AddressID;
    @Column(name = "Address")
    private String address;
    @Column(name = "City")
    private String city;
    @Column(name = "District")
    private String district;
    @Column(name = "Ward")
    private String ward;
    @Column(name = "StreetAddress")
    private String streetAddress;
    @ManyToOne
    @JoinColumn(name = "CustomerID")
    private CustomerEntity customer;
}
