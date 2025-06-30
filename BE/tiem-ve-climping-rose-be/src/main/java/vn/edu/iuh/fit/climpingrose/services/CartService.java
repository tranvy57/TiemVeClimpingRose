package vn.edu.iuh.fit.climpingrose.services;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.requests.CartItemRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.CartItemResponse;
import vn.edu.iuh.fit.climpingrose.entities.CartItem;
import vn.edu.iuh.fit.climpingrose.entities.Painting;
import vn.edu.iuh.fit.climpingrose.entities.User;
import vn.edu.iuh.fit.climpingrose.exceptions.NotFoundException;
import vn.edu.iuh.fit.climpingrose.mappers.CartItemMapper;
import vn.edu.iuh.fit.climpingrose.repositories.CartItemRepository;
import vn.edu.iuh.fit.climpingrose.repositories.PaintingRepository;
import vn.edu.iuh.fit.climpingrose.utils.UserUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final PaintingRepository paintingRepository;
    private final UserUtils userUtils;
    private final CartItemMapper cartItemMapper;

    public List<CartItemResponse> getMyCart() {
        User user = userUtils.getUserLogin();
        List<CartItem> cartItems = cartItemRepository.findCartItemsByUser(user);
        return cartItems.stream()
                .map(cartItemMapper::toCartItemResponse)
                .toList();
    }

    public CartItemResponse addCartItem(CartItemRequest item) {
        User user = userUtils.getUserLogin();
        Painting painting = paintingRepository.findById(item.getPaintingId())
                .orElseThrow(() -> new NotFoundException("Painting not found"));

        CartItem cartItem = cartItemRepository.findByUserAndPainting(user, painting);
        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + item.getQuantity());
        }
        else {
            cartItem = cartItemMapper.toCartItem(item);
            cartItem.setPainting(painting);
            cartItem.setUser(user);
        }
        CartItem cartItemSaved = cartItemRepository.save(cartItem);
        return cartItemMapper.toCartItemResponse(cartItemSaved);
    }

    public void deleteCartItem(String cartItemId) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new NotFoundException("Cart item not found"));
        cartItemRepository.delete(cartItem);
    }

}
