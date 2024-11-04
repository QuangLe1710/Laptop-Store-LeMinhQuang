package com.example.ProjectLaptopStore.Response;

import com.example.ProjectLaptopStore.DTO.Product_DisplayForHomePageDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;
@Getter
@Setter
public class User_HomeResponseDTO {
    private List<Product_DisplayForHomePageDTO> findProductByKeyword;
    private List<Product_DisplayForHomePageDTO> getProductForHomePage;
    private Map<Integer,String> getSuppliersForCheckboxAndBtn;
    private Map<List<Integer>,String> getPriceProductForCheckbox;
    private Map<String,String> getCPUForCheckbox;
    private Map<Long,Long> getRamForCheckbox;
    private Map<String,String> getHardDriveForCheckbox;
    private Map<String,String> getCustomerDemandForCheckBox;
    private Map<String,String> getScreenSizeForCheckbox;

    public User_HomeResponseDTO() {
    }

    public User_HomeResponseDTO(List<Product_DisplayForHomePageDTO> findProductByKeyword, List<Product_DisplayForHomePageDTO> getProductForHomePage, Map<Integer, String> getSuppliersForCheckboxAndBtn, Map<List<Integer>, String> getPriceProductForCheckbox, Map<String, String> getCPUForCheckbox, Map<Long, Long> getRamForCheckbox, Map<String, String> getHardDriveForCheckbox, Map<String, String> getCustomerDemandForCheckBox, Map<String, String> getScreenSizeForCheckbox) {
        this.findProductByKeyword = findProductByKeyword;
        this.getProductForHomePage = getProductForHomePage;
        this.getSuppliersForCheckboxAndBtn = getSuppliersForCheckboxAndBtn;
        this.getPriceProductForCheckbox = getPriceProductForCheckbox;
        this.getCPUForCheckbox = getCPUForCheckbox;
        this.getRamForCheckbox = getRamForCheckbox;
        this.getHardDriveForCheckbox = getHardDriveForCheckbox;
        this.getCustomerDemandForCheckBox = getCustomerDemandForCheckBox;
        this.getScreenSizeForCheckbox = getScreenSizeForCheckbox;
    }
}
