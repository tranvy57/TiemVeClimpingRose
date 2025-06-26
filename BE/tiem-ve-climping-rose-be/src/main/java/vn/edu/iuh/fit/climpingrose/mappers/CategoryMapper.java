package vn.edu.iuh.fit.climpingrose.mappers;

import org.mapstruct.Mapper;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CategoryDTO;
import vn.edu.iuh.fit.climpingrose.entities.Category;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toCatgory(CategoryDTO paintingDTO);
    CategoryDTO toCategoryDTO(Category painting);

}
