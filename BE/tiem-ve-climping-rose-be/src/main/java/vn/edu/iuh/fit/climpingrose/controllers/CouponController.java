package vn.edu.iuh.fit.climpingrose.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.CouponDTO;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.services.CouponService;

import java.util.List;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
public class CouponController {
    private final CouponService couponService;

    @GetMapping
    public ApiResponse<List<CouponDTO>> findAll() {
        return ApiResponse.<List<CouponDTO>>builder()
                .statusCode(200)
                .data(couponService.getAllCouponActive())
                .message("Lấy danh sách coupon thành công")
                .build();
    }

    @PostMapping("/create")
    public ApiResponse<CouponDTO> createCoupon(@RequestBody CouponDTO request) {
        return ApiResponse.<CouponDTO>builder()
                .statusCode(200)
                .data(couponService.createCoupon(request))
                .message("Lấy danh sách coupon thành công")
                .build();
    }
}
