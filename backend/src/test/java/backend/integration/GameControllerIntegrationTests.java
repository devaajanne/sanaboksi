package backend.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import backend.controller.GameController;
import backend.repository.FinnishWordRepository;
import jakarta.transaction.Transactional;
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
  @Autowired private FinnishWordRepository finnishWordRepository;

  @Container static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18.1");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Test
  public void getFixedLettersShouldReturn200ResponseWhenRequestedWordLengthIsFive()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/5/5"))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.fixedLetters").isArray())
        .andExpect(jsonPath("$.wordLength").value(5));
  }

  @Test
  public void getFixedLettersShouldReturn200ResponseWhenRequestedWordLengthIsSix()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/6/5"))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.fixedLetters").isArray())
        .andExpect(jsonPath("$.wordLength").value(6));
  }

  @Test
  public void getFixedLettersShouldReturn200ResponseWhenRequestedWordLengthIsSeven()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/7/5"))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.fixedLetters").isArray())
        .andExpect(jsonPath("$.wordLength").value(7));
  }

  @Test
  public void getFixedLettersShouldReturn400ResponseForLowerCaseLanguagePathVariable()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/fi/5/5"))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void getFixedLettersShouldReturn400ResponseWhenRequestedWordLengthIsTooShort()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/2/5"))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void getFixedLettersShouldReturn400ResponseWhenRequestedWordLengthIsTooLong()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/9/5"))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void getFixedLettersShouldReturn400ResponseWhenRequestedLanguageIsNotInLanguageEnums()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/JP/9/5"))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void getFixedLettersShouldReturn400ResponseWhenRequestedLanguageIsNotProvidedInUpperCase()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/fi/9/5"))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void getFixedLettersShouldReturn400ResponseWhenRequestedWordLengthIsNotInteger()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/abc/5"))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void getFixedLettersShouldReturn400ResponseWhenRequestedWordCountIsNotInteger()
      throws Exception {
    mockMvc
        .perform(get("/api/fixed-letters/FI/5/abc"))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  @Transactional
  public void getFixedLettersShouldReturn503ResponseWhenRepositoryForRequestedLanguageIsEmpty()
      throws Exception {
    finnishWordRepository.deleteAll();
    assertEquals(0, finnishWordRepository.count());

    mockMvc
        .perform(get("/api/fixed-letters/FI/5/5"))
        .andExpect(status().isServiceUnavailable()); // HTTP 503
  }

  @Test
  public void getFixedLettersShouldReturn405ResponseForPOSTRequest() throws Exception {
    mockMvc
        .perform(post("/api/fixed-letters/FI/5/5"))
        .andExpect(status().isMethodNotAllowed()); // HTTP 405
  }

  @Test
  public void getFixedLettersShouldReturn405ResponseForPUTRequest() throws Exception {
    mockMvc
        .perform(put("/api/fixed-letters/FI/5/5"))
        .andExpect(status().isMethodNotAllowed()); // HTTP 405
  }

  @Test
  public void getFixedLettersShouldReturn405ResponseForPATCHRequest() throws Exception {
    mockMvc
        .perform(patch("/api/fixed-letters/FI/5/5"))
        .andExpect(status().isMethodNotAllowed()); // HTTP 405
  }

  @Test
  public void getFixedLettersShouldReturn405ResponseForDELETERequest() throws Exception {
    mockMvc
        .perform(delete("/api/fixed-letters/FI/5/5"))
        .andExpect(status().isMethodNotAllowed()); // HTTP 405
  }

  @Test
  public void validateGameGridShouldReturn200ResponseForValidRequest() throws Exception {
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
  public void validateGameGridShouldReturn200ResponseForValidRequestWhenAllWordsAreCorrect()
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
            post("/api/validation/FI").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.validationResults").isMap())
        .andExpect(jsonPath("$.validationResults.0.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.0.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.1.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.1.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.2.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.2.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.3.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.3.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.4.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.4.duplicateWord").value(false));
  }

  @Test
  public void validateGameGridShouldReturn200ResponseForValidRequestWhenWordsHaveDuplicates()
      throws Exception {
    String requestBody =
        """
    {
      "gameGrid": [
        ["V", "E", "H", "N", "Ä"],
        ["V", "E", "H", "N", "Ä"],
        ["M", "A", "I", "T", "O"],
        ["K", "A", "H", "V", "I"],
        ["K", "E", "R", "M", "A"]
      ]
    }
    """;

    mockMvc
        .perform(
            post("/api/validation/FI").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.validationResults").isMap())
        .andExpect(jsonPath("$.validationResults.0.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.0.duplicateWord").value(true))
        .andExpect(jsonPath("$.validationResults.1.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.1.duplicateWord").value(true))
        .andExpect(jsonPath("$.validationResults.2.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.2.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.3.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.3.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.4.correctWord").value(true))
        .andExpect(jsonPath("$.validationResults.4.duplicateWord").value(false));
  }

  @Test
  public void validateGameGridShouldReturn200ResponseForValidRequestWhenWordsAreIncorrect()
      throws Exception {
    String requestBody =
        """
    {
      "gameGrid": [
        ["A", "E", "H", "N", "Ä"],
        ["A", "E", "H", "J", "E"],
        ["A", "I", "I", "L", "I"],
        ["A", "I", "E", "L", "I"],
        ["A", "E", "N", "K", "Ä"]
      ]
    }
    """;

    mockMvc
        .perform(
            post("/api/validation/FI").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isOk()) // HTTP 200
        .andExpect(jsonPath("$.validationResults").isMap())
        .andExpect(jsonPath("$.validationResults.0.correctWord").value(false))
        .andExpect(jsonPath("$.validationResults.0.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.1.correctWord").value(false))
        .andExpect(jsonPath("$.validationResults.1.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.2.correctWord").value(false))
        .andExpect(jsonPath("$.validationResults.2.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.3.correctWord").value(false))
        .andExpect(jsonPath("$.validationResults.3.duplicateWord").value(false))
        .andExpect(jsonPath("$.validationResults.4.correctWord").value(false))
        .andExpect(jsonPath("$.validationResults.4.duplicateWord").value(false));
  }

  @Test
  public void validateGameGridShouldReturn400ResponseForLowerCaseLanguagePathVariable()
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
            post("/api/validation/fi").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void validateGameGridShouldReturn400ResponseForInvalidRequesWhenGameGridIsNotFull()
      throws Exception {
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
  public void validateGameGridShouldReturn400ResponseWhenRequestedLanguageIsNotInLanguageEnums()
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

  @Test
  public void validateGameGridsShouldReturn400WhenNoRequestBodyIsProvided() throws Exception {
    mockMvc.perform(post("/api/validation/FI")).andExpect(status().isBadRequest()); // HTTP 400
  }

  @Test
  public void validateGameGridsShouldReturn415WhenContentTypeHeaderIsMissing() throws Exception {
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
        .perform(post("/api/validation/FI").content(requestBody))
        .andExpect(status().isUnsupportedMediaType()); // HTTP 415
  }

  @Test
  public void validateGameGridsShouldReturn405ResponseForGETRequest() throws Exception {
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
            get("/api/validation/FI").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isMethodNotAllowed()); // HTTP 405
  }

  @Test
  public void validateGameGridsShouldReturn405ResponseForPUTRequest() throws Exception {
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
            put("/api/validation/FI").contentType(MediaType.APPLICATION_JSON).content(requestBody))
        .andExpect(status().isMethodNotAllowed()); // HTTP 405
  }

  @Test
  public void validateGameGridsShouldReturn405ResponseForPATCHRequest() throws Exception {
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
            patch("/api/validation/FI")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
        .andExpect(status().isMethodNotAllowed()); // HTTP 405
  }

  @Test
  public void validateGameGridsShouldReturn405ResponseForDELETERequest() throws Exception {
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
            delete("/api/validation/FI")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
        .andExpect(status().isMethodNotAllowed()); // HTTP 405
  }
}
