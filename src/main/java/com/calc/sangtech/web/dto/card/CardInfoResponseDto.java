package com.calc.sangtech.web.dto.card;

import com.calc.sangtech.domain.card.CardInfo;
import com.calc.sangtech.domain.code.BenefitType;
import lombok.Getter;

import java.math.BigDecimal;


@Getter
public class CardInfoResponseDto {
    private Long cardId;
    private String cardName;
    private String cardCorpCode;
    private String cardCorpName;
    private BenefitType benefitType;
    private String cardImage;
    private String cardDescription;
    private BigDecimal annualFee;
    private String url;
    private String content;
    public CardInfoResponseDto(CardInfo entity){
        this.cardId = entity.getCardId();
        this.cardName = entity.getCardName();
        this.cardCorpCode = entity.getCardCorpCode();
        this.cardCorpName = entity.getCardCorpName();
        this.benefitType = entity.getBenefitType();
        this.cardImage = entity.getCardImage();
        this.cardDescription = entity.getCardDescription();
        this.annualFee = entity.getAnnualFee();
        this.url = entity.getUrl();
        this.content = entity.getContent();
    }
}
