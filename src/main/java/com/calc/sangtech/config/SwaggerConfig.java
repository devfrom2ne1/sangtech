package com.calc.sangtech.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "Sangtech API Docs",
                description = "상테크 서비스를 위한 API 문서",
                version = "v1"
        )
)
@Configuration
public class SwaggerConfig {
}
