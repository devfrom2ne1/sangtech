package com.calc.sangtech.web.dto.user;

import com.calc.sangtech.domain.user.Role;
import com.calc.sangtech.domain.user.User;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class UserJoinRequestDto {
    private String userNm;
    private String telNo;
    private String firebaseUid;
    private String email;
    private char alrmYn;
    private Role userType;

    public User toEntity(){
        if(userType == null){
            userType = Role.MEMBER;
        }
        return User.builder()
                .userNm(userNm)
                .telNo(telNo)
                .firebaseUid(firebaseUid)
                .email(email)
                .alrmYn(alrmYn)
                .userType(userType)
                .build();
    }

}
