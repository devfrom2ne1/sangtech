package com.calc.sangtech.web.dto.card;

import com.calc.sangtech.domain.card.CardInfo;
import lombok.Getter;


@Getter
public class CardInfoListResponseDto {
    private Long cardId;
    private String cardName;
    private String cardCorpCode;
    private String cardCorpName;
    private String cardImage;

    public CardInfoListResponseDto(CardInfo entity){
        this.cardId = entity.getCardId();
        this.cardName = entity.getCardName();
        this.cardCorpCode = entity.getCardCorpCode();
        this.cardCorpName = entity.getCardCorpName();
        this.cardImage = entity.getCardImage();
    }

}
