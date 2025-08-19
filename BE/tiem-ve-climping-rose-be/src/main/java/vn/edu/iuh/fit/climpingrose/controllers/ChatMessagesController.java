package vn.edu.iuh.fit.climpingrose.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ChatMessagesResponse;
import vn.edu.iuh.fit.climpingrose.services.ChatMessagesService;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatMessagesController {
    private final ChatMessagesService chatMessagesService;

    @GetMapping("/my-chat-messages")
    public ApiResponse<List<ChatMessagesResponse>> getMyChatMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return ApiResponse.<List<ChatMessagesResponse>>builder()
                .message("Lịch sử chat.")
                .data(chatMessagesService.getChatMessagesByUserId(page, size))
                .build();
    }
}
