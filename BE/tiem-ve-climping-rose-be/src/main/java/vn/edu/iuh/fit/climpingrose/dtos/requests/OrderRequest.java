package vn.edu.iuh.fit.climpingrose.dtos.requests;

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
public class OrderRequest {
    String orderId;
    Date orderDate;
    BigDecimal deliveryCost;
    BigDecimal totalPaintingsPrice;
    String shippingAddress;
    String note;
    String paymentMethod;
    String receiverName;
    String phone;
    String email;
    String postalCode;
    String contact;
    List<String> cartItemIds;
    String couponCode;
}
