package vn.edu.iuh.fit.climpingrose.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.climpingrose.enums.MessageRole;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages",
        indexes = {
                @Index(name = "idx_created_at", columnList = "created_at"),
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatMessages {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;

    @Enumerated(EnumType.STRING)
    private MessageRole role;

    @Column(length = 1500)
    private String content;

    private LocalDateTime createdAt;
}
