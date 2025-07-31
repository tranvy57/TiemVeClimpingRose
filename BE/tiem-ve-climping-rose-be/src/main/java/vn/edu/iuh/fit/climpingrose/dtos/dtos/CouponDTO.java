package vn.edu.iuh.fit.climpingrose.dtos.dtos;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Date;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponDTO {
    String couponId;
    String code;
    String imageUrl;

    String description;
    String condition;
    BigDecimal discountPercentage;

    Instant startDate;
    Instant endDate;

    Boolean isPublic;

}
