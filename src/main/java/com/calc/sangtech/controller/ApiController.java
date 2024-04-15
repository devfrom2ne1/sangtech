package com.calc.sangtech.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@Tag(name = "테스트 API", description = "테스트용 API입니다.")
@RestController
public class ApiController {
    @GetMapping("/api/v1/test")
    public String Test() {
        return "this is test api";
    }

}
