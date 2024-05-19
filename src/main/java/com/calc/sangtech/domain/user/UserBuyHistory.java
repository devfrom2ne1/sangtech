package com.calc.sangtech.domain.user;

import com.calc.sangtech.domain.BaseTimeEntity;
import com.calc.sangtech.domain.code.BuyCategory;
import com.calc.sangtech.util.MoneyUtil;
import com.calc.sangtech.web.dto.user.buy.MyBuyUpdateRequestDto;
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
@Table(name = "USER_BUY_HIST")
public class UserBuyHistory extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BUY_ID")
    private Long buyId;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "BUY_DATE")
    private String buyDate;

    @Column(name = "BUY_SEQ")
    private int buySeq; //구매일련번호

    @Column(name = "BUY_CARD_ID")
    private Long buyCardId; //구매한 카드 ID

    @Column(name = "BUY_CTGR")
    @Enumerated(EnumType.STRING)
    private BuyCategory buyCategory; //구매카테고리

    @Column(name = "BUY_PRICE")
    private BigDecimal buyPrice; //구매금액(상품권)

    @Column(name = "BUY_QTY")
    private int buyQuantity; //구매수량(상품권)

    @Column(name = "BUY_AMOUNT")
    private BigDecimal buyAmount; //구매총액(싱품권)

    @Column(name = "EXCH_ID")
    private int exchangeId; //현금 환전소 ID

    @Column(name = "CASH_PRICE")
    private BigDecimal cashPrice; //환전금액(현금)

    @Column(name = "CASH_QTY")
    private int cashQuantity; // 환전수량(현금)

    @Column(name = "CASH_TOTAL")
    private BigDecimal cashTotal; // 환전총액(현금)

    @Builder
    public UserBuyHistory(Long userId, String buyDate, int buySeq, Long buyCardId, BuyCategory buyCategory,
                                   BigDecimal buyPrice, int buyQuantity, BigDecimal buyAmount, int exchangeId,
                                   BigDecimal cashPrice, int cashQuantity, BigDecimal cashTotal) {
        this.userId = userId;
        this.buyDate = buyDate;
        this.buySeq = buySeq;
        this.buyCardId = buyCardId;
        this.buyCategory = buyCategory;
        this.buyPrice = buyPrice;
        this.buyQuantity = buyQuantity;
        this.buyAmount = buyAmount;
        this.exchangeId = exchangeId;
        this.cashPrice = cashPrice;
        this.cashQuantity = cashQuantity;
        this.cashTotal = cashTotal;
    }

    public void update(MyBuyUpdateRequestDto requestDto, int buySeq) {
        this.buySeq = buySeq;

        if (!requestDto.getBuyDate().isEmpty()) this.buyDate = requestDto.getBuyDate();
        if (!MoneyUtil.isNullOrZero(requestDto.getBuyPrice())) this.buyPrice = requestDto.getBuyPrice();
        if (requestDto.getBuyQuantity() != 0) this.buyQuantity = requestDto.getBuyQuantity();
        if (!MoneyUtil.isNullOrZero(requestDto.getBuyAmount())) this.buyAmount = requestDto.getBuyAmount();
        if (requestDto.getExchangeId() != 0) this.exchangeId = requestDto.getExchangeId();
        if (!MoneyUtil.isNullOrZero(requestDto.getCashPrice())) this.cashPrice = requestDto.getCashPrice();
        if (requestDto.getCashQuantity() != 0) this.cashQuantity = requestDto.getCashQuantity();
        if (!MoneyUtil.isNullOrZero(requestDto.getCashTotal())) this.cashTotal = requestDto.getCashTotal();

        this.buyAmount = MoneyUtil.getTotalAmount(this.buyPrice, this.buyQuantity);
        this.cashTotal = MoneyUtil.getTotalAmount(this.cashPrice, this.cashQuantity);
    }

}
