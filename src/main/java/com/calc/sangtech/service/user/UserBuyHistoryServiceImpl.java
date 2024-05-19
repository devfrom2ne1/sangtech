package com.calc.sangtech.service.user;

import com.calc.sangtech.domain.user.UserBuyHistory;
import com.calc.sangtech.repository.user.UserBuyHistoryRepository;
import com.calc.sangtech.web.dto.user.buy.MyBuyRegisterRequestDto;
import com.calc.sangtech.web.dto.user.buy.MyBuyResponseDto;
import com.calc.sangtech.web.dto.user.buy.MyBuyUpdateRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserBuyHistoryServiceImpl implements UserBuyHistoryService{
    private final UserBuyHistoryRepository userBuyHistoryRepository;

    @Override
    @Transactional
    public boolean registerMyBuy(MyBuyRegisterRequestDto request) {
        // 구매 시퀀스 번호 구하기
        int buySeq = userBuyHistoryRepository.findNextBuySeq(request.getUserId(), request.getBuyDate(), request.getBuyCardId());

        // 구매이력 저장
        UserBuyHistory entity = request.toEntity(buySeq);
        userBuyHistoryRepository.save(entity);

        if(entity.getBuyId() > 0)
            return true;
        else
            return false;
    }

    @Override
    @Transactional
    public boolean updateMyBuy(Long buyId, MyBuyUpdateRequestDto request) {
        // 기존 데이터 저장
        UserBuyHistory userBuyHistory = userBuyHistoryRepository.findById(buyId)
                .orElseThrow(()-> new IllegalArgumentException("Invalid buy ID"));

        // 구매 시퀀스 번호 구하기
        int buySeq = userBuyHistoryRepository.findNextBuySeq(request.getUserId(), request.getBuyDate(), request.getBuyCardId());

        // 업데이트
        userBuyHistory.update(request, buySeq);
        userBuyHistoryRepository.save(userBuyHistory);

        return true;
    }

    @Override
    @Transactional
    public Boolean deleteMyBuy(Long buyId) {
        userBuyHistoryRepository.deleteById(buyId);
        // 삭제 후 해당 ID가 여전히 존재하는지 확인
        return userBuyHistoryRepository.findById(buyId).isEmpty();
    }

    @Override
    @Transactional
    public MyBuyResponseDto getMyBuyDetails(Long buyId) {
        return new MyBuyResponseDto(userBuyHistoryRepository.findById(buyId)
                .orElseThrow(()-> new IllegalArgumentException("Invalid buy ID")));
    }

    @Override
    @Transactional
    public List<MyBuyResponseDto> getUserBuysInYearMonth(Long userId, String yearMonth) {
        List<UserBuyHistory> buyHistories = userBuyHistoryRepository.findAllByUserIdAndBuyDateInYearMonth(userId, yearMonth);
        return buyHistories.stream()
                .map(MyBuyResponseDto::new)
                .collect(Collectors.toList());
    }

}
