package com.calc.sangtech.domain.user;

import com.calc.sangtech.domain.Datetime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@ToString
@NoArgsConstructor  //파라미터가 없는 기본 생성자 생성
@Data
@EqualsAndHashCode(callSuper = true) // 두 객체가 논리적으로 같은지 비교하게 해줌
@SuperBuilder
@Entity
@Table(name = "USER_BASE")
public class User extends Datetime {
    @Id
    @Column(name = "USER_ID", length = 100)
    private String userId;

    @Column(name = "USER_NM", nullable = false, length = 255)
    private String userNm;

    @Column(name = "TEL_NO", length = 13)
    private String telNo;

    @Column(name = "FIREBASE_UID", length = 255)
    private String firebaseUid;

    @Column(name = "EMAIL", length = 255)
    private String email;

    @Column(name = "ALRM_YN", columnDefinition = "CHAR(1) DEFAULT 'N'")
    private char alrmYn;

    @Column(name = "JOIN_DT", length = 8)
    private String joinDt;

    @Column(name = "TRMN_DT", length = 8)
    private String trmnDt;

    @Column(name = "USER_TYPE", length = 3)
    private String userType;

}
