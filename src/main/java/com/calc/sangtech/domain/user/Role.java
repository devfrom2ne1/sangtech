package com.calc.sangtech.domain.user;

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
