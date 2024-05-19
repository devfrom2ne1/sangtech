package com.calc.sangtech.web;

import com.calc.sangtech.base.dto.DataResponseDto;
import com.calc.sangtech.service.card.CardInfoService;
import com.calc.sangtech.service.card.UserCardService;
import com.calc.sangtech.web.dto.card.CardInfoListResponseDto;
import com.calc.sangtech.web.dto.card.CardInfoRegisterRequestDto;
import com.calc.sangtech.web.dto.card.CardInfoResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "[ADMIN 전용] 카드 API", description = "카드 관련 API입니다.")
@RequiredArgsConstructor
@RestController
@Slf4j
public class CardApiController {
    private final CardInfoService cardInfoService;
    private final UserCardService userCardService;

    @PostMapping("/api/v1/card")
    @Operation(summary = "카드 정보 입력", description = "상테크용 카드 기본정보를 입력합니다.")
    public DataResponseDto<CardInfoResponseDto> registerCardInfo(@RequestBody CardInfoRegisterRequestDto requestDto){
        try {
            log.info("POST:/api/v1/card");
            return DataResponseDto.of(cardInfoService.registerCardInfo(requestDto) );
        } catch (Exception e) {
            log.info("Exception", e);
            throw e;
        }
    }
    @GetMapping("/api/v1/card/{cardId}")
    @Operation(summary = "카드 정보 단건 조회", description = "카드 ID를 통해 카드 정보를 상세조회합니다.")
    public DataResponseDto<CardInfoResponseDto> getCardInfoDetails(@PathVariable Long cardId){
        try {
            log.debug("GET:/api/v1/card");
            return DataResponseDto.of( cardInfoService.getCardInfoDetails(cardId) );
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }

    @GetMapping("/api/v1/card")
    @Operation(summary = "카드 정보 목록 조회", description = "카드 정보를 리스트를 조회합니다.")
    public DataResponseDto<List<CardInfoListResponseDto>> getCardInfoList(){
        try {
            log.debug("GET:/api/v1/cards");
            return DataResponseDto.of( cardInfoService.getCardInfoList() );
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }

}
