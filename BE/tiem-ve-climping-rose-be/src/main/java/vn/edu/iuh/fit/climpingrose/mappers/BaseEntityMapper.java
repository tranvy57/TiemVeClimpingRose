package vn.edu.iuh.fit.climpingrose.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import vn.edu.iuh.fit.climpingrose.entities.BaseEntity;

@Mapper(componentModel = "spring")
public interface BaseEntityMapper {
    @Mapping(target = "active", source = "active")
    @Mapping(target = "createdAt", source = "createdAt")
    @Mapping(target = "updatedAt", source = "updatedAt")
    void updateBaseEntity(@MappingTarget BaseEntity target, BaseEntity source);
}
