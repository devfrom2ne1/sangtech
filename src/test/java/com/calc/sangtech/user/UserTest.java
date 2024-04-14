package com.calc.sangtech.user;

import com.calc.sangtech.domain.user.User;
import com.calc.sangtech.domain.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

//@RunWith(SpringRunner.class)
@SpringBootTest
public class UserTest {
    @Autowired
    private UserRepository userRepository;

    @Test
    public void UserSingin(){

        //given
        LocalDateTime now = LocalDateTime.of(2022, 9, 16, 0, 0, 0);
        userRepository.save(User.builder()
                        .id("haen")
                        .pw("1234")
                .build());
        //when
        //List<Posts> postsList = postsRepository.findAll();

        //then
        //Posts posts = postsList.get(0);

        //System.out.println(">>>>>>>>> createDate=" + user.getCreatedDate() + ", modifiedDate=" + posts.getModifiedDate());

        //assertThat(posts.getCreatedDate()).isAfter(now);
        //assertThat(posts.getModifiedDate()).isAfter(now);
    }
}
