package com.example.ProjectLaptopStore.Response;

import com.example.ProjectLaptopStore.DTO.ProductDetailDTO;
import com.example.ProjectLaptopStore.DTO.Product_FindTopPurchasedProductsDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;
@Getter
@Setter
public class User_HomeResponseDTO {
    private List<ProductDetailDTO> findProductByKeyword;
    private List<ProductDetailDTO> getProductForHomePage;
    private List<Product_FindTopPurchasedProductsDTO> getOutstandingProducts;
    private Map<Integer,String> getSuppliersForCheckboxAndBtn;
    private Map<String,String> getPriceProductForCheckbox;
    private Map<String,String> getCPUForCheckbox;
    private Map<Integer,Integer> getRamForCheckbox;
    private Map<String,String> getHardDriveForCheckbox;
    private Map<String,String> getCustomerDemandForCheckBox;
    private Map<String,String> getScreenSizeForCheckbox;

    public User_HomeResponseDTO() {
    }

    public User_HomeResponseDTO(List<ProductDetailDTO> findProductByKeyword, List<ProductDetailDTO> getProductForHomePage, List<Product_FindTopPurchasedProductsDTO> getOutstandingProducts, Map<Integer, String> getSuppliersForCheckboxAndBtn, Map<String, String> getPriceProductForCheckbox, Map<String, String> getCPUForCheckbox, Map<Integer, Integer> getRamForCheckbox, Map<String, String> getHardDriveForCheckbox, Map<String, String> getCustomerDemandForCheckBox, Map<String, String> getScreenSizeForCheckbox) {
        this.findProductByKeyword = findProductByKeyword;
        this.getProductForHomePage = getProductForHomePage;
        this.getOutstandingProducts = getOutstandingProducts;
        this.getSuppliersForCheckboxAndBtn = getSuppliersForCheckboxAndBtn;
        this.getPriceProductForCheckbox = getPriceProductForCheckbox;
        this.getCPUForCheckbox = getCPUForCheckbox;
        this.getRamForCheckbox = getRamForCheckbox;
        this.getHardDriveForCheckbox = getHardDriveForCheckbox;
        this.getCustomerDemandForCheckBox = getCustomerDemandForCheckBox;
        this.getScreenSizeForCheckbox = getScreenSizeForCheckbox;
    }
}
