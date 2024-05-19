package com.calc.sangtech.service.card;

import com.calc.sangtech.web.dto.card.CardInfoListResponseDto;
import com.calc.sangtech.web.dto.card.user.MyCardResponseDto;
import com.calc.sangtech.web.dto.card.user.UserCardSaveRequestDto;

import java.util.List;

public interface UserCardService {
    public boolean registerUserCard(UserCardSaveRequestDto request);
    public MyCardResponseDto getMyCardDetails(Long userId, Long cardId);
    public List<CardInfoListResponseDto> getMyCardsList(Long userId);
    public Boolean deleteMyCard(Long userId, Long cardId);

}
