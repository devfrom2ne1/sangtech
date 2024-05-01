package com.calc.sangtech.service.user;

import com.calc.sangtech.domain.user.UserRepository;
import com.calc.sangtech.web.dto.user.UserSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public String save(UserSaveRequestDto requestDto){
        return userRepository.save(requestDto.toEntity()).getUserId();
    }
}
