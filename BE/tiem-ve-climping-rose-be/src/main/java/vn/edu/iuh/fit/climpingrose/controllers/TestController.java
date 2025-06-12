package vn.edu.iuh.fit.climpingrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.dtos.dtos.TestDto;
import vn.edu.iuh.fit.climpingrose.services.TestService;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestService testService;

    @GetMapping
    public ApiResponse<TestDto> test() {
        return ApiResponse.<TestDto>builder()
                .message("Thông báo Zy cute thành công")
                .data(TestDto.builder()
                        .name("Zy")
                        .description("Cute")
                        .build())
                .build();
    }

    @GetMapping("/error")
    public ApiResponse<TestDto> testError() {
        return ApiResponse.<TestDto>builder()
                .data(testService.getTestDto())
                .build();
    }
}
