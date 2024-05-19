package com.calc.sangtech.web.dto.card.user;

import com.calc.sangtech.web.dto.card.CardInfoResponseDto;
import lombok.Getter;

import java.util.List;


@Getter
public class MyCardResponseDto {
    private CardInfoResponseDto cardInfoResponseDto;
    private List<UserCardBenefitResponseDto> benefits;

    public MyCardResponseDto(CardInfoResponseDto cardInfoResponseDto
            , List<UserCardBenefitResponseDto> benefits){
        this.cardInfoResponseDto = cardInfoResponseDto;
        this.benefits = benefits;
    }


}
