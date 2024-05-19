package com.calc.sangtech.web.dto.user.buy;

import com.calc.sangtech.domain.code.BuyCategory;
import com.calc.sangtech.domain.user.UserBuyHistory;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class MyBuyResponseDto {
    private Long userId;
    private String buyDate;
    private int buySeq; //구매일련번호
    private Long buyCardId;
    private BuyCategory buyCategory;
    private BigDecimal buyPrice;
    private int buyQuantity;
    private BigDecimal buyAmount;
    private int exchangeId;
    private BigDecimal cashPrice;
    private int cashQuantity;
    private BigDecimal cashTotal;

    public MyBuyResponseDto(UserBuyHistory entity) {
        this.userId = entity.getUserId();
        this.buyDate = entity.getBuyDate();
        this.buySeq = entity.getBuySeq();
        this.buyCardId = entity.getBuyCardId();
        this.buyCategory = entity.getBuyCategory();
        this.buyPrice = entity.getBuyPrice();
        this.buyQuantity = entity.getBuyQuantity();
        this.buyAmount = entity.getBuyAmount();
        this.exchangeId = entity.getExchangeId();
        this.cashPrice = entity.getCashPrice();
        this.cashQuantity = entity.getCashQuantity();
        this.cashTotal = entity.getCashTotal();
    }

}
