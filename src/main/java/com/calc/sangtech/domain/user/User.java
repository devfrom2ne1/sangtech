package com.calc.sangtech.domain.user;

import com.calc.sangtech.domain.BaseTimeEntity;
import com.calc.sangtech.web.dto.user.UserUpdateRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@Entity
@ToString
@Table(name = "USER_BASE")
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long userId;

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

    @Column(name = "ACT_YN", columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private char actYn;

    @Column(name = "JOIN_DT", length = 8)
    private String joinDt;

    @Column(name = "TRMN_DT", length = 8)
    private String trmnDt;

    @Enumerated(EnumType.STRING)
    @Column(name = "USER_TYPE", length = 3)
    private Role userType;
    @Builder
    public User(String userNm, String telNo, String firebaseUid, String email,
                              char alrmYn,char actYn, String joinDt, Role userType) {
        this.userNm = userNm;
        this.telNo = telNo;
        this.firebaseUid = firebaseUid;
        this.email = email;
        this.alrmYn = alrmYn;
        this.actYn = actYn;
        this.joinDt = joinDt;
        this.userType = userType;
    }

    public void terminate(String trmnDt){
        this.trmnDt = trmnDt;
        this.alrmYn = 'N';
        this.actYn = 'N';
        this.userType = Role.TERMINATE;
    }
    public void update(UserUpdateRequestDto userUpdateRequestDto){
        if(!userUpdateRequestDto.getUserNm().isEmpty()){
            this.userNm = userUpdateRequestDto.getUserNm();
        }
        if(!userUpdateRequestDto.getTelNo().isEmpty())
            this.telNo = userUpdateRequestDto.getTelNo();

        if(!userUpdateRequestDto.getFirebaseUid().isEmpty())
            this.firebaseUid = userUpdateRequestDto.getFirebaseUid();

        if(!userUpdateRequestDto.getEmail().isEmpty())
            this.email = userUpdateRequestDto.getEmail();

        if(userUpdateRequestDto.getAlrmYn() != '\u0000'){
            System.out.println("4444");
            this.alrmYn = userUpdateRequestDto.getAlrmYn();
        }

        if(userUpdateRequestDto.getUserType() != null)
            this.userType = userUpdateRequestDto.getUserType();
    }

}
