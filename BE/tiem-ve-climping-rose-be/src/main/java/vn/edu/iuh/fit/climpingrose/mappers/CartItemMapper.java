package vn.edu.iuh.fit.climpingrose.mappers;

import org.mapstruct.Mapper;
import vn.edu.iuh.fit.climpingrose.dtos.requests.CartItemRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.CartItemResponse;
import vn.edu.iuh.fit.climpingrose.entities.CartItem;

@Mapper(componentModel = "spring")
public interface CartItemMapper {
    public CartItemResponse toCartItemResponse(CartItem cartItem);
    public CartItem toCartItem(CartItemRequest cartItemRequest);
}
