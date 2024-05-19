package com.calc.sangtech.repository.user;

import com.calc.sangtech.domain.user.UserBuyHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserBuyHistoryRepository extends JpaRepository<UserBuyHistory, Long> {
    @Query("SELECT COALESCE(MAX(ubh.buySeq), 0) + 1 FROM UserBuyHistory ubh WHERE ubh.userId = :userId AND ubh.buyDate = :buyDate AND ubh.buyCardId = :buyCardId")
    int findNextBuySeq(@Param("userId") Long userId, @Param("buyDate") String buyDate, @Param("buyCardId") Long buyCardId);
    @Query("SELECT u FROM UserBuyHistory u WHERE u.userId = :userId AND u.buyDate LIKE :yearMonth%")
    List<UserBuyHistory> findAllByUserIdAndBuyDateInYearMonth(@Param("userId") Long userId, @Param("yearMonth") String yearMonth);

}
