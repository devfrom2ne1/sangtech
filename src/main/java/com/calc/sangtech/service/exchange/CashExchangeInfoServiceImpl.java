package com.calc.sangtech.service.exchange;

import com.calc.sangtech.repository.exchange.CashExchangeInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class CashExchangeInfoServiceImpl implements CashExchangeInfoService {
    private final CashExchangeInfoRepository cashExchangeInfoRepository;

}
