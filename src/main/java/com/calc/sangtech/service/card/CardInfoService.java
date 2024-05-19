package com.calc.sangtech.service.card;

import com.calc.sangtech.web.dto.card.CardInfoListResponseDto;
import com.calc.sangtech.web.dto.card.CardInfoRegisterRequestDto;
import com.calc.sangtech.web.dto.card.CardInfoResponseDto;

import java.util.List;

public interface CardInfoService {
    public CardInfoResponseDto registerCardInfo(CardInfoRegisterRequestDto requestDto);
    public CardInfoResponseDto getCardInfoDetails(Long cardId);

    public List<CardInfoListResponseDto> getCardInfoList();
}
