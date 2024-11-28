package com.example.ProjectLaptopStore.Service.Impl;

import com.example.ProjectLaptopStore.Convert.Order_TotalAmountInMonthDTOConverter;
import com.example.ProjectLaptopStore.DTO.*;
import com.example.ProjectLaptopStore.Entity.*;
import com.example.ProjectLaptopStore.Entity.Enum.OrderStatus_Enum;
import com.example.ProjectLaptopStore.Repository.*;
import com.example.ProjectLaptopStore.Service.*;
import jakarta.persistence.EntityManager;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private Order_TotalAmountInMonthDTOConverter order_TotalAmountInMonthDTOConverter;

    @Autowired
    private ProductService productService;


    @Autowired
    private CustomerService customerService;

    @Autowired
    private SuppliersService suppliersService;

    @Autowired
    private OrderDetailService orderDetailService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    EntityManager entityManager;

    @Autowired
    CustomerRepository CustomerRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    ShippingAddressesRepository shippingAddressesRepository;

    @Autowired
    PaymentMethodRepository PaymentMethodRepository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    CartDetailRepository CartDetailRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public BigDecimal getTotalAmountInMountAtService() {
        BigDecimal res = orderRepository.getTotalAmount();
        return res;
    }

    @Override
    public Integer TotalCustomerInMonthAtService() {
        Integer totalCustomer = orderRepository.countCustomersForCurrentMonth();
        return totalCustomer;
    }

    @Override
    public List<Order_ListBillDTO> ListBillAtService() {
        List<Order_ListBillDTO> result = orderRepository.listBill();
        return result;
    }

    @Override
    public List<Order_InvoiceDetailDTO> ListInvoiceDetailAtService() {
        List<Order_InvoiceDetailDTO> result = orderRepository.listInvoiceDetail();
        return result;
    }

    @Override
    public List<Order_CountTotalAmountDTO> listCountTotalAmountAtService() {
        List<Order_CountTotalAmountDTO> result = orderRepository.listCountTotalAmount();
        return result;
    }

    @Override
    public BigDecimal getTotalAmountOnline() {
        BigDecimal result = orderRepository.getTotalAmountPayOnline();
        return result;
    }

    @Override
    public BigDecimal getTotalAmountOffline() {
        BigDecimal result = orderRepository.getTotalAmountPayOffline();
        return result;
    }

    @Override
    public List<OrderDTO> getListOrderByCustomerID(int customerID) {
        List<OrdersEntity> orders = orderRepository.findByCustomerID(customerID);
        List<OrderDTO> dto = new ArrayList<>();
        for (OrdersEntity order : orders) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO = modelMapper.map(order, OrderDTO.class);
            dto.add(orderDTO);
        }
        return dto;
    }


    @Override
    public void createOrder(OrderDTO dto,int id) {

        // kiem tra neu khong co san pham trong gio hang thi Exception
        if(dto.getOrderDetails().size() == 0){
            throw new RuntimeException("Create Order Failed");
        }
        // tim kiem customer voi ID de them order
        CustomerEntity c = customerRepository.findById(id).orElse(null);

        // neu customer khong tim thay => Exception
        if(c == null){
            throw new RuntimeException("Create Order Failed");
        }

        // tim kiem phuong thuc thanh toan
        PayMentMethodsEntity pm = paymentMethodRepository.findById(dto.getPaymentMethodID()).orElse(null);
        if(pm == null){
            throw new RuntimeException("You must select payment method");
        }
        ShippingAddressEntity sa = shippingAddressesRepository.findById(dto.getAddressID()).orElse(null);
        if(sa == null){
            throw new RuntimeException("you must select a shipping address");
        }



        OrdersEntity order = new OrdersEntity();

        order.setCustomer(c);
        order.setOrderDate(new Date());
        order.setTotalAmount(dto.getTotalAmount());
        order.setShippingFee(new BigDecimal(35000));
        order.setOrderStatus(OrderStatus_Enum.Confirmed);
        order.setEstimatedDeliveryDate(dto.getEstimatedDeliveryDate());
        order.setActualDeliveryDate(dto.getActualDeliveryDate());
        order.setPayMentMethod(pm);
        order.setShipAddress(sa);
        entityManager.persist(order);
        entityManager.flush();
        for (OrderDetail_createOrderDTO orderdetail : dto.getOrderDetails()) {

            OrderDetailEntity orderDetailEntity = new OrderDetailEntity();
            ProductsEntity products = productRepository.findById(orderdetail.getProductID()).orElse(null);
            if(products == null){
                throw new RuntimeException("You must select a product to order");
            }
            orderDetailEntity.setOrder(order);
            orderDetailEntity.setProduct(products);
            orderDetailEntity.setQuantity(orderdetail.getQuantity());
            orderDetailEntity.setPrice(orderdetail.getPrice());
            entityManager.persist(orderDetailEntity);
            entityManager.flush();
        }
    }


}
