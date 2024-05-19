package com.calc.sangtech.web;

import com.calc.sangtech.base.dto.DataResponseDto;
import com.calc.sangtech.service.card.CardInfoService;
import com.calc.sangtech.service.card.UserCardService;
import com.calc.sangtech.web.dto.card.CardInfoListResponseDto;
import com.calc.sangtech.web.dto.card.user.MyCardResponseDto;
import com.calc.sangtech.web.dto.card.user.UserCardSaveRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "내카드 API", description = "내카드 관련 API입니다.")
@RequiredArgsConstructor
@RestController
@Slf4j
public class MyCardApiController {
    private final CardInfoService cardInfoService;
    private final UserCardService userCardService;

    @PostMapping("/api/v1/myCard")
    @Operation(summary = "내 카드 등록", description = "사용자가 보유한 카드를 등록합니다.")
    public DataResponseDto<Boolean> registerUserCard(@RequestBody UserCardSaveRequestDto request){
        try {
            log.info("POST:/api/v1/card/user");
            return DataResponseDto.of(userCardService.registerUserCard(request) );
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }

    @GetMapping("/api/v1/myCard/{userId}/{cardId}")
    @Operation(summary = "내 카드 상세 조회", description = "카드 ID를 통해 카드 정보를 상세조회합니다.")
    public DataResponseDto<MyCardResponseDto> getMyCardDetails(@PathVariable Long userId, @PathVariable Long cardId){
        try {
            log.info("GET:/api/v1/myCard/{userId}/{cardId}");
            return DataResponseDto.of( userCardService.getMyCardDetails(userId, cardId) );
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }


    @GetMapping("/api/v1/myCard/{userId}")
    @Operation(summary = "내 카드 목록 조회", description = "내가 등록한 카드 목록을 조회합니다.")
    public DataResponseDto<List<CardInfoListResponseDto>> getMyCardList(@PathVariable Long userId){
        try {
            log.debug("GET:/api/v1/myCard/{userId}");
            return DataResponseDto.of( userCardService.getMyCardsList(userId) );
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }

/*
    @PatchMapping("/api/v1/card")
    @Operation(summary = "카드정보 수정", description = "카드 정보를 수정할 때 사용합니다.")
    public DataResponseDto<CardInfoResponseDto> update(@RequestBody UserUpdateRequestDto requestDto){
        try {
            log.debug("PUT:/api/v1/card");
            return DataResponseDto.of(new CardInfoResponseDto( cardInfoService.registerCardInfo(requestDto) ));
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }

 */
    @DeleteMapping("/api/v1/myCard/{userId}/{cardId}")
    @Operation(summary = "내 카드 삭제", description = "내가 등록했던 카드를 삭제합니다.")
    public DataResponseDto<Boolean> deleteMyCard(@PathVariable Long userId, @PathVariable Long cardId){
        try {
            log.debug("DELETE:/api/v1/myCard/{userId}/{cardId}");
            return DataResponseDto.of(userCardService.deleteMyCard( userId, cardId ));
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }
    }


}
