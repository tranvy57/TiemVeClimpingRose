package vn.edu.iuh.fit.climpingrose.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import vn.edu.iuh.fit.climpingrose.dtos.requests.UserRegisterRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.UserResponse;
import vn.edu.iuh.fit.climpingrose.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "role", source = "role")
    @Mapping(target = "status", source = "status")
    UserResponse toUserResponse(User user);

    @Mapping(target = "role", source = "role")
    User toUser(UserRegisterRequest user);
}
