package com.calc.sangtech.web.dto.user;

import com.calc.sangtech.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSaveRequestDto {
    private String userId;
    private String userNm;
    private String telNo;
    private String firebaseUid;
    private String email;
    private char alrmYn;
    private String joinDt;
    private String userType;


    @Builder
    public UserSaveRequestDto(String userId, String userNm, String telNo, String firebaseUid, String email,
                              char alrmYn, String joinDt, String userType) {
        this.userId = userId;
        this.userNm = userNm;
        this.telNo = telNo;
        this.firebaseUid = firebaseUid;
        this.email = email;
        this.alrmYn = alrmYn;
        this.joinDt = joinDt;
        this.userType = userType;
    }

    public User toEntity(){
        return User.builder()
                .userId(userId)
                .userNm(userNm)
                .telNo(telNo)
                .firebaseUid(firebaseUid)
                .email(email)
                .alrmYn(alrmYn)
                .joinDt(joinDt)
                .userType(userType)
                .build();
    }

}
