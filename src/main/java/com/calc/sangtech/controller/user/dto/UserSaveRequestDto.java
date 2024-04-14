package com.calc.sangtech.controller.user.dto;

import com.calc.sangtech.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSaveRequestDto {

    private String id;
    private String pw;
    private String tel;
    private String email;
    private String ntry_dt;
    private String trmn_dt;

    @Builder
    public UserSaveRequestDto(String id, String pw, String tel, String email, String ntry_dt, String trmn_dt) {
        this.id = id;
        this.pw = pw;
        this.tel = tel;
        this.email = email;
        this.ntry_dt = ntry_dt;
        this.trmn_dt = trmn_dt;
    }

    public User toEntity(){
        User user = User.builder()
                .id(this.id)
                .pw(this.pw)
                .tel(this.tel)
                .email(this.email)
                .ntry_dt(this.ntry_dt)
                .trmn_dt(this.trmn_dt)
                .build();
        return user;
    }


}
