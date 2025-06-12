package vn.edu.iuh.fit.climpingrose.dtos.dtos;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PaintingDTO {
    String id;
    String name;
    String description;
    String imageUrl;
    String size;
    BigDecimal price;
    List<CategoryDTO> categories;
}
