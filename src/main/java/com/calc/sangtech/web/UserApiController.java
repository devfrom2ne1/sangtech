package com.calc.sangtech.web;

import com.calc.sangtech.base.dto.DataResponseDto;
import com.calc.sangtech.service.user.UserService;
import com.calc.sangtech.web.dto.user.UserJoinRequestDto;
import com.calc.sangtech.web.dto.user.UserUpdateRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Tag(name = "회원 API", description = "회원 API입니다.")
@RequiredArgsConstructor
@RestController
@Slf4j
public class UserApiController {
    private final UserService userService;

    @PostMapping("/api/v1/user")
    @Operation(summary = "회원가입", description = "firebase를 통해 회원가입을 진행합니다.")
    public DataResponseDto<Object> join(@RequestBody UserJoinRequestDto requestDto){
        try {
            log.debug("POST:/api/v1/user");
            return DataResponseDto.of(userService.join(requestDto));
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }

    @GetMapping("/api/v1/user")
    @Operation(summary = "로그인/회원정보조회", description = "firebase를 통해 ID 및 회원정보를 제공합니다.")
    public DataResponseDto<Object> login(@RequestParam String firebaseUid){
        try {
            log.debug("GET:/api/v1/user");
            return DataResponseDto.of(userService.login(firebaseUid));
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }
    @PatchMapping("/api/v1/user")
    @Operation(summary = "회원정보 수정", description = "회원정보를 수정할 때 사용합니다.")
    public DataResponseDto<Object> update(@RequestBody UserUpdateRequestDto requestDto){
        try {
            log.debug("PUT:/api/v1/user");
            return DataResponseDto.of( userService.update(requestDto));
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }
    @DeleteMapping("/api/v1/user")
    @Operation(summary = "회원탈퇴", description = "회원탈퇴 시 사용합니다.")
    public DataResponseDto<Object> withdraw(@RequestParam Long userId){
        try {
            log.debug("DELETE:/api/v1/user");
            return DataResponseDto.of( userService.terminate(userId));
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }
}
