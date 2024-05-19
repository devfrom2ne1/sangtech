package com.calc.sangtech.domain.card;

import com.calc.sangtech.domain.BaseTimeEntity;
import com.calc.sangtech.domain.code.ActivityType;
import com.calc.sangtech.domain.code.BenefitType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@Entity
@ToString
@Table(name = "CARD_INFO")
public class CardInfo extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CARD_ID")
    private Long cardId;

    @Column(name = "CARD_NM")
    private String cardName;

    @Column(name = "CARD_CORP_CD")
    private String cardCorpCode;

    @Column(name = "CARD_CORP_NM")
    private String cardCorpName;

    @Enumerated(EnumType.STRING)
    @Column(name = "BNFT_TYPE")
    private BenefitType benefitType;

    @Column(name = "CARD_IMG")
    private String cardImage;

    @Column(name = "CARD_DESC")
    private String cardDescription;

    @Column(name = "ANNUAL_FEE")
    private BigDecimal annualFee;

    @Enumerated(EnumType.STRING)
    @Column(name = "ACT_DV_CD")
    private ActivityType activationCode;

    @Column(name = "URL")
    private String url;

    @Column(name = "CTT")
    private String content;
    @Builder
    public CardInfo(Long cardId, String cardName, String cardCorpCode,
                                      String cardCorpName, BenefitType benefitType, String cardImage,
                                      String cardDescription, BigDecimal annualFee, ActivityType activationCode,
                                      String url, String content) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.cardCorpCode = cardCorpCode;
        this.cardCorpName = cardCorpName;
        this.benefitType = benefitType;
        this.cardImage = cardImage;
        this.cardDescription = cardDescription;
        this.annualFee = annualFee;
        this.activationCode = activationCode;
        this.url = url;
        this.content = content;
    }


}