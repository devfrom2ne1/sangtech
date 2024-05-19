package com.calc.sangtech.service.card;

import com.calc.sangtech.base.GeneralException;
import com.calc.sangtech.base.dto.Code;
import com.calc.sangtech.domain.card.CardInfo;
import com.calc.sangtech.repository.card.CardInfoRepository;
import com.calc.sangtech.web.dto.card.CardInfoListResponseDto;
import com.calc.sangtech.web.dto.card.CardInfoRegisterRequestDto;
import com.calc.sangtech.web.dto.card.CardInfoResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
@Slf4j
public class CardInfoServiceImpl implements CardInfoService {
    private final CardInfoRepository cardInfoRepository;

    @Override
    public CardInfoResponseDto registerCardInfo(CardInfoRegisterRequestDto requestDto) {
        CardInfo entity = requestDto.toEntity();

        // 엔티티를 저장하고 자동 생성된 값을 받아옴
        entity = cardInfoRepository.save(entity);
        log.info("CardInfoServiceImpl : CardInfo saved with id={}", entity.getCardId());

        // 저장된 엔티티를 다시 조회하여 반환
        return new CardInfoResponseDto( cardInfoRepository.findById(entity.getCardId()).orElseThrow(() ->
                new GeneralException(Code.DATA_ACCESS_ERROR, "Failed to fetch saved CardInfo")) );
    }

    @Override
    public CardInfoResponseDto getCardInfoDetails(Long cardId) {
        return new CardInfoResponseDto( cardInfoRepository.findById(cardId).orElseThrow(() ->
                new GeneralException(Code.DATA_ACCESS_ERROR, "Failed to fetch saved CardInfo")) );
    }

    @Override
    public List<CardInfoListResponseDto> getCardInfoList() {
        Sort sort = Sort.by(Sort.Direction.DESC, "cardId");
        List<CardInfo> cardInfoList = cardInfoRepository.findAll(sort);
        if (cardInfoList.isEmpty()) {
            throw new GeneralException(Code.DATA_ACCESS_ERROR, "Failed to fetch saved CardInfo");
        }

        List<CardInfoListResponseDto> cardInfoDtos = new ArrayList<>();

        cardInfoList.forEach(cardInfo -> {
            // CardInfo를 CardInfoListResponseDto로 매핑하여 리스트에 추가
            CardInfoListResponseDto dto = new CardInfoListResponseDto(cardInfo);
            cardInfoDtos.add(dto);
        });

        return cardInfoDtos;
    }
}
