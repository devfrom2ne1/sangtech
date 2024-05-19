package com.calc.sangtech.util;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class MoneyUtil {
    public static boolean isNullOrZero(BigDecimal money){
        boolean result = false;

        if (money == null)
            result = true;
        if( money.compareTo(BigDecimal.ZERO) ==0 )
            result = true;

        return result;
    }
    public static BigDecimal getTotalAmount(BigDecimal price, int quantity){

        // int 값을 BigDecimal로 변환
        BigDecimal intAsBigDecimal = BigDecimal.valueOf(quantity);

        // 곱셈 연산
        BigDecimal amount = price.multiply(intAsBigDecimal);
        return amount;
    }

}
