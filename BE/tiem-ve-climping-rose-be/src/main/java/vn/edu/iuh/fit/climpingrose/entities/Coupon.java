package vn.edu.iuh.fit.climpingrose.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "coupons")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coupon extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String couponId;
    String code;
    String imageUrl;

    String description;
    String condition;
    @Column(name = "discount_percentage")
    BigDecimal discountPercentage;
    Boolean isPublic;
    Date startDate;
    Date endDate;

}
