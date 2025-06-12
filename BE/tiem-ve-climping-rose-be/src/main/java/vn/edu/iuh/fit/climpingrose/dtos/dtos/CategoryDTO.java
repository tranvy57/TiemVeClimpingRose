package vn.edu.iuh.fit.climpingrose.dtos.dtos;

import lombok.Data;
import vn.edu.iuh.fit.climpingrose.dtos.responses.BaseResponse;

@Data
public class CategoryDTO extends BaseResponse {
    String categoryId;
    String name;
    String description;
    String imageUrl;
}