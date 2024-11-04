package com.example.ProjectLaptopStore.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "ImportReceipts")
public class ImportReceiptEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer ReceiptID;
    @Column(name = "ImportDate",nullable = false)
    private Date importDate;
    @Column(name = "Importer")
    private String importer;
    @ManyToOne
    @JoinColumn(name = "AdminID")
    private AdminEntity admin;
    @ManyToOne
    @JoinColumn(name = "WarehouseID")
    private WareHouseEntity warehouse;
    @OneToMany(mappedBy = "importReceipt",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<ImportReceiptDetailEntity> importReceiptDetails = new ArrayList<>();
}
