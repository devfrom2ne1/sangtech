package com.calc.sangtech.web.dto.card.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@ToString
public class UserCardBenefitSaveRequestDto {
    private int performanceSection;
    private BigDecimal performanceConditionStart;
    private BigDecimal performanceConditionEnd;
    private String performanceDetails;
    private BigDecimal benefitAmount;
    private String benefitDetails;
}