package vn.edu.iuh.fit.climpingrose.controllers;

import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.climpingrose.dtos.responses.MessageResponse;
import vn.edu.iuh.fit.climpingrose.dtos.requests.AuthenticationRequest;
import vn.edu.iuh.fit.climpingrose.dtos.requests.IntrospectRequest;
import vn.edu.iuh.fit.climpingrose.dtos.requests.LogoutRequest;
import vn.edu.iuh.fit.climpingrose.dtos.requests.RefreshRequest;
import vn.edu.iuh.fit.climpingrose.dtos.responses.AuthenticationResponse;
import vn.edu.iuh.fit.climpingrose.dtos.responses.IntrospectResponse;
import vn.edu.iuh.fit.climpingrose.services.AuthenticationService;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    MessageResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);
        return MessageResponse.<AuthenticationResponse>builder()
                .message("Đăng nhập thành công")
                .data(result)
                .build();
    }

    @PostMapping("/introspect")
    MessageResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return MessageResponse.<IntrospectResponse>builder()
                .message("Kiểm tra token thành công")
                .data(result)
                .build();
    }

    @PostMapping("/logout")
    MessageResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return MessageResponse.<Void>builder()
                .message("Đăng xuất thành công")
                .data(null)
                .build();
    }

    @PostMapping("/refresh")
    ResponseEntity<MessageResponse<AuthenticationResponse>> refresh(@RequestBody @Valid RefreshRequest request) throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ResponseEntity.ok(MessageResponse.<AuthenticationResponse>builder()
                .message("Làm mới token thành công")
                .data(result)
                .build());
    }


}
