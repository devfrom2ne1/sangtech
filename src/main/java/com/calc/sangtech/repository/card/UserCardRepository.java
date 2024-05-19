package com.calc.sangtech.repository.card;

import com.calc.sangtech.domain.card.UserCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserCardRepository extends JpaRepository<UserCard, Long> {
    //MyCardResponseDto findByUserIdAndCardId(Long userId, Long cardId);
    List<UserCard> findByUserIdAndCardInfo_CardId(Long userId, Long cardId);
    List<UserCard> findByUserId(Long userId);
    @Query("SELECT DISTINCT uc FROM UserCard uc WHERE uc.userId = :userId")
    List<UserCard> findDistinctByUserId(Long userId);

    int deleteByUserIdAndCardId(Long userId, Long cardId);
}
