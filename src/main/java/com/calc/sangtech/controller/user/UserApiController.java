package com.calc.sangtech.controller.user;

import com.calc.sangtech.controller.user.dto.UserSaveRequestDto;
import com.calc.sangtech.domain.user.User;
import com.calc.sangtech.service.user.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@Tag(name = "회원 API", description = "회원 API입니다.")
@RequiredArgsConstructor
@RestController
public class UserApiController {
    private final UserService userService;

    @PostMapping("/api/v1/signin")
    public String save(@RequestBody UserSaveRequestDto requestDto){
        return userService.save(requestDto);
    }

}
