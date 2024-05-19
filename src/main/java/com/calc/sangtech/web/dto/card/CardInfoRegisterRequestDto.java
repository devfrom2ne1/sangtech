package com.calc.sangtech.web.dto.card;

import com.calc.sangtech.domain.card.CardInfo;
import com.calc.sangtech.domain.code.ActivityType;
import com.calc.sangtech.domain.code.BenefitType;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.math.BigDecimal;


@Getter
@ToString
public class CardInfoRegisterRequestDto {
    private String cardName;
    private String cardCorpCode;
    private String cardCorpName;
    private BenefitType benefitType;
    private String cardImage;
    private String cardDescription;
    private BigDecimal annualFee;
    private String url;
    private String content;

    @Builder
    public CardInfoRegisterRequestDto(String cardName, String cardCorpCode,
                                      String cardCorpName, BenefitType benefitType, String cardImage,
                                      String cardDescription, BigDecimal annualFee, String url,
                                      String content) {
        this.cardName = cardName;
        this.cardCorpCode = cardCorpCode;
        this.cardCorpName = cardCorpName;
        this.benefitType = benefitType;
        this.cardImage = cardImage;
        this.cardDescription = cardDescription;
        this.annualFee = annualFee;
        this.url = url;
        this.content = content;
    }

    public CardInfo toEntity() {
        return CardInfo.builder()
                .cardName(cardName)
                .cardCorpCode(cardCorpCode)
                .cardCorpName(cardCorpName)
                .benefitType(benefitType)
                .cardImage(cardImage)
                .cardDescription(cardDescription)
                .annualFee(annualFee)
                .activationCode(ActivityType.ACTIVE)
                .url(url)
                .content(content)
                .build();
    }
}
