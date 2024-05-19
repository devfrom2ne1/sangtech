package com.calc.sangtech.domain.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
    MEMBER,
    ADMIN,
    ANONYMOUS,
    TERMINATE;
}
