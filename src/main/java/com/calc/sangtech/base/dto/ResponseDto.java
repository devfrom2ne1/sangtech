package com.calc.sangtech.base.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@RequiredArgsConstructor
public class ResponseDto {

    private final Boolean isSuccess;
    private final Integer code;
    private final String message;

    public static ResponseDto of(Boolean isSuccess, Code code) {
        return new ResponseDto(isSuccess, code.getCode(), code.getMessage());
    }

    public static ResponseDto of(Boolean isSuccess, Code errorCode, Exception e) {
        return new ResponseDto(isSuccess, errorCode.getCode(), errorCode.getMessage(e));
    }

    public static ResponseDto of(Boolean isSuccess, Code errorCode, String message) {
        return new ResponseDto(isSuccess, errorCode.getCode(), errorCode.getMessage(message));
    }
}
