package vn.edu.iuh.fit.climpingrose.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.climpingrose.dtos.responses.MessageResponse;
import vn.edu.iuh.fit.climpingrose.dtos.TestDto;
import vn.edu.iuh.fit.climpingrose.services.TestService;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestService testService;

    @GetMapping
    public MessageResponse<TestDto> test() {
        return MessageResponse.<TestDto>builder()
                .message("Thông báo Zy cute thành công")
                .data(TestDto.builder()
                        .name("Zy")
                        .description("Cute")
                        .build())
                .build();
    }

    @GetMapping("/error")
    public MessageResponse<TestDto> testError() {
        return MessageResponse.<TestDto>builder()
                .data(testService.getTestDto())
                .build();
    }
}
