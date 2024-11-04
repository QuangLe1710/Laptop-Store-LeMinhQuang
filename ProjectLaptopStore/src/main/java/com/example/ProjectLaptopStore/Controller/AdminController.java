package com.example.ProjectLaptopStore.Controller;

import com.example.ProjectLaptopStore.ControllerLogic.AdminDashBoardLogic;
import com.example.ProjectLaptopStore.DTO.*;
import com.example.ProjectLaptopStore.Response.Admin_DashBoardResponseDTO;
import com.example.ProjectLaptopStore.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RequestMapping("/admin")
public class AdminController {

//    @PersistenceContext
//    private EntityManager entityManager;

    @Autowired
    private IProductService productService;

    @Autowired
    private IOrderService orderService;

    @Autowired
    private ICustomerService customerService;

    @Autowired
    private ISuppliersService suppliersService;

    @Autowired
    private IOrderDetailService orderDetailService;

    @Autowired
    private AdminDashBoardLogic adminDashBoardLogic;

    //============================================= API test từng thành phần =========================================


    //API lấy số sản phẩm bán trong tháng
    @GetMapping(value = "/admin/sellproduct/")
    public Integer getQuantityProductCurrentMonth(){
        Integer result = orderDetailService.getQuantityProductCurrentMonthAtService();
        return result;
    }
    //API lấy tổng tiền trong tháng hiện tại
    @GetMapping(value = "/admin/totalmount/")
    public BigDecimal TotalAmountInMount(){
        BigDecimal res = orderService.getTotalAmountInMountAtService();
        return res;
    }


    //API lấy tổng khách hàng trong tháng hiện tại
    @GetMapping(value = "/admin/totalcustomer/")
    public Integer TotalCustomerInMonth(){
        Integer result = orderService.TotalCustomerInMonthAtService();
        return result;
    }

    //API lấy số khách hàng mới trong thời điểm nhất định
//    @GetMapping(value = "/admin/countcustomer/")
//    public Integer CountNewCustomer(@RequestParam Map<String,Object> params){
//        Integer result = customerService.countCustomers(params);
//        return result;
//    }

    //API lấy số khách mới trong tháng
    @GetMapping(value = "/admin/newcustomer/")
    public Integer NewCustomerInMonth(){
        Integer result = customerService.getNewCustomerCurrentMonth();
        return result;
    }


   //API lấy số khách mới mỗi tháng cho biểu đồ
    @GetMapping(value = "/admin/countcustomer/")
    public List<Customer_CountNewCustomerPerMonthDTO> CountCustomerInMonth(){
        List<Customer_CountNewCustomerPerMonthDTO> result = customerService.listCountNewCustomerPerMonth();
        return result;
    }


    //API lấy số sp bán được trong các tháng cho biểu đồ
    @GetMapping(value = "/admin/quantitysell/")
    public List<OrderDetail_CountQuantityProductPerMonthDTO> QuantitySellProduct(){
        List<OrderDetail_CountQuantityProductPerMonthDTO> result = orderDetailService.listCountQuantityProductPerMonth();
        return result;
    }

    //API lấy doanh thu trong các tháng
    @GetMapping(value = "/admin/totalamount/")
    public List<Order_CountTotalAmountDTO> TotalAmount(){
        List<Order_CountTotalAmountDTO> result = orderService.listCountTotalAmountAtService();
        return result;
    }

    //API lấy top sản phẩm
    @GetMapping(value = "/admin/topproduct/")
    public List<Product_FindTopPurchasedProductsDTO> TopProduct(){
        List<Product_FindTopPurchasedProductsDTO> result = productService.findTopPurchasedProductAtService();
        return result;
    }

    //API lấy top nhà cung cấp
    @GetMapping(value = "/admin/topsuppliers/")
    public List<Supplier_FindTopSupplierDTO> TopSuppliers(){
        List<Supplier_FindTopSupplierDTO> result = suppliersService.listTopSupplier();
        return result;
    }


    //API tạo sản phẩm
    @PostMapping("/admin/createproduct/")
    public void createProduct(@RequestBody Product_CreateProductDTO createProductDTO){
        productService.createNewProduct(createProductDTO);
    }

    //API tạo khách hàng
    @PostMapping("/admin/createcustomer/")
    public void createCustomer(@RequestBody Customer_CreateCustomerDTO createCustomerDTO){
        customerService.createCustomerAtService(createCustomerDTO);
    }
    //API tạo nhà cung cấp
    @PostMapping("/admin/createsupplier/")
    public void createSupplier(@RequestBody Supplier_CreateSupplierDTO createSupplierDTO){
        suppliersService.createSupplier(createSupplierDTO);
    }


    //API cập nhật  sản phẩm (trả về cho repo product chứa id)
    @PutMapping("/admin/updateproduct/")
    public void updateProduct(@RequestBody Product_UpdateProductDTO updateProductDTO){
        productService.updateProduct(updateProductDTO);
    }

    //API cập nhật người dùng
    @PutMapping("/admin/updatecustomer/")
    public void updateCustomer(@RequestBody Customer_UpdateCustomerDTO customerUpdateDTO){
        customerService.updateCustomerAtService(customerUpdateDTO);
    }
    //API cập nhật nhà cung cấp
    @PutMapping("/admin/updatesupplier/")
    public void updateSupplier(@RequestBody Supplier_UpdateSupplierDTO supplierUpdateDTO){
        suppliersService.updateSupplier(supplierUpdateDTO);
    }


    // cách chạy test api xóa trên postman là đẩy id sản phẩm về thanh param (dạng check box)
    // http://localhost:8080/admin/deleteproduct/5,6,2
    //API xóa sản phẩm
    @DeleteMapping("/admin/deleteproduct/{ids}")
    public void deleteProduct(@PathVariable Long[] ids){
        productService.deleteProduct(ids);
    }
    //API xóa khách hàng ( thay đổi status)
    @DeleteMapping("/admin/deletecustomer/{ids}")
    public void deleteCustomer(@PathVariable Long[] ids){
        customerService.deleteCustomerAtService(ids);
    }
    //API xóa nhà cung cấp
    @DeleteMapping("/admin/deletesuppliers/{ids}")
    public void deleteSupplier(@PathVariable Long[] ids){
        suppliersService.deleteSupplier(ids);
    }

    //API lấy danh sách top người tiêu dùng trong tháng
    @GetMapping("/admin/topcustomer/")
    public List<Customer_FindTopCustomerInMonthDTO> TopCustomerInMonth(){
        List<Customer_FindTopCustomerInMonthDTO> result = customerService.listTopCustomerInMonth();
        return result;
    }

    //API lấy danh sách bill
    @GetMapping(value = "/admin/listbill/")
    public List<Order_ListBillDTO> ListBill(){
        List<Order_ListBillDTO> result = orderService.ListBillAtService();
        return result;
    }

    //API lấy danh sách invoice chi tiết
    @GetMapping(value = "/admin/list_invoicedetail/")
    public List<Order_InvoiceDetailDTO> ListInvoice(){
        List<Order_InvoiceDetailDTO> result = orderService.ListInvoiceDetailAtService();
        return result;
    }


    //========================================== API chính của admin =====================================================

    //API cho trang dashboard
    //chưa tối ưu
    @GetMapping(value = "/dashboard/")
    public Admin_DashBoardResponseDTO adminDashBoard(){
        Admin_DashBoardResponseDTO result = adminDashBoardLogic.setValueForDashBoard();
        return result;
    }




}
