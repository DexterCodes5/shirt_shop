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

import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AdminControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private ShirtRepository shirtRepository;

    @Test
    void canPostShirt() throws Exception {
        // given
        Shirt shirt = new Shirt("Slim Fit Shirt 'Ermo'", "HUGO", 157.90, 25, Color.BLACK, "Test", "img");

        // when
        ResultActions resultActions = mockMvc
                .perform(post("/api/admin")
                        .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpHamlNUmNWTXhXeXpBejNFYWZSOCJ9.eyJ1c2VyVHlwZXMiOlsiYWRtaW4iXSwiaXNzIjoiaHR0cHM6Ly9kZXYtMzY2eThub3UxY3FtYWJ3ci51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjRiZmVmOGY5ZGY4YjVlN2RlODc2MDQxIiwiYXVkIjpbImh0dHBzOi8vc2hpcnQtc2hvcC1hcGkuY29tIiwiaHR0cHM6Ly9kZXYtMzY2eThub3UxY3FtYWJ3ci51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkwNTUyNDYxLCJleHAiOjE2OTA2Mzg4NjEsImF6cCI6InV6cmtGcDJ1ZVMwemNUUUhHT1RRanBibUp6bXdSU1c2Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.OoBSFa7HMAvNnsVdMRIkZUpnjo2nFtWMoZbOYwkIW7kmuydkTCGmsKb0SHnirSj8TjzniYd-nCsXZbhotUUcp6LBvlMJ-pEdwH1LqEh4Ku8nVf7MQPkz5JkNfPFk7LLcOApb7kF3ipuVdWOUy-cNJ2hIM8N4QfHWvwQ2aA_KvqbRWePcm3Eh0LAIA8WxhlR9e8IdsLsOIySEqETZnObTQB8thsieRiBAKO9QHQxOOOTdAmTmsl1PpdInTNpvE_BWbX_YZeBAehaEOSnNQpCBZsP8ks1QcRqQs63UIUsWOcRwbeV1_4LkFIY-TDhK8rm_SHhopYrbBnvOmWd6Zkgeiw")
                .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(shirt)));

        // then
        resultActions.andExpect(status().isCreated());
        List<Shirt> shirts = shirtRepository.findAll();
        assertThat(shirts)
                .usingElementComparatorIgnoringFields("id")
                .contains(shirt);
    }

    @Test


    void willThrowWhenUserIsNotAdmin() throws Exception {
        // given
        Shirt shirt = new Shirt("Slim Fit Shirt 'Ermo'", "HUGO", 157.90, 25, Color.BLACK, "Test", "img");


        // when
        ResultActions resultActions = mockMvc.perform(post("/api/admin")
                        .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpHamlNUmNWTXhXeXpBejNFYWZSOCJ9.eyJ1c2VyVHlwZXMiOltdLCJpc3MiOiJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2NGE5MzAxODNhOTcwZGM4ZmQyODk4MzUiLCJhdWQiOlsiaHR0cHM6Ly9zaGlydC1zaG9wLWFwaS5jb20iLCJodHRwczovL2Rldi0zNjZ5OG5vdTFjcW1hYndyLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTA1NTM3OTcsImV4cCI6MTY5MDY0MDE5NywiYXpwIjoidXpya0ZwMnVlUzB6Y1RRSEdPVFFqcGJtSnptd1JTVzYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.A5AnuNZMGTGEMKVEK8LPadAEn0cW6VaFOl3L0bLM646QLeMKruyMvJpRc5OOVLJ6cVq2fXHosjMLipviJUGK5wKMsMNq73BK0JMQYxdWtddmG06Eqqj7Ckjpp1eHuykyhLdJdXTIDfd05TVeQeXOJZ25O-1UDYhgdnJ6ybMRxD8SYUsTTepBmDWtehYql8jty0iOqqhAkcakc_OzQKx-KzAJRhgUaRpM5ajncc7t9zqbz4RKAqJV9Fi_I1THRDBebcWsi00o8t95XOe8XayDjdUr6rbFd-2R8iLS6AgG36CFY04_hZwOEy7hSc36ca-h4ejej1aZLLD3HYcTp8Y2EA")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(shirt)));

        // then
        resultActions.andExpect(status().isForbidden());
    }

    @Test
    void deleteShirt() throws Exception {
        // given
        Shirt shirt = new Shirt("Slim Fit Shirt 'Ermo'", "HUGO", 157.90, 25, Color.BLACK, "Test", "img");
        shirt = shirtRepository.save(shirt);

        // when
        ResultActions resultActions = mockMvc
                .perform(delete("/api/admin")
                        .header("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InpHamlNUmNWTXhXeXpBejNFYWZSOCJ9.eyJ1c2VyVHlwZXMiOlsiYWRtaW4iXSwiaXNzIjoiaHR0cHM6Ly9kZXYtMzY2eThub3UxY3FtYWJ3ci51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjRiZmVmOGY5ZGY4YjVlN2RlODc2MDQxIiwiYXVkIjpbImh0dHBzOi8vc2hpcnQtc2hvcC1hcGkuY29tIiwiaHR0cHM6Ly9kZXYtMzY2eThub3UxY3FtYWJ3ci51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjkwNTUyNDYxLCJleHAiOjE2OTA2Mzg4NjEsImF6cCI6InV6cmtGcDJ1ZVMwemNUUUhHT1RRanBibUp6bXdSU1c2Iiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.OoBSFa7HMAvNnsVdMRIkZUpnjo2nFtWMoZbOYwkIW7kmuydkTCGmsKb0SHnirSj8TjzniYd-nCsXZbhotUUcp6LBvlMJ-pEdwH1LqEh4Ku8nVf7MQPkz5JkNfPFk7LLcOApb7kF3ipuVdWOUy-cNJ2hIM8N4QfHWvwQ2aA_KvqbRWePcm3Eh0LAIA8WxhlR9e8IdsLsOIySEqETZnObTQB8thsieRiBAKO9QHQxOOOTdAmTmsl1PpdInTNpvE_BWbX_YZeBAehaEOSnNQpCBZsP8ks1QcRqQs63UIUsWOcRwbeV1_4LkFIY-TDhK8rm_SHhopYrbBnvOmWd6Zkgeiw")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(shirt)));

        // then
        resultActions.andExpect(status().isOk());
        assertThat(shirtRepository.existsById(shirt.getId())).isFalse();
    }
}