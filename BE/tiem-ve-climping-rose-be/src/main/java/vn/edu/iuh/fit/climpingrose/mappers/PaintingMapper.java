package vn.edu.iuh.fit.climpingrose.mappers;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CategoryDTO;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingDTO;
import vn.edu.iuh.fit.climpingrose.entities.Category;
import vn.edu.iuh.fit.climpingrose.entities.CategoryPainting;
import vn.edu.iuh.fit.climpingrose.entities.Painting;

import java.util.Collections;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PaintingMapper {
    Painting toPainting(PaintingDTO paintingDTO);

    @Mapping(target = "categories", expression = "java(toCategoryDTOs(painting.getCategoryPaintings()))")
    PaintingDTO toPaintingDTO(Painting painting);

    default List<CategoryDTO> toCategoryDTOs(List<CategoryPainting> categoryPaintings) {
        if (categoryPaintings == null) return Collections.emptyList();
        return categoryPaintings.stream()
                .map(cp -> {
                    Category c = cp.getCategory();
                    CategoryDTO dto = new CategoryDTO();
                    dto.setCategoryId(c.getCategoryId());
                    dto.setName(c.getName());
                    return dto;
                }).toList();
    }
    List<PaintingDTO> toPaintingDTOList(List<Painting> paintings);
}
