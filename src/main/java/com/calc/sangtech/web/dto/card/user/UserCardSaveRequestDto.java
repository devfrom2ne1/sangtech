package com.calc.sangtech.web.dto.card.user;

import com.calc.sangtech.domain.code.BenefitType;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class UserCardSaveRequestDto {
    private Long userId;
    private Long cardId;
    private BenefitType benefitType;
    private List<UserCardBenefitSaveRequestDto> benefits;
}
