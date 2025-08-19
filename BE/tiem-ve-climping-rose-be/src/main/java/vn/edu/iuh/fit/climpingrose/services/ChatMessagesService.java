package vn.edu.iuh.fit.climpingrose.services;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ChatMessagesResponse;
import vn.edu.iuh.fit.climpingrose.entities.ChatMessages;
import vn.edu.iuh.fit.climpingrose.entities.User;
import vn.edu.iuh.fit.climpingrose.mappers.ChatMessagesMapper;
import vn.edu.iuh.fit.climpingrose.repositories.ChatMessagesRepository;
import vn.edu.iuh.fit.climpingrose.utils.UserUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessagesService {
    private final ChatMessagesRepository chatMessagesRepository;
    private final ChatMessagesMapper chatMessagesMapper;
    private final UserUtils userUtils;

    // Lấy từ DB
    public List<ChatMessagesResponse> getChatMessagesByUserId(int page, int size) {
        User user = userUtils.getUserLogin();

        if (user == null) {
            return List.of();
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<ChatMessages> chatMessagesPage =
                chatMessagesRepository.findChatMessagesByUser_UserId(user.getUserId(), pageable);

        // Trả về list DTO
        return chatMessagesPage
                .stream()
                .map(chatMessagesMapper::toResponse)
                .toList();
    }


//    // Lấy từ Redis
//    public ChatMessage getFromCache(Long id) {
//        String key = CHAT_CACHE_PREFIX + id;
//        return redisTemplate.opsForValue().get(key);
//    }
//
//    // Cache vào Redis (thêm cho đủ vòng đời)
//    public void cacheMessage(ChatMessage message) {
//        String key = CHAT_CACHE_PREFIX + message.getId();
//        redisTemplate.opsForValue().set(key, message);
//    }
}
