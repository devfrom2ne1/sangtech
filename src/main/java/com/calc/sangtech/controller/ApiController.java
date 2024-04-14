package com.calc.sangtech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
    @GetMapping("/api/mycard")
    public String Mycard() {
        return "카드 등록";
    }

    @GetMapping("/api/calendar")
    public String Calendar() {
        //GetDayUtil getDayUtil = new GetDayUtil();
        //getDayUtil.util();
        return "캘린더";
    }

}
