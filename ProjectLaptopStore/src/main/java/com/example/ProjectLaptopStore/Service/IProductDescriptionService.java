package com.example.ProjectLaptopStore.Service;

import com.example.ProjectLaptopStore.DTO.ProductDescriptionDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface IProductDescriptionService {
    List<ProductDescriptionDTO> finAllProductDescription();

    ProductDescriptionDTO finProductDescriptionById(Long id);
    Map<String,String> getCPUTechnologyForCheckbox();
    Map<Long,Long> getRamCapacityForCheckbox();
    Map<String,String> getHardDriveForCheckbox();
    Map<String,String> getScreensizeForCheckbox();

}
