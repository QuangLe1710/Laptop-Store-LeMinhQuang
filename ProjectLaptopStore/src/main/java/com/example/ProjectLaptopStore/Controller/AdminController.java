package com.example.ProjectLaptopStore.Controller;

import com.example.ProjectLaptopStore.DTO.*;
import com.example.ProjectLaptopStore.Entity.SuppliersEntity;
import com.example.ProjectLaptopStore.Entity.WareHouseEntity;
import com.example.ProjectLaptopStore.Response.*;
import com.example.ProjectLaptopStore.Service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//Lớp kiểm soát api của role admin
@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/admin")
public class AdminController {

//    @PersistenceContext
//    private EntityManager entityManager;
    @Autowired
    private PromotionService promotionService;

    @Autowired
    private WareHouseService wareHouseService;
    @Autowired
    private ProductService productService;
    @Autowired
    private CustomerService customerService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private SuppliersService suppliersService;
    @Autowired
    private ProductInWareHouseService productInWarehouseService;
    //API cho trang dashboard
    @Operation(summary = "Get dashboard data for admin")
    //thông báo lỗi cụ thể trên công cụ test
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved dashboard data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - token is invalid or expired"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping(value = "/dashboard/")
    public Admin_DashBoardResponseDTO adminDashBoard(){
        Admin_DashBoardResponseDTO result = adminService.adminDashBoardAtService();
        return result;
    }
    //API cho trang bill
    @GetMapping(value = "/bill/")
    public Admin_BillResponseDTO adminBilling(){
        Admin_BillResponseDTO result = adminService.adminBillingAtService();
        return result;
    }

    //API lấy thong tin trang nhà kho
    @GetMapping(value = "/warehouse/{warehouseID}")
    public Admin_WarehouseResponseDTO adminWareHouse(@PathVariable(name = "warehouseID") Integer warehouseID){
        return adminService.adminReceiptAtService(warehouseID);
    }

    //API lấy thông tin của sản phẩm được chọn để sửa ở màn kho hàng
    @GetMapping(value = "/warehouse/update-product/{productID}")
    public ProductsInWarehouse_DTO getProductsInWarehouse(@PathVariable(name = "productID") Integer productID){
        return productInWarehouseService.getProductInWarehouse(productID);
    }
    //API cập nhật thông tin của sản phẩm trong kho
    //productID không cần dùng
    @PutMapping(value = "/warehouse/update-product/{productID}")
    public void warehouseUpdate(@RequestBody ProductsInWarehouse_DTO productsInWarehouseUpdate){
        productInWarehouseService.productInWareHouseUpdate(productsInWarehouseUpdate);
    }
    //API lấy thông tin nhà kho để sửa
    @GetMapping(value = "/warehouse/update/{id}")
    public WareHouseEntity getWarehouse(@PathVariable(name = "id") Integer id){
        return wareHouseService.getWareHouseById(id);
    }
    //API câp nhật thông tin nhà kho
    @PutMapping(value = "/warehouse/update/{id}")
    public void updateWarehouse(@RequestBody WareHouseEntity wareHouseNew){
        wareHouseService.updateWareHouse(wareHouseNew);
    }

    //API tạo nhà kho mới
    @PostMapping(value = "/warehouse/create")
    public void createWarehouse(@RequestBody WareHouseEntity wareHouseNew){
        wareHouseService.createWareHouse(wareHouseNew);
    }

    //API xóa nhà kho
    @DeleteMapping(value = "/warehouse/{id}")
    public void deleteWarehouse(@PathVariable(name = "id") Integer id){
        wareHouseService.deleteWareHouse(id);
    }


    //API lay thong tin cac khuyen mai
    @GetMapping(value = "/promotion")
    public List<Promotions_DisplayPromotionsDTO> promotion(){
        List<Promotions_DisplayPromotionsDTO> rs = promotionService.getPromotions();
        return rs;
    }
    @GetMapping(value = "/promotion/")
    public Promotions_DisplayPromotionsDTO getPromotionbyID(@RequestParam(name = "promotionID")int promotionID){
        Promotions_DisplayPromotionsDTO rs = promotionService.getPromotionByID(promotionID);
        return rs;
    }
    //API tìm kiếm khuyến mãi theo tên
    @GetMapping(value = "/promotion/{promotionName}")
    public List<Promotions_DisplayPromotionsDTO> SearchPromotion(@PathVariable(name = "promotionName") String promotionName){
        List<Promotions_DisplayPromotionsDTO> result = promotionService.searchPromotion(promotionName);
        return  result;
    }
    //API hiển thị thông tin khuyến mãi cụ thể
    @GetMapping(value = "/promotion-product/{id}")
    public List<Promotion_getPromotionProductDTO> displayPromotionProduct(@PathVariable(name = "id")int id){
        List<Promotion_getPromotionProductDTO> rs = promotionService.displayPromotionProduct(id);
        return  rs;
    }

    //API tim kiem san pham de them khuyen mai
    @GetMapping(value = "/promotion-product/")
    public List<Promotion_getPromotionProductDTO> searchProduct(@RequestParam(name = "promotionID")int promotionID,
                                                                @RequestParam(name = "productName")String productName){
         List<Promotion_getPromotionProductDTO> rs = promotionService.searchProductByName(promotionID,productName);
         return rs;
    }
    //API thêm mã giảm giá cho sản phẩm
    @PostMapping(value = "/promotion-product/add-promotion/{productID}/{promotionID}")
    public ResponseEntity<?> addPromotion(@PathVariable(name = "productID")int productID,
                                          @PathVariable(name = "promotionID")int promotionID){
            promotionService.addPromotionProduct(productID,promotionID);
            return  ResponseEntity.ok("success");
    }

    //API cap nhat thong tin khuyen mai
    @PostMapping(value = "/promotion/update-promotion")
    public ResponseEntity<?> updatePromotion(@RequestBody(required = false)Promotions_DisplayPromotionsDTO dto){
        promotionService.updatePromotion(dto);
        return  ResponseEntity.ok("success");

    }
    //API xóa mã giảm giá cho sản phẩm
    @DeleteMapping(value = "/promotion-.product/remove-promotion/{productID}/{promotionID}")
    public ResponseEntity<?> removePromotion(@PathVariable(name = "productID")int productID,
                                             @PathVariable(name = "promotionID")int promotionID){
        promotionService.deletePromotionProduct(productID,promotionID);
        return  ResponseEntity.ok("success");
    }

    //API lấy thông tin cho màn quản lý khách hàng
    @GetMapping(value = "/customer/")
    public Admin_CustomerResponseDTO adminCustomer(){

        return customerService.adminCustomer();
    }

    //API xóa khách hàng
    @DeleteMapping(value = "/customer/{ids}")
    public void customerDelete(@PathVariable(name = "ids") Long[] ids){
        customerService.deleteCustomerAtService(ids);
    }

    //API thêm khách hàng
    @PostMapping(value = "/customer/create-customer/")
    public void customerCreate(@RequestBody CustomerDTO customerNew){
        customerService.createCustomerAtService(customerNew);
    }

    //API lấy thông tin chi tiết cho form sửa thông tin khách
    @GetMapping(value = "/customer/update/{id}")
    public CustomerDTO getCustomerById(@PathVariable(name = "id") Integer id){
        return customerService.getCustomerByID(id);
    }

    //API sửa khách hàng
    @PutMapping(value = "/customer/update/{id}")
    public void customerUpdate(@RequestBody CustomerDTO customerUpdate){
        customerService.updateCustomerAtService(customerUpdate);
    }

    //API lấy thông tin sản phẩm
    @GetMapping(value = "/product/")
    public Admin_ProductResponseDTO adminProduct(){
        return productService.adminProduct();
    }

    //API lấy thông tin sản phẩm bằng id
    @GetMapping(value = "/product/update/{id}")
    public Admin_ProductDetailResponseDTO getProductById(@PathVariable(name = "id") Integer id){
        return productService.adminProductDetail(id);
    }
    
    //API tạo sản phẩm
    @PostMapping("/product/create")
    public void createProduct(@RequestBody ProductDetailDTO createProductDTO){
        productService.createNewProduct(createProductDTO);
    }
    //API cập nhật  sản phẩm
    @PutMapping(value = "/product/update/{id}")
    public void updateProduct(@RequestBody ProductDetailDTO updateProductDTO){
        productService.updateProduct(updateProductDTO);
    }
    //API xóa sản phẩm bằng id
    @DeleteMapping(value = "/product/{ids}")
    public void deleteProduct(@PathVariable Long[] ids){
        productService.deleteProduct(ids);
    }


    //API lấy thông tin cho quản lý nhà cung cấp
    @GetMapping(value = "/supplier/")
    public List<SuppliersEntity> getListSupplier(){
        return suppliersService.getListSupplier();
    }

    //API lấy thông tin nhà cung cấp lên để sửa
    @GetMapping(value = "/supplier/update/{id}")
    public SuppliersEntity getSupplierByID (@PathVariable(name = "id") Integer id){
        return suppliersService.getSupplierByID(id);
    }

    //API tạo nhà cung cấp
    @PostMapping(value = "/supplier/create")
    public void createSupplier(@RequestBody SupplierDTO supplierNew){
        suppliersService.createSupplier(supplierNew);
    }

    //API cập nhật nhà cung cấp
    @PutMapping(value = "/supplier/update/{id}")
    public void updateSupplier(@RequestBody SupplierDTO supplierUpdateDTO){
        suppliersService.updateSupplier(supplierUpdateDTO);
    }

    //API xóa nhà cung cấp
    @DeleteMapping("/supplier/{ids}")
    public void deleteSupplier(@PathVariable Long[] ids){
        suppliersService.deleteSupplier(ids);
    }

}
