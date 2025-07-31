package vn.edu.iuh.fit.climpingrose.repositories;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.iuh.fit.climpingrose.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
  Optional<User> findByUsername(String username);
  Boolean existsByUsername(String username);

  Optional<User> findByEmail(String email);

  boolean existsByEmail(@NotBlank(message = "Email không được để trống") @Email(message = "Email không hợp lệ") String email);
}