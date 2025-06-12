package vn.edu.iuh.fit.climpingrose.dtos.dtos;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import vn.edu.iuh.fit.climpingrose.dtos.responses.BaseResponse;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PaintingDTO extends BaseResponse {
    String paintingId;
    String name;
    String description;
    String imageUrl;
    String size;
    BigDecimal price;
    List<CategoryDTO> categories;
}
