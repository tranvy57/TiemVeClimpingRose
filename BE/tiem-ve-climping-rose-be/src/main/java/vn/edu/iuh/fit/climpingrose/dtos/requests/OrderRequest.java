package vn.edu.iuh.fit.climpingrose.dtos.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    Date orderDate;
    BigDecimal deliveryCost;
    BigDecimal totalPaintingsPrice;
    String note;
    String paymentMethod;
    String receiverName;
    String phone;
    String email;
    String postalCode;
    String contact;
    List<String> cartItemIds;
    String couponCode;
    String zipCode;
    String prefecture; // tỉnh/thành phố
    String city; //thành phố hoặc quận
    String town; //thị trấn
    String addressDetail;
}
