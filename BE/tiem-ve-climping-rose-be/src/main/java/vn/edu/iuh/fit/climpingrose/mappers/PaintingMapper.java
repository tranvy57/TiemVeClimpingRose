package vn.edu.iuh.fit.climpingrose.mappers;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CategoryDTO;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingResponse;
import vn.edu.iuh.fit.climpingrose.dtos.requests.PaintingCreationRequest;
import vn.edu.iuh.fit.climpingrose.entities.Category;
import vn.edu.iuh.fit.climpingrose.entities.CategoryPainting;
import vn.edu.iuh.fit.climpingrose.entities.Painting;

import java.util.Collections;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PaintingMapper {
    Painting toPainting(PaintingResponse paintingResponse);

    @Mapping(target = "categories", expression = "java(toCategoryDTOs(painting.getCategoryPaintings()))")
    PaintingResponse toPaintingResponse(Painting painting);

    default List<CategoryDTO> toCategoryDTOs(List<CategoryPainting> categoryPaintings) {
        if (categoryPaintings == null) return Collections.emptyList();
        return categoryPaintings.stream()
                .map(cp -> {
                    Category c = cp.getCategory();
                    CategoryDTO dto = new CategoryDTO();
                    dto.setCategoryId(c.getCategoryId());
                    dto.setName(c.getName());
                    dto.setDescription(c.getDescription());
                    dto.setImageUrl(c.getImageUrl());

                    return dto;
                }).toList();
    }

    @Mapping(target = "paintingId", ignore = true)
    @Mapping(target = "categoryPaintings", ignore = true)
    Painting toEntity(PaintingCreationRequest request);

}
