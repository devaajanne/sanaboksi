package backend.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import backend.controller.GameController;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
public class GameControllerIntegrationTests {
  @Autowired private MockMvc mockMvc;

  @Container static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18.1");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Test
  public void getFixedLettersReturns200ResponseWhenRequestedWordLengthIsFive() throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/5/5").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.fixedLetters").isArray())
        .andExpect(jsonPath("$.wordLength").value(5));
  }

  @Test
  public void getFixedLettersReturns200ResponseWhenRequestedWordLengthIsSix() throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/6/5").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.fixedLetters").isArray())
        .andExpect(jsonPath("$.wordLength").value(6));
  }

  @Test
  public void getFixedLettersReturns200ResponseWhenRequestedWordLengthIsSeven() throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/7/5").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.fixedLetters").isArray())
        .andExpect(jsonPath("$.wordLength").value(7));
  }

  @Test
  public void getFixedLettersReturns400ResponseWhenRequestedWordLengthIsTooShort()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/2/5").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void getFixedLettersReturns400ResponseWhenRequestedWordLengthIsTooLong() throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/9/5").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void getFixedLettersReturns400ResponseWhenRequestedLanguageIsNotInLanguageEnums()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/JP/9/5").contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void validateWordReturns200ResponseForValidRequest() throws Exception {
    String requestBody =
        """
    {
      "gameGrid": [
        ["V", "E", "H", "N", "Ä"],
        ["S", "U", "O", "L", "A"],
        ["M", "A", "I", "T", "O"],
        ["K", "A", "H", "V", "I"],
        ["K", "E", "R", "M", "A"]
      ]
    }
    """;

    mockMvc
        .perform(
            post("/api/validation/FI").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isOk()); // HTTP 200
  }

  @Test
  public void validateWordReturns400ResponseForInvalidRequest() throws Exception {
    String requestBody =
        """
    {
      "gameGrid": [
        ["V", "E", "H", "N", "Ä"],
        ["S", "U", "O", "L", "A"],
        ["M", "A", "I", "T", "O"],
        ["K", "A", "H", "V", "I"],
        ["K", "E", "R", "M", ""]
      ]
    }
    """;

    mockMvc
        .perform(
            post("/api/validation/FI").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void validateWordReturns400ResponseWhenRequestedLanguageIsNotInLanguageEnums()
      throws Exception {
    String requestBody =
        """
    {
      "gameGrid": [
        ["V", "E", "H", "N", "Ä"],
        ["S", "U", "O", "L", "A"],
        ["M", "A", "I", "T", "O"],
        ["K", "A", "H", "V", "I"],
        ["K", "E", "R", "M", "A"]
      ]
    }
    """;

    mockMvc
        .perform(
            post("/api/validation/JP").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isBadRequest()); // HTTP 400
  }
}
