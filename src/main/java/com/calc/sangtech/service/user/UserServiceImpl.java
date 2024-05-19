package com.calc.sangtech.service.user;

import com.calc.sangtech.base.GeneralException;
import com.calc.sangtech.base.dto.Code;
import com.calc.sangtech.domain.user.User;
import com.calc.sangtech.repository.user.UserRepository;
import com.calc.sangtech.util.DateUtil;
import com.calc.sangtech.web.dto.user.UserJoinRequestDto;
import com.calc.sangtech.web.dto.user.UserUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;

    public User join(UserJoinRequestDto requestDto){

        // 1. 중복체크
        Boolean isNewUser = userRepository.existsByFirebaseUidOrEmailOrTelNoAndActYn(requestDto.getFirebaseUid(),requestDto.getEmail(), requestDto.getTelNo() );

        if( isNewUser ){
            throw new GeneralException(Code.VALIDATION_ERROR, "이미 가입된 회원입니다");
        }

        // 2. 회원가입 체크
        String joinDt = DateUtil.getNowDt();

        User user = User.builder()
                .userNm(requestDto.getUserNm())
                .email(requestDto.getEmail())
                .userType(requestDto.getUserType())
                .telNo(requestDto.getTelNo())
                .joinDt(joinDt)
                .alrmYn(requestDto.getAlrmYn())
                .actYn('Y')
                .firebaseUid(requestDto.getFirebaseUid())
                .build();

        userRepository.save(user);

        // 3. 회원가입 완료 후 조회
        user = userRepository.findUserByFirebaseUidAndActYn(requestDto.getFirebaseUid(), 'Y');
        return user;
    }

    @Override
    public User login(String firebaseUid) {
        User user = userRepository.findUserByFirebaseUidAndActYn(firebaseUid,'Y');
        if(user == null){
            throw new GeneralException(Code.NOT_FOUND, "존재하지 않는 회원입니다.");
        }
        return user;
    }

    @Override
    public User update(UserUpdateRequestDto requestDto) {
        User user = userRepository.findUserByUserIdAndActYn(requestDto.getUserId(), 'Y');

        System.out.println(user.toString());

        if(user == null){
            System.out.println("!@#!@#!@#존재하지 않는 회원");
            throw new GeneralException(Code.NOT_FOUND, "존재하지 않는 회원입니다.");
        }
        else{
            user.update(requestDto);
            userRepository.save(user);
        }
        return user;
    }

    @Override
    public User terminate(Long userId) {
        String trmnDt = DateUtil.getNowDt();
        User user = userRepository.findUserByUserIdAndActYn(userId, 'Y');

        if(user == null){
            throw new GeneralException(Code.NOT_FOUND, "회원정보를 찾을 수 없습니다.");
        }

        try {
            user.terminate(trmnDt);
        } catch (Exception e) {
            log.trace("Exception", e);
            throw e;
        }

        userRepository.save(user);
        user = userRepository.findUserByUserIdAndActYn(userId, 'N');
        return user;
    }
}
