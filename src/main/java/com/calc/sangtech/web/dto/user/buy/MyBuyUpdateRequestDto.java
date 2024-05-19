package com.calc.sangtech.web.dto.user.buy;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor
public class MyBuyUpdateRequestDto {
    private Long userId;
    private String buyDate;
    private Long buyCardId;
    private BigDecimal buyPrice;
    private int buyQuantity;
    private BigDecimal buyAmount;
    private int exchangeId;
    private BigDecimal cashPrice;
    private int cashQuantity;
    private BigDecimal cashTotal;
}
