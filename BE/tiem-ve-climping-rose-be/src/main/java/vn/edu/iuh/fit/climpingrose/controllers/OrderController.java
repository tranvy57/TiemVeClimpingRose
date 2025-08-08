package vn.edu.iuh.fit.climpingrose.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.climpingrose.dtos.requests.OrderRequest;
import vn.edu.iuh.fit.climpingrose.dtos.requests.OrderUpdateRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.dtos.responses.OrderResponse;
import vn.edu.iuh.fit.climpingrose.dtos.responses.PageResponse;
import vn.edu.iuh.fit.climpingrose.enums.OrderStatus;
import vn.edu.iuh.fit.climpingrose.services.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ApiResponse<PageResponse<OrderResponse>> getAllOrders(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(required = false) String sort

    ) {
        PageResponse<OrderResponse> result = orderService.getAllOrders(page, size, sort) ;
        return ApiResponse.<PageResponse<OrderResponse>>builder()
                .message("Lấy danh sách tranh thành công")
                .data(result)
                .build();
    }

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

    @GetMapping("/{orderId}")
    public ApiResponse<OrderResponse> getOrder(@PathVariable String orderId) {
        return ApiResponse.<OrderResponse>builder()
                .message("Tạo đơn hàng thành công")
                .data(orderService.getOrderById(orderId))
                .build();
    }

    @PutMapping("/{orderId}")
    public ApiResponse<OrderResponse> updateOrder(@PathVariable String orderId, @RequestBody OrderUpdateRequest request) {
        return ApiResponse.<OrderResponse>builder()
                .message("Tạo đơn hàng thành công")
                .data(orderService.updateOrder(orderId, request))
                .build();
    }

    @PutMapping("/cancel/{orderId}")
    public ApiResponse<OrderResponse> cancelOrder(@PathVariable String orderId) {
        return ApiResponse.<OrderResponse>builder()
                .message("Hủy đơn hàng thành công")
                .data(orderService.cancelOrder(orderId))
                .build();
    }

    @PutMapping("/admin/update-status")
    public ApiResponse<OrderResponse> updateStatus(@RequestParam String orderId, @RequestParam("status") OrderStatus status) {
        return ApiResponse.<OrderResponse>builder()
                .message("Câp nhật trạng thái đơn hàng thành công")
                .data(orderService.approveOrder(orderId, status))
                .build();
    }




}
