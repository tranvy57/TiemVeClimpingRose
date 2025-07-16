package vn.edu.iuh.fit.climpingrose.dtos.responses;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.climpingrose.entities.Coupon;
import vn.edu.iuh.fit.climpingrose.entities.OrderItem;
import vn.edu.iuh.fit.climpingrose.entities.User;
import vn.edu.iuh.fit.climpingrose.enums.OrderStatus;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderResponse {
    String orderId;
    Date orderDate;
    OrderStatus status;
    BigDecimal deliveryCost;
    BigDecimal totalPrice;
    String shippingAddress;
    String note;
    String imagePayment;
    String paymentMethod;
    String receiverName;
    String address;
    String phone;
    String email;
    String postalCode;
    String contact;
    private List<OrderItemResponse> orderItems;
    BigDecimal discount;
    String prefecture; // tỉnh/thành phố
    String city; //thành phố hoặc quận
    String town; //thị trấn
    String addressDetail;
}
