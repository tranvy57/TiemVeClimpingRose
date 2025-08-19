package vn.edu.iuh.fit.climpingrose.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.ChatMessages;

public interface ChatMessagesRepository extends JpaRepository<ChatMessages, String> {
    Page<ChatMessages> findChatMessagesByUser_UserId(String userUserId, Pageable pageable);
}
