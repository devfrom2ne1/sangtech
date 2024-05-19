package com.calc.sangtech.web;

import com.calc.sangtech.base.dto.DataResponseDto;
import com.calc.sangtech.service.user.UserBuyHistoryService;
import com.calc.sangtech.web.dto.user.buy.MyBuyRegisterRequestDto;
import com.calc.sangtech.web.dto.user.buy.MyBuyResponseDto;
import com.calc.sangtech.web.dto.user.buy.MyBuyUpdateRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "내 구입내역 API", description = "내 구입내역 관련 API입니다.")
@RequiredArgsConstructor
@RestController
@Slf4j
public class MyBuyApiController {
    private final UserBuyHistoryService userBuyHistoryService;

    @PostMapping("/api/v1/myBuy")
    @Operation(summary = "내 구입내역 등록", description = "각 카드의 구입내역을 등록합니다.")
    public DataResponseDto<Boolean> registerMyBuy(@RequestBody MyBuyRegisterRequestDto request){
        try {
            log.info("POST:/api/v1/myBuy");
            return DataResponseDto.of(userBuyHistoryService.registerMyBuy(request) );
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }
    @PatchMapping("/api/v1/myBuy/{buyId}")
    @Operation(summary = "내 구입내역 수정", description = "이미 등록한 카드의 구입내역을 수정합니다.")
    public DataResponseDto<Boolean> updateMyBuy(@PathVariable Long buyId, @RequestBody MyBuyUpdateRequestDto request){
        try {
            log.debug("PATCH:/api/v1/myBuy");
            return DataResponseDto.of( userBuyHistoryService.updateMyBuy(buyId, request) );
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }
    @DeleteMapping("/api/v1/myBuy/{buyId}")
    @Operation(summary = "내 구입내역 삭제", description = "이미 등록한 카드의 구입내역을 삭제합니다.")
    public DataResponseDto<Boolean> deleteMyBuy(@PathVariable Long buyId){
        try {
            log.debug("DELETE:/api/v1/myBuy/{buyId}");
            return DataResponseDto.of(userBuyHistoryService.deleteMyBuy( buyId ));
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }


    @GetMapping("/api/v1/myBuy/{buyId}")
    @Operation(summary = "내 구입내역 상세 조회", description = "등록한 구매내역을 상세조회합니다.")
    public DataResponseDto<MyBuyResponseDto> getMyBuyDetails(@PathVariable Long buyId){
        try {
            log.info("GET:/api/v1/myBuy/{buyId}");
            return DataResponseDto.of( userBuyHistoryService.getMyBuyDetails( buyId ) );
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }

    @GetMapping("/api/v1/myBuy/{userId}/{yearMonth}")
    @Operation(summary = "내 구입내역 목록 조회", description = "등록한 구매내역을 목록을 조회합니다.")
    public DataResponseDto<List<MyBuyResponseDto>> getUserBuysInYearMonth(@PathVariable Long userId,@PathVariable String yearMonth){
        try {
            log.debug("GET:/api/v1/myBuy/{userId}/{yearMonth}");
            return DataResponseDto.of( userBuyHistoryService.getUserBuysInYearMonth(userId, yearMonth) );
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }


}
