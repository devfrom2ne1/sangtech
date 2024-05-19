package com.calc.sangtech.domain.code;

public enum CardCorp {

    BC("10", "BC카드"),
    SHINHAN("20", "신한카드");

    private final String code;
    private final String description;

    CardCorp(String code, String description) {
        this.code = code;
        this.description = description;
    }
}
