package com.calc.sangtech.web.dto.card.user;

import com.calc.sangtech.domain.card.UserCard;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@ToString
public class UserCardBenefitResponseDto {
    private int performanceSection;
    private BigDecimal performanceConditionStart;
    private BigDecimal performanceConditionEnd;
    private String performanceDetails;
    private BigDecimal benefitAmount;
    private String benefitDetails;

    public UserCardBenefitResponseDto(UserCard entity) {
        this.performanceSection = entity.getPerformanceSection();
        this.performanceConditionStart = entity.getPerformanceConditionStart();
        this.performanceConditionEnd = entity.getPerformanceConditionEnd();
        this.performanceDetails = entity.getPerformanceDetails();
        this.benefitAmount = entity.getBenefitAmount();
        this.benefitDetails = entity.getBenefitDetails();
    }
}