package com.calc.sangtech.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {
    @GetMapping("/")
    public String Home() {
        return "형빈이와 함께하는 상테크 v.1";
    }

    @GetMapping("/mycard")
    public String Mycard() {
        return "카드 등록";
    }
}