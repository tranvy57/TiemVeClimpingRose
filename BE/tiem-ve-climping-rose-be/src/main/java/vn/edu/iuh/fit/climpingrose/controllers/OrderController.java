package vn.edu.iuh.fit.climpingrose.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.climpingrose.dtos.requests.OrderRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.dtos.responses.OrderResponse;
import vn.edu.iuh.fit.climpingrose.services.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/create")
    public ApiResponse<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        return ApiResponse.<OrderResponse>builder()
                .message("Tạo đơn hàng thành công")
                .data(orderService.createOrder(orderRequest))
                .build();
    }

    @GetMapping("/my-orders")
    public ApiResponse<List<OrderResponse>> getMyOrders() {
        return ApiResponse.<List<OrderResponse>>builder()
                .message("Danh sách đơn hàng của tôi.")
                .data(orderService.getMyOrders())
                .build();
    }




}
