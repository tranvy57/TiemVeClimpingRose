package vn.edu.iuh.fit.climpingrose.dtos.requests;

import lombok.Data;
import vn.edu.iuh.fit.climpingrose.enums.PaintingSize;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PaintingUpdateRequest {
    String name;
    String description;
    String imageUrl;
    PaintingSize size;
    BigDecimal price;
    Integer quantity;
    List<String> categoryIds;
    Boolean active;
}
