package com.calc.sangtech.user;

import com.calc.sangtech.domain.code.Role;
import com.calc.sangtech.domain.user.User;
import com.calc.sangtech.repository.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void Join(){

        //given
        //LocalDateTime now = LocalDateTime.of(2022, 9, 16, 0, 0, 0);

        User user = User.builder()
                .userNm("haen")
                .email("haen@gmail.com")
                .userType(Role.ADMIN)
                .joinDt("20240423")
                .telNo("01022227777")
                .alrmYn('Y')
                .firebaseUid("18279127319djfsk")
                .build();
        //when
        //List<Posts> postsList = postsRepository.findAll();

        //then
        //Posts posts = postsList.get(0);

        //System.out.println(">>>>>>>>> createDate=" + user.getCreatedDate() + ", modifiedDate=" + posts.getModifiedDate());

        //assertThat(posts.getCreatedDate()).isAfter(now);
        //assertThat(posts.getModifiedDate()).isAfter(now);
        Long result_UserID  = userRepository.save(user).getUserId();
        System.out.println(">>>>>>>>> result_UserID=" + result_UserID);
    }
}
