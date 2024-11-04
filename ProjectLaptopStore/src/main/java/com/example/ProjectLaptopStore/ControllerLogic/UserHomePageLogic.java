package com.example.ProjectLaptopStore.ControllerLogic;

import com.example.ProjectLaptopStore.DTO.Product_DisplayForHomePageDTO;
import com.example.ProjectLaptopStore.Entity.Enum.ProDescription_FindByUserDemand_Enum;
import com.example.ProjectLaptopStore.Entity.Enum.Product_FindProductsByPriceRange_Enum;
import com.example.ProjectLaptopStore.Response.User_HomeResponseDTO;
import com.example.ProjectLaptopStore.Service.IProductDescriptionService;
import com.example.ProjectLaptopStore.Service.IProductService;
import com.example.ProjectLaptopStore.Service.ISuppliersService;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
@Component
public class UserHomePageLogic {
    @Autowired
    private IProductDescriptionService productDescriptionService;

    @Autowired
    private ISuppliersService suppliersService;


    @Autowired
    private IProductService productService;

    //hàm set dữ liệu cho đối tượng trả ra cho homepageAPI
    public User_HomeResponseDTO setValueForHomePage(String keyword){
        User_HomeResponseDTO homeInfor = new User_HomeResponseDTO();
        try {
            // Nếu keyword không được cung cấp (null), thì không thực hiện tìm kiếm sản phẩm
            if (keyword != null && !keyword.trim().isEmpty()) {
                List<Product_DisplayForHomePageDTO> findProducsByKeyWord;
                findProducsByKeyWord = productService.listSearchProductByKey(keyword);
                homeInfor.setFindProductByKeyword(findProducsByKeyWord);
                if(homeInfor.getFindProductByKeyword()==null || homeInfor.getFindProductByKeyword().isEmpty()){
                    List<Product_DisplayForHomePageDTO> getProductForHomePage = productService.listProductForHomePage();
                    homeInfor.setGetProductForHomePage(getProductForHomePage);
                }
            }else{
                List<Product_DisplayForHomePageDTO> getProductForHomePage = productService.listProductForHomePage();
                homeInfor.setGetProductForHomePage(getProductForHomePage);
            }
            Map<Integer,String> getSuppliersCheckboxBtn = suppliersService.getSupplierForCheckbox();
            Map<List<Integer>,String> getPriceCheckbox = Product_FindProductsByPriceRange_Enum.getPriceRanges();
            Map<String,String> getCPUTechnologyCheckbox = productDescriptionService.getCPUTechnologyForCheckbox();
            Map<Long,Long> getRamCapacityCheckbox = productDescriptionService.getRamCapacityForCheckbox();
            Map<String,String> getHardDriveCheckbox = productDescriptionService.getHardDriveForCheckbox();
            Map<String,String> getCustomerDemandCheckbox = ProDescription_FindByUserDemand_Enum.typeUserDemand();
            Map<String,String> getScreenSizeCheckbox = productDescriptionService.getScreensizeForCheckbox();
            homeInfor.setGetSuppliersForCheckboxAndBtn(getSuppliersCheckboxBtn);
            homeInfor.setGetPriceProductForCheckbox(getPriceCheckbox);
            homeInfor.setGetCPUForCheckbox(getCPUTechnologyCheckbox);
            homeInfor.setGetRamForCheckbox(getRamCapacityCheckbox);
            homeInfor.setGetHardDriveForCheckbox(getHardDriveCheckbox);
            homeInfor.setGetCustomerDemandForCheckBox(getCustomerDemandCheckbox);
            homeInfor.setGetScreenSizeForCheckbox(getScreenSizeCheckbox);
        }catch (Exception e){
            e.printStackTrace();
        }
        return homeInfor;
    }
}
