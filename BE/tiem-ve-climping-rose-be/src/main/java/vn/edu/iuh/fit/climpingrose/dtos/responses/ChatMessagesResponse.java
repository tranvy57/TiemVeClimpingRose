package vn.edu.iuh.fit.climpingrose.dtos.responses;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.climpingrose.enums.MessageRole;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatMessagesResponse {
    private String id;
    private String userId;
    private MessageRole role;
    private String content;
    private LocalDateTime createdAt;
}
