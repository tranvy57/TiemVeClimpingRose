package vn.edu.iuh.fit.climpingrose.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import vn.edu.iuh.fit.climpingrose.dtos.responses.ApiResponse;

@ControllerAdvice
public class GlobalException {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorMessageDto> NotFoundException(NotFoundException exc) {
        ApiResponse error = new ApiResponse(HttpStatus.NOT_FOUND.value(), exc.getMessage(), false);
        ErrorMessageDto errorDto = new ErrorMessageDto(error.getStatusCode(), error.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorMessageDto> BadrequestException(BadRequestException exc) {
        ApiResponse error = new ApiResponse(HttpStatus.BAD_REQUEST.value(), exc.getMessage(), false);
        ErrorMessageDto errorDto = new ErrorMessageDto(error.getStatusCode(), error.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadGatewayException.class)
    public ResponseEntity<ErrorMessageDto> BadGatewayException(BadGatewayException exc) {
        ApiResponse error = new ApiResponse(HttpStatus.BAD_GATEWAY.value(), exc.getMessage(), false);
        ErrorMessageDto errorDto = new ErrorMessageDto(error.getStatusCode(), error.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.BAD_GATEWAY);
    }

    @ExceptionHandler(ConflicException.class)
    public ResponseEntity<ErrorMessageDto> ConflicException(ConflicException exc) {
        ApiResponse error = new ApiResponse(HttpStatus.CONFLICT.value(), exc.getMessage(), false);
        ErrorMessageDto errorDto = new ErrorMessageDto(error.getStatusCode(), error.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorMessageDto> UnauthorizedException(UnauthorizedException exc) {
        ApiResponse error = new ApiResponse(HttpStatus.UNAUTHORIZED.value(), exc.getMessage(), false);
        ErrorMessageDto errorDto = new ErrorMessageDto(error.getStatusCode(), error.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InternalServerErrorException.class)
    public ResponseEntity<ErrorMessageDto> InternalServerError(InternalServerErrorException exc) {
        ApiResponse error = new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), exc.getMessage(), false);
        ErrorMessageDto errorDto = new ErrorMessageDto(error.getStatusCode(), error.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorMessageDto> RuntimeErrorException(RuntimeException exc) {
        ApiResponse error = new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), exc.getMessage(), false);
        ErrorMessageDto errorDto = new ErrorMessageDto(error.getStatusCode(), error.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> handleMaxSizeException(MaxUploadSizeExceededException exc) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body(new ApiResponse(413, "Kích thước file vượt quá giới hạn cho phép", false));
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ErrorMessageDto> handlingMethodArgumentNotValidException(MethodArgumentNotValidException exception){

        ErrorMessageDto apiResponse =ErrorMessageDto.builder()
                .message(exception.getFieldError().getDefaultMessage())
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .build();

        return ResponseEntity.badRequest().body(apiResponse);
    }
}
