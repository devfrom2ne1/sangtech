package com.calc.sangtech.service.user;

import com.calc.sangtech.web.dto.user.buy.MyBuyRegisterRequestDto;
import com.calc.sangtech.web.dto.user.buy.MyBuyResponseDto;
import com.calc.sangtech.web.dto.user.buy.MyBuyUpdateRequestDto;

import java.util.List;

public interface UserBuyHistoryService {
    public boolean registerMyBuy(MyBuyRegisterRequestDto request);
    public boolean updateMyBuy(Long buyId, MyBuyUpdateRequestDto request);
    public Boolean deleteMyBuy(Long buyId);
    public MyBuyResponseDto getMyBuyDetails(Long buyId);
    public List<MyBuyResponseDto> getUserBuysInYearMonth(Long userId, String yearMonth);
}
