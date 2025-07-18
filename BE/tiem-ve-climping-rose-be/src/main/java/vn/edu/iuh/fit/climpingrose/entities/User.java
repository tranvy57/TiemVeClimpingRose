package vn.edu.iuh.fit.climpingrose.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.Length;
import vn.edu.iuh.fit.climpingrose.enums.Role;
import vn.edu.iuh.fit.climpingrose.enums.UserStatus;

import java.time.LocalDate;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@Table(name = "users")
public class User extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String userId;

    String email;
    String phone;
    String username;
    String password;
    String displayName;

    @Length(max = 500)
    String avatar;
    LocalDate dob;

    @Enumerated(EnumType.STRING)
    UserStatus status;

    @Enumerated(EnumType.STRING)
    Role role;

    String zipcode;
    String addressDetail;
    String contact;

}

