package vn.edu.iuh.fit.climpingrose.dtos.responses;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingResponse;
import vn.edu.iuh.fit.climpingrose.entities.Order;
import vn.edu.iuh.fit.climpingrose.entities.Painting;

import java.math.BigDecimal;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemResponse {
    String orderItemId;
    BigDecimal currentPrice;
    Integer quantity;
    PaintingResponse painting;

}
