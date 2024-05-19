package com.calc.sangtech.service.sangtech;

import com.calc.sangtech.repository.sangtech.SantechInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class SantechInfoServiceImpl implements SantechInfoService {
    private final SantechInfoRepository santechInfoRepository;

}
