package com.calc.sangtech.web.dto.user.buy;

import com.calc.sangtech.domain.code.BuyCategory;
import com.calc.sangtech.domain.user.UserBuyHistory;
import com.calc.sangtech.util.MoneyUtil;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
public class MyBuyRegisterRequestDto {
    private Long userId;
    private String buyDate;
    private Long buyCardId;
    private BuyCategory buyCategory;
    private BigDecimal buyPrice;
    private int buyQuantity;
    private BigDecimal buyAmount;
    private int exchangeId;
    private BigDecimal cashPrice;
    private int cashQuantity;
    private BigDecimal cashTotal;

    @Builder
    public MyBuyRegisterRequestDto(Long userId, String buyDate, Long buyCardId, BuyCategory buyCategory,
                                   BigDecimal buyPrice, int buyQuantity, BigDecimal buyAmount, int exchangeId,
                                   BigDecimal cashPrice, int cashQuantity, BigDecimal cashTotal) {

        buyAmount = MoneyUtil.getTotalAmount(buyPrice, buyQuantity);
        cashTotal = MoneyUtil.getTotalAmount(cashPrice, cashQuantity);

        this.userId = userId;
        this.buyDate = buyDate;
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
    public UserBuyHistory toEntity(int buySeq) {
        buyAmount = MoneyUtil.getTotalAmount(buyPrice, buyQuantity);
        cashTotal = MoneyUtil.getTotalAmount(cashPrice, cashQuantity);

        return UserBuyHistory.builder()
                .userId(userId)
                .buyDate(buyDate)
                .buySeq(buySeq)
                .buyCardId(buyCardId)
                .buyCategory(buyCategory)
                .buyPrice(buyPrice)
                .buyQuantity(buyQuantity)
                .buyAmount(buyAmount)
                .exchangeId(exchangeId)
                .cashPrice(cashPrice)
                .cashQuantity(cashQuantity)
                .cashTotal(cashTotal)
                .build();
    }
}
