package com.calc.sangtech.service.user;

import com.calc.sangtech.domain.user.User;
import com.calc.sangtech.web.dto.user.UserJoinRequestDto;
import com.calc.sangtech.web.dto.user.UserUpdateRequestDto;

public interface UserService {
    public User join(UserJoinRequestDto requestDto);
    public User login(String firebaseUid);
    public User update(UserUpdateRequestDto requestDto);
    public User terminate(Long userId);
}
