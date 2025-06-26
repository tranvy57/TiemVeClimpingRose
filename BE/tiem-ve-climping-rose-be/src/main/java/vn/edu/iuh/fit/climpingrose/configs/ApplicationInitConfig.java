package vn.edu.iuh.fit.climpingrose.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import vn.edu.iuh.fit.climpingrose.entities.User;
import vn.edu.iuh.fit.climpingrose.enums.Role;
import vn.edu.iuh.fit.climpingrose.repositories.UserRepository;

@Configuration
public class ApplicationInitConfig {

    @Autowired
    PasswordEncoder passwordEncoder;

//    @Bean
//    ApplicationRunner applicationRunner(UserRepository userRepository) { // Được khởi chạy mỗi khi application start
//        return args -> {
//            // tạo một user admin
//            if (userRepository.findByUsername("admin").isEmpty()) {
//
//                User user = User.builder()
//                        .username("admin")
//                        .password(passwordEncoder.encode("admin"))
//                        .role(Role.ADMIN)
//                        .build();
//
//                userRepository.save(user);
//            }
//        };
//    }
}