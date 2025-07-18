package vn.edu.iuh.fit.climpingrose.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.climpingrose.dtos.requests.UserRegisterRequest;
import vn.edu.iuh.fit.climpingrose.dtos.requests.UserUpdateRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.dtos.responses.UserResponse;
import vn.edu.iuh.fit.climpingrose.entities.User;
import vn.edu.iuh.fit.climpingrose.exceptions.NotFoundException;
import vn.edu.iuh.fit.climpingrose.repositories.UserRepository;
import vn.edu.iuh.fit.climpingrose.services.UserService;

import java.util.List;

@RestController()
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;


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

    @GetMapping("/my-info")
    public ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .message("Lấy thông tin cá nhân thành công")
                .data(userService.getMyInfo())
                .build();
    }

    @PutMapping("/me")
    public ApiResponse<UserResponse> updateMe(
            @RequestBody UserUpdateRequest request) {

        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy người dùng này"));

        UserResponse updatedUser = userService.updateUser(user.getUserId(), request);
        return ApiResponse.<UserResponse>builder()
                .statusCode(200)
                .message("Cập nhật thông tin người dùng thành công.")
                .data(updatedUser)
                .build();
    }

}
