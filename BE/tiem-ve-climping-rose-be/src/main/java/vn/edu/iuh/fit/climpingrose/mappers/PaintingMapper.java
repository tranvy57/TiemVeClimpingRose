package vn.edu.iuh.fit.climpingrose.mappers;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.PaintingDTO;
import vn.edu.iuh.fit.climpingrose.entities.Painting;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PaintingMapper {
    Painting toPainting(PaintingDTO paintingDTO);

    @Mapping(source = "categories",target = "categories")
    @Mapping(source = "size",target = "size")
    PaintingDTO toPaintingDTO(Painting painting);
    List<PaintingDTO> toPaintingDTOList(List<Painting> paintings);
}
