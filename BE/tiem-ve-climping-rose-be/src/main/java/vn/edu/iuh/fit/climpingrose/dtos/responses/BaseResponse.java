package vn.edu.iuh.fit.climpingrose.dtos.responses;

import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
public class BaseResponse {
    protected boolean isActive;
    Instant createdAt;
    Instant updatedAt;
}