package com.calc.sangtech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:/aws.properties")
public class SangtechApplication {

    public static void main(String[] args) {
        SpringApplication.run(SangtechApplication.class, args);
    }

}
