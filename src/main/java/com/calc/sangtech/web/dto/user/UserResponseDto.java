package com.calc.sangtech.web.dto.user;

import com.calc.sangtech.domain.code.Role;
import com.calc.sangtech.domain.user.User;
import lombok.Getter;


@Getter
public class UserResponseDto {
    private Long userId;
    private String userNm;
    private String telNo;
    private String email;
    private char alrmYn;
    private Role userType;

    public UserResponseDto(User entity){
        this.userId = entity.getUserId();
        this.userNm = entity.getUserNm();
        this.telNo = entity.getTelNo();
        this.email = entity.getEmail();
        this.alrmYn = entity.getAlrmYn();
        this.userType = entity.getUserType();
    }
}
