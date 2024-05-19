package com.calc.sangtech.util;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class DateUtil {
    public static String getNowDt(){
        // 현재 날짜를 가져옵니다.
        LocalDate currentDate = LocalDate.now();

        // 원하는 형식으로 날짜를 문자열로 변환합니다.
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String joinDt = currentDate.format(formatter);

        // 결과 출력
        System.out.println("현재 날짜: " + joinDt);
        return joinDt;
    }

}
