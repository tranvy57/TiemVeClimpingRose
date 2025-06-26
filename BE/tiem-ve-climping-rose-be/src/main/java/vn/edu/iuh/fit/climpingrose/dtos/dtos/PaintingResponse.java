package vn.edu.iuh.fit.climpingrose.dtos.dtos;

import lombok.Data;
import vn.edu.iuh.fit.climpingrose.dtos.responses.BaseResponse;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PaintingResponse extends BaseResponse {
    String paintingId;
    String name;
    String description;
    String imageUrl;
    String size;
    BigDecimal price;
    Integer quantity;
    List<CategoryDTO> categories;
}
