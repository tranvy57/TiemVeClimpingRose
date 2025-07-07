package vn.edu.iuh.fit.climpingrose.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.climpingrose.enums.OrderStatus;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String orderId;

    Date orderDate;
    OrderStatus status;
    BigDecimal deliveryCost;
    BigDecimal totalPaintingsPrice;
    BigDecimal totalPrice;
    String zipCode;
    String prefecture; // tỉnh/thành phố
    String city; //thành phố hoặc quận
    String town; //thị trấn
    String addressDetail;
    String note;
    String imagePayment;
    String paymentMethod;
    String receiverName;
    String phone;
    String email;
    String postalCode;
    String contact;

    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
    private List<OrderItem> orderItems;

    @OneToOne
    @JoinColumn(name = "coupon_id", nullable = true)
    Coupon coupon;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

}
