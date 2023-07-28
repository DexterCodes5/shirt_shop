package dev.dex.springbootshirtshop.controller;

import com.fasterxml.jackson.databind.*;
import dev.dex.springbootshirtshop.entity.*;
import dev.dex.springbootshirtshop.repository.*;
import dev.dex.springbootshirtshop.util.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.test.autoconfigure.web.servlet.*;
import org.springframework.boot.test.context.*;
import org.springframework.http.*;
import org.springframework.test.web.servlet.*;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ReviewControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ShirtRepository shirtRepository;

    @Test
    void postReview() throws Exception {
        // given
        Review review = new Review("testMock@mail.com", "testDate", 3, 1, "test");

        // when
        ResultActions resultActions = mockMvc
                .perform(post("/api/review/secure/postreview")
                        .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpHamlNUmNWTXhXeXpBejNFYWZSOCJ9.eyJ1c2VyVHlwZXMiOltdLCJpc3MiOiJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NGE5MzAxODNhOTcwZGM4ZmQyODk4MzUiLCJhdWQiOlsiaHR0cHM6Ly9zaGlydC1zaG9wLWFwaS5jb20iLCJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTA1NTM3OTcsImV4cCI6MTY5MDY0MDE5NywiYXpwIjoidXpya0ZwMnVlUzB6Y1RRSEdPVFFqcGJtSnptd1JTVzYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.A5AnuNZMGTGEMKVEK8LPadAEn0cW6VaFOl3L0bLM646QLeMKruyMvJpRc5OOVLJ6cVq2fXHosjMLipviJUGK5wKMsMNq73BK0JMQYxdWtddmG06Eqqj7Ckjpp1eHuykyhLdJdXTIDfd05TVeQeXOJZ25O-1UDYhgdnJ6ybMRxD8SYUsTTepBmDWtehYql8jty0iOqqhAkcakc_OzQKx-KzAJRhgUaRpM5ajncc7t9zqbz4RKAqJV9Fi_I1THRDBebcWsi00o8t95XOe8XayDjdUr6rbFd-2R8iLS6AgG36CFY04_hZwOEy7hSc36ca-h4ejej1aZLLD3HYcTp8Y2EA")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(review)));

        // then
        resultActions.andExpect(status().isCreated());
    }

    @Test
    void isReviewedByUser() throws Exception {
        // given
        Shirt shirt = shirtRepository.save(new Shirt("test title", "test brand", 10, 10, Color.BLACK, "test", "test"));
        Review review = new Review("testMock@mail.com", "testDate", 3, shirt.getId(), "test");
        mockMvc.perform(post("/api/review/secure/postreview")
                        .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpHamlNUmNWTXhXeXpBejNFYWZSOCJ9.eyJ1c2VyVHlwZXMiOltdLCJpc3MiOiJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NGE5MzAxODNhOTcwZGM4ZmQyODk4MzUiLCJhdWQiOlsiaHR0cHM6Ly9zaGlydC1zaG9wLWFwaS5jb20iLCJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTA1NTM3OTcsImV4cCI6MTY5MDY0MDE5NywiYXpwIjoidXpya0ZwMnVlUzB6Y1RRSEdPVFFqcGJtSnptd1JTVzYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.A5AnuNZMGTGEMKVEK8LPadAEn0cW6VaFOl3L0bLM646QLeMKruyMvJpRc5OOVLJ6cVq2fXHosjMLipviJUGK5wKMsMNq73BK0JMQYxdWtddmG06Eqqj7Ckjpp1eHuykyhLdJdXTIDfd05TVeQeXOJZ25O-1UDYhgdnJ6ybMRxD8SYUsTTepBmDWtehYql8jty0iOqqhAkcakc_OzQKx-KzAJRhgUaRpM5ajncc7t9zqbz4RKAqJV9Fi_I1THRDBebcWsi00o8t95XOe8XayDjdUr6rbFd-2R8iLS6AgG36CFY04_hZwOEy7hSc36ca-h4ejej1aZLLD3HYcTp8Y2EA")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(review)))
                .andExpect(status().isCreated());

        // when
        ResultActions resultActions = mockMvc
                .perform(get("/api/review/secure/isreviewed/byuser?userEmail=testMock@mail.com&shirtId=" + shirt.getId())
                        .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpHamlNUmNWTXhXeXpBejNFYWZSOCJ9.eyJ1c2VyVHlwZXMiOltdLCJpc3MiOiJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NGE5MzAxODNhOTcwZGM4ZmQyODk4MzUiLCJhdWQiOlsiaHR0cHM6Ly9zaGlydC1zaG9wLWFwaS5jb20iLCJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTA1NTM3OTcsImV4cCI6MTY5MDY0MDE5NywiYXpwIjoidXpya0ZwMnVlUzB6Y1RRSEdPVFFqcGJtSnptd1JTVzYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.A5AnuNZMGTGEMKVEK8LPadAEn0cW6VaFOl3L0bLM646QLeMKruyMvJpRc5OOVLJ6cVq2fXHosjMLipviJUGK5wKMsMNq73BK0JMQYxdWtddmG06Eqqj7Ckjpp1eHuykyhLdJdXTIDfd05TVeQeXOJZ25O-1UDYhgdnJ6ybMRxD8SYUsTTepBmDWtehYql8jty0iOqqhAkcakc_OzQKx-KzAJRhgUaRpM5ajncc7t9zqbz4RKAqJV9Fi_I1THRDBebcWsi00o8t95XOe8XayDjdUr6rbFd-2R8iLS6AgG36CFY04_hZwOEy7hSc36ca-h4ejej1aZLLD3HYcTp8Y2EA"));

        // then
        MvcResult getBooleanResult = resultActions.andExpect(status().isOk())
                .andReturn();
        boolean isReviewed = Boolean.parseBoolean(getBooleanResult.getResponse().getContentAsString());
        assertThat(isReviewed).isEqualTo(true);
    }
}