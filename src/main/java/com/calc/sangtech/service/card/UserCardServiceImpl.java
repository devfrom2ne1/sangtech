package com.calc.sangtech.service.card;

import com.calc.sangtech.domain.card.CardInfo;
import com.calc.sangtech.domain.card.UserCard;
import com.calc.sangtech.repository.card.CardInfoRepository;
import com.calc.sangtech.repository.card.UserCardRepository;
import com.calc.sangtech.util.DateUtil;
import com.calc.sangtech.web.dto.card.CardInfoListResponseDto;
import com.calc.sangtech.web.dto.card.CardInfoResponseDto;
import com.calc.sangtech.web.dto.card.user.MyCardResponseDto;
import com.calc.sangtech.web.dto.card.user.UserCardBenefitResponseDto;
import com.calc.sangtech.web.dto.card.user.UserCardSaveRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserCardServiceImpl implements UserCardService {
    private final UserCardRepository userCardRepository;
    private final CardInfoRepository cardInfoRepository;
    @Override
    public boolean registerUserCard(UserCardSaveRequestDto request) {

        boolean response = false; // 응답결과

        // 1. 회원 존재 여부 확인

        // 2. 카드 존재 여부 확인 (없는 카드면 등록먼저 해야함)

        // 3. 사용자 카드 정보 저장
        request.getBenefits().forEach(benefit -> {

            // 4. 중복 실적구간 존재여부 확인

            // 5. 사용자 카드 저장
            UserCard userCard = UserCard.builder()
                    .cardId(request.getCardId())
                    .userId(request.getUserId())
                    .registrationDate(DateUtil.getNowDt())
                    .performanceSection(benefit.getPerformanceSection())
                    .performanceDetails(benefit.getPerformanceDetails())
                    .performanceConditionStart(benefit.getPerformanceConditionStart())
                    .performanceConditionEnd(benefit.getPerformanceConditionEnd())
                    .benefitAmount(benefit.getBenefitAmount())
                    .benefitDetails(benefit.getBenefitDetails())
                    .build();

            userCardRepository.save(userCard);
            log.info("[registerUserCard] BNFT_ID={}",userCard.getBenefitId());

        });
        response = true;

        // 저장된 엔티티를 다시 조회하여 반환
        return response;
    }

    @Override
    public MyCardResponseDto getMyCardDetails(Long userId, Long cardId) {
        List<UserCard> userCards = userCardRepository.findByUserIdAndCardInfo_CardId(userId, cardId);

        // 엔티티를 DTO로 변환
        List<UserCardBenefitResponseDto> benefits = userCards.stream()
                .map(UserCardBenefitResponseDto::new)
                .collect(Collectors.toList());

        // 각 카드에 대한 CardInfo를 가져와서 MyCardResponseDto에 설정
        List<CardInfo> cardInfos = userCards.stream()
                .map(UserCard::getCardInfo)
                .toList();

        CardInfoResponseDto cardInfo = new CardInfoResponseDto(cardInfos.get(0));

        MyCardResponseDto myCardResponseDto = new MyCardResponseDto(cardInfo, benefits);

        return myCardResponseDto;
    }

    @Override
    public List<CardInfoListResponseDto> getMyCardsList(Long userId) {
        List<CardInfo> userCards = cardInfoRepository.findDistinctByUserId(userId);

        return userCards.stream()
                .map(cardInfo -> new CardInfoListResponseDto(cardInfo))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Boolean deleteMyCard(Long userId, Long cardId) {
        boolean response = false; // 응답결과

        int cnt = userCardRepository.deleteByUserIdAndCardId(userId, cardId);
        if(cnt>0)
            response = true;

        return response;
    }
}