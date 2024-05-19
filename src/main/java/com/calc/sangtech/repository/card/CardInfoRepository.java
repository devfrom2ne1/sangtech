package com.calc.sangtech.repository.card;

import com.calc.sangtech.domain.card.CardInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardInfoRepository extends JpaRepository<CardInfo, Long> {

    @Query("SELECT DISTINCT ci FROM CardInfo ci LEFT JOIN UserCard uc ON ci.cardId = uc.cardId WHERE uc.userId = :userId")
    List<CardInfo> findDistinctByUserId(@Param("userId") Long userId);

}