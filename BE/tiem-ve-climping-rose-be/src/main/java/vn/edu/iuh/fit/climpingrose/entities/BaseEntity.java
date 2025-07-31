package vn.edu.iuh.fit.climpingrose.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners({AuditingEntityListener.class})
@Getter
@Setter
public class BaseEntity {
    protected boolean isActive = true;

    @Column(updatable = false)
    Instant createdAt;

    Instant  updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();;
    }
}
