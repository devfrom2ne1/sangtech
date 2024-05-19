package com.calc.sangtech.domain.exchange;

import com.calc.sangtech.domain.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.math.BigDecimal;

@Getter
@NoArgsConstructor
@Entity
@ToString
@Table(name = "CASH_EXCH_INFO")
public class CashExchangeInfo extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EXCH_ID")
    private int exchangeId;

    @Column(name = "EXCH_NAME")
    private String exchangeName; // 현금환전처명

    @Column(name = "URL")
    private String url; // 현금환전처명

    @Column(name = "FEE_AMOUNT")
    private BigDecimal feeAmount;

    @Column(name = "FEE_PERCENT")
    private BigDecimal feePercent;
}
