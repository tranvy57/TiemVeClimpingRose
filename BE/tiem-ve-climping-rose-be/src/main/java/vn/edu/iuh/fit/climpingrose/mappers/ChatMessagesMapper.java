package vn.edu.iuh.fit.climpingrose.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ChatMessagesResponse;
import vn.edu.iuh.fit.climpingrose.entities.ChatMessages;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChatMessagesMapper {

    @Mapping(source = "user.userId", target = "userId")
    ChatMessagesResponse toResponse(ChatMessages cm);

    List<ChatMessagesResponse> toListChatMessagesResponse(List<ChatMessages> cms);
}
