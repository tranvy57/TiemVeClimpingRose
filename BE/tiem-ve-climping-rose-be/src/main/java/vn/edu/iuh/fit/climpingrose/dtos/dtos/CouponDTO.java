package vn.edu.iuh.fit.climpingrose.dtos.dtos;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.climpingrose.dtos.responses.BaseResponse;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Date;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponDTO extends BaseResponse {
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
