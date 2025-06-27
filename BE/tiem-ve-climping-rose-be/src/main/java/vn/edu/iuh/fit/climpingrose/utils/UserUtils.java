package vn.edu.iuh.fit.climpingrose.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import vn.edu.iuh.fit.climpingrose.entities.User;
import vn.edu.iuh.fit.climpingrose.exceptions.NotFoundException;
import vn.edu.iuh.fit.climpingrose.repositories.UserRepository;

@Component
@RequiredArgsConstructor
public class UserUtils {
    private final UserRepository userRepository;

    public User getUserLogin() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy người dùng này"));

        return user;
    }
}
