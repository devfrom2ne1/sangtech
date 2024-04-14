package com.calc.sangtech.service.user;

import com.calc.sangtech.controller.user.dto.UserSaveRequestDto;
import com.calc.sangtech.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public String save(UserSaveRequestDto requestDto){
        return userRepository.save(requestDto.toEntity()).getId();
    }
}
