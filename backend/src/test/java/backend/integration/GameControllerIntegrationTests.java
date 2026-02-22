package backend.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

/** Integration tests for {@link GameController}. */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Testcontainers
@Tag("integrationTest")
class GameControllerIntegrationTest {
  @Autowired private MockMvc mockMvc;

  @Container static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18.1");

  @LocalServerPort private Integer port;

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Test
  public void getFixedLettersReturns200OkResponseWhenWordLengthIsFive() throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/5/5").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.fixedLetters").isArray())
        .andExpect(jsonPath("$.wordLength").value(5));
  }

  @Test
  public void getFixedLettersReturns200OkResponseWhenWordLengthIsSix() throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/6/5").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.fixedLetters").isArray())
        .andExpect(jsonPath("$.wordLength").value(6));
  }

  @Test
  public void getFixedLettersReturns200OkResponseWhenWordLengthIsSeven() throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/7/5").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.fixedLetters").isArray())
        .andExpect(jsonPath("$.wordLength").value(7));
  }
}
