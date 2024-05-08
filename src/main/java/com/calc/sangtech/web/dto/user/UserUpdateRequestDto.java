package com.calc.sangtech.web.dto.user;

import com.calc.sangtech.domain.user.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class UserUpdateRequestDto {
    private Long userId;
    private String userNm;
    private String telNo;
    private String firebaseUid;
    private String email;
    private char alrmYn;
    private Role userType;
}
