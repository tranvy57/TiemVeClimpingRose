package vn.edu.iuh.fit.climpingrose.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CategoryDTO;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingDTO;
import vn.edu.iuh.fit.climpingrose.entities.Category;
import vn.edu.iuh.fit.climpingrose.entities.Painting;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCatgory(CategoryDTO paintingDTO);
    CategoryDTO toCategoryDTO(Category painting);
    List<CategoryDTO> toCatgoryDTOList(List<Category> paintings);
}
