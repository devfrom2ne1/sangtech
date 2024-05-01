package com.calc.sangtech.domain;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
@SuperBuilder
@NoArgsConstructor
public class Datetime {

    private LocalDateTime sysRegDate;
    private LocalDateTime sysUpdDate;

    @PrePersist // 데이터 생성이 이루어질때 사전 작업
    public void prePersist() {
        this.sysRegDate = LocalDateTime.now();
        this.sysUpdDate = this.sysRegDate;
    }

    @PreUpdate // 데이터 수정이 이루어질때 사전 작업
    public void preUpdate() {
        this.sysUpdDate = LocalDateTime.now();
    }
}