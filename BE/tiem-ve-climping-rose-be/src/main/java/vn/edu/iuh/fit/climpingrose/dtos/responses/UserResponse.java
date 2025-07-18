package vn.edu.iuh.fit.climpingrose.dtos.responses;

import lombok.*;
import lombok.experimental.FieldDefaults;
import vn.edu.iuh.fit.climpingrose.enums.Role;
import vn.edu.iuh.fit.climpingrose.enums.UserStatus;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserResponse extends BaseResponse{
    String userId;
    String email;
    String phone;
    String username;
    String displayName;
    String avatar;
    LocalDate dob;
    UserStatus status;
    String zipcode;
    String addressDetail;
    String contact;

    Role role;
}