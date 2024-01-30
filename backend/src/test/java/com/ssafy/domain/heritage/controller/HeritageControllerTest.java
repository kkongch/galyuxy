package com.ssafy.domain.heritage.controller;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;




@SpringBootTest
@AutoConfigureMockMvc
class HeritageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;



@Test
    public void testgetAllHeritage() throws Exception {
        // Perform the GET request
        ResultActions resultActions = mockMvc.perform(get("/heritage"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        // You can add more assertions based on your expected response
        // For example, check the content of the response
        // resultActions.andExpect(jsonPath("$.dataHeader.successCode").value(0));
    }

    @Test
    public void testGetOneHeritageById() throws Exception {
        int heritageId = 1; // Replace with a valid heritage ID

        // Perform the GET request
        ResultActions resultActions = mockMvc.perform(get("/heritage/{heritageId}", heritageId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));

        // You can add more assertions based on your expected response
        // For example, check the content of the response
        resultActions.andExpect(jsonPath("$.dataHeader.successCode").value(0));
    }
}
