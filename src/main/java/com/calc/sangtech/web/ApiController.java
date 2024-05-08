package com.calc.sangtech.web;

import com.calc.sangtech.base.dto.DataResponseDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "테스트 API", description = "테스트용 API입니다.")
@RestController
@Slf4j
public class ApiController {
    @GetMapping("/api/v1/test")
    public DataResponseDto<Object> Test() {
        try {
            List<Integer> list = List.of(1, 2, 3, 4, 5);
            log.debug(list.get(99999).toString()); // outofbound exception occurs
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
        return DataResponseDto.empty();
    }
}
