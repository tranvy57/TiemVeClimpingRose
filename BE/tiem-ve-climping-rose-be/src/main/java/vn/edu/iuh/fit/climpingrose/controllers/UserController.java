package vn.edu.iuh.fit.climpingrose.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.climpingrose.dtos.requests.UserRegisterRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.dtos.responses.UserResponse;
import vn.edu.iuh.fit.climpingrose.services.UserService;

import java.util.List;

@RestController()
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping
    public ApiResponse<List<UserResponse>> getAllUsers() {
        return ApiResponse.<List<UserResponse>>builder()
                .message("Lấy danh sách người dùng thành công")
                .data(userService.getUsers())
                .build();
    }

    @PostMapping
    public ApiResponse<UserResponse> registerUser(@RequestBody @Valid UserRegisterRequest request) {
        return ApiResponse.<UserResponse>builder()
                .message("Đăng ký người dùng thành công")
                .data(userService.registerUser(request))
                .build();
    }

    @GetMapping("/myInfo")
    public ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .message("Lấy thông tin cá nhân thành công")
                .data(userService.getMyInfo())
                .build();
    }

}
