package com.calc.sangtech.domain.card;

import com.calc.sangtech.domain.BaseTimeEntity;
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
@Table(name = "USER_CARD")
public class UserCard extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "BNFT_ID")
    private Long benefitId;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "CARD_ID")
    private Long cardId;

    @Column(name = "PERF_SECT")
    private int performanceSection;

    @Column(name = "PERF_CNDT_STR")
    private BigDecimal performanceConditionStart;

    @Column(name = "PERF_CNDT_END")
    private BigDecimal performanceConditionEnd;

    @Column(name = "PERF_DTLS")
    private String performanceDetails;

    @Column(name = "BNFT_AMT")
    private BigDecimal benefitAmount;

    @Column(name = "BNFT_DTLS")
    private String benefitDetails;

    @Column(name = "REG_DT")
    private String registrationDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CARD_ID", insertable = false, updatable = false)
    private CardInfo cardInfo;

    @Builder
    public UserCard(Long benefitId, Long userId, Long cardId,
                   int performanceSection, BigDecimal performanceConditionStart,
                   BigDecimal performanceConditionEnd, String performanceDetails,
                   BigDecimal benefitAmount, String benefitDetails, String registrationDate) {
        this.benefitId = benefitId;
        this.userId = userId;
        this.cardId = cardId;
        this.performanceSection = performanceSection;
        this.performanceConditionStart = performanceConditionStart;
        this.performanceConditionEnd = performanceConditionEnd;
        this.performanceDetails = performanceDetails;
        this.benefitAmount = benefitAmount;
        this.benefitDetails = benefitDetails;
        this.registrationDate = registrationDate;
    }
}
