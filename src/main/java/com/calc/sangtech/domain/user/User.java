package com.calc.sangtech.domain.user;

import com.calc.sangtech.domain.Datetime;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString   // 객체가 가지고 있는 정보나 값들을 문자열로 만들어 리턴하는 메서드
@NoArgsConstructor  // 인자 없이 객체 생성 가능
@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Entity
@Table(name = "User")
public class User extends Datetime {
    @Id
    private String id;
    private String pw;
    private String tel;
    private String email;
    private String ntry_dt;
    private String trmn_dt;

    @Builder
    public User(String id, String pw, String tel, String email, String ntry_dt, String trmn_dt) {
        this.id = id;
        this.pw = pw;
        this.tel = tel;
        this.email = email;
        this.ntry_dt = ntry_dt;
        this.trmn_dt = trmn_dt;
    }

    private User toEntity(){
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
