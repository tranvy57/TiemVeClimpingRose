package vn.edu.iuh.fit.climpingrose.dtos.requests;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.climpingrose.enums.OrderStatus;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderUpdateRequest {
    BigDecimal deliveryCost;
    BigDecimal totalPaintingsPrice;
    OrderStatus status;
    String note;
    String paymentMethod;
    String receiverName;
    String phone;
    String email;
    String postalCode;
    String contact;
    String zipCode;
    String prefecture; // tỉnh/thành phố
    String city; //thành phố hoặc quận
    String town; //thị trấn
    String addressDetail;
}
