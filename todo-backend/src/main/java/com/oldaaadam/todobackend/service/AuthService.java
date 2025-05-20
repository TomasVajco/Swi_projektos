package com.oldaaadam.todobackend.service;

import com.oldaaadam.todobackend.dto.JwtAuthResponse;
import com.oldaaadam.todobackend.dto.LoginDto;
import com.oldaaadam.todobackend.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    JwtAuthResponse login(LoginDto loginDto);
}
