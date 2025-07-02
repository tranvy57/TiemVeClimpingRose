package vn.edu.iuh.fit.climpingrose.mappers;

import org.mapstruct.Mapper;
import vn.edu.iuh.fit.climpingrose.dtos.responses.OrderItemResponse;
import vn.edu.iuh.fit.climpingrose.entities.OrderItem;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
    public List<OrderItemResponse> toReponseList(List<OrderItem> orderItems);
}
