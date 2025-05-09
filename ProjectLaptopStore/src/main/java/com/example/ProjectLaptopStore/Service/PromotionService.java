package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.Promotion_getPromotionProductDTO;
import com.example.ProjectLaptopStore.DTO.Promotions_DisplayPromotionsDTO;

import java.util.List;

public interface PromotionService {
    List<Promotions_DisplayPromotionsDTO> getPromotions();
    List<Promotions_DisplayPromotionsDTO> searchPromotion(String promotionName);
    List<Promotion_getPromotionProductDTO> displayPromotionProduct(int id);
    void addPromotionProduct(int productID,int promotionID);
    void deletePromotionProduct(int productID,int promotionID);
    void updatePromotion(Promotions_DisplayPromotionsDTO dto);
    List<Promotion_getPromotionProductDTO> searchProductByName(int productID, String productName);
    Promotions_DisplayPromotionsDTO getPromotionByID(int id);
}
