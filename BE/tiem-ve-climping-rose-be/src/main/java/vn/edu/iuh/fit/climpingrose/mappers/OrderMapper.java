package vn.edu.iuh.fit.climpingrose.mappers;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import vn.edu.iuh.fit.climpingrose.dtos.responses.OrderResponse;
import vn.edu.iuh.fit.climpingrose.entities.Order;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    public OrderResponse toResponse(Order o);
}
