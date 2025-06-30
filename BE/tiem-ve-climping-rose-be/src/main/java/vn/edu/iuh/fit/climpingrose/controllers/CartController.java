package vn.edu.iuh.fit.climpingrose.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.climpingrose.dtos.requests.CartItemRequest;
import vn.edu.iuh.fit.climpingrose.dtos.requests.CartItemUpdateRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.CartItemResponse;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.services.CartService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cart")
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ApiResponse<List<CartItemResponse>> getMyCartItems() {
        return ApiResponse.<List<CartItemResponse>>builder()
                .data(cartService.getMyCart())
                .message("lấy giỏ hàng thành công")
                .statusCode(200)
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<CartItemResponse> createCartItem(@RequestBody CartItemRequest cartItemResponse) {
        return ApiResponse.<CartItemResponse>builder()
                .data(cartService.addCartItem(cartItemResponse))
                .message("Thêm vào giỏ hàng thành công")
                .statusCode(200)
                .build();
    }

    @DeleteMapping("/delete/{cartItemId}")
    public ApiResponse<Void> deleteCartItem(@PathVariable String cartItemId) {
        cartService.deleteCartItem(cartItemId);
        return ApiResponse.<Void>builder()
                .message("Xoá sản phẩm khỏi giỏ hàng thành công")
                .statusCode(200)
                .build();
    }

    @PutMapping("/update")
    public ApiResponse<CartItemResponse> updateCartItem(@RequestBody CartItemUpdateRequest request) {
        return ApiResponse.<CartItemResponse>builder()
                .data(cartService.updateCartItemQuantity(request))
                .message("Cập nhật sản phẩm trong giỏ hàng thành công")
                .statusCode(200)
                .build();
    }






}
