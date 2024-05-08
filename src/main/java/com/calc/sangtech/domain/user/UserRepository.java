package com.calc.sangtech.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findUserByFirebaseUid(String firebaseUid);
    public User findUserByFirebaseUidAndActYn(String firebaseUid,char actYn);
    public User findUserByUserId(Long userId);
    public User findUserByUserIdAndActYn(Long userId, char actYn);
    public boolean existsByFirebaseUidOrEmailOrTelNo(String firebaseUid, String email, String telNo);

    @Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END FROM User e " +
            "WHERE e.actYn = 'Y' AND (e.firebaseUid = :firebaseUid OR e.email = :email OR e.telNo = :telNo)")
    boolean existsByFirebaseUidOrEmailOrTelNoAndActYn(
            @Param("firebaseUid") String firebaseUid,
            @Param("email") String email,
            @Param("telNo") String telNo
    );

}
