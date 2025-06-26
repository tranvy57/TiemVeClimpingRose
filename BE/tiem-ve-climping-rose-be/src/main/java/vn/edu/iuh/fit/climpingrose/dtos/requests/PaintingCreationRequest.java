package vn.edu.iuh.fit.climpingrose.dtos.requests;

import lombok.Data;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CategoryDTO;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PaintingCreationRequest {
    String name;
    String description;
    String imageUrl;
    String size;
    BigDecimal price;
    Integer quantity;
    List<String> categoryIds;
}
