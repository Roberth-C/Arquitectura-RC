package com.biblioteca.user_service.soap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import com.biblioteca.user_service.entity.User;
import com.biblioteca.user_service.service.UserService;

@Endpoint
public class UserEndpoint {

    @Autowired
    private UserService userService;

    @PayloadRoot(namespace = "http://example.com/users", localPart = "UserRequest")
    @ResponsePayload
    public UserResponse handleUserRequest(@RequestPayload UserRequest request) {
        User user = User.builder()
                .idInstitucional(request.getIdInstitucional())
                .username(request.getUsername())
                .password(request.getPassword())
                .role(request.getRole())
                .status(request.isStatus())
                .build();

        userService.createUser(user);

        UserResponse response = new UserResponse();
        response.setMessage("Usuario registrado exitosamente");
        return response;
    }
}
