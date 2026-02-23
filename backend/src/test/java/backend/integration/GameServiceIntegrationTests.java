package backend.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import backend.domain.Language;
import backend.domain.entities.FinnishWord;
import backend.dto.FixedLetterResponse;
import backend.dto.GameGridRequest;
import backend.dto.ValidationResultResponse;
import backend.repository.FinnishWordRepository;
import backend.service.GameService;
import jakarta.transaction.Transactional;
import java.util.Arrays;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

/** Integration tests for {@link GameService}. */
@SpringBootTest
@Testcontainers
@Tag("integrationTest")
public class GameServiceIntegrationTests {
  @Autowired private GameService gameService;
  @Autowired private FinnishWordRepository finnishWordRepository;

  @Container static PostgreSQLContainer postgres = new PostgreSQLContainer("postgres:18.1");

  @DynamicPropertySource
  static void configureProperties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgres::getJdbcUrl);
    registry.add("spring.datasource.username", postgres::getUsername);
    registry.add("spring.datasource.password", postgres::getPassword);
  }

  @Test
  public void getFixedLetterResponseShouldReturnValidResponse() {
    FixedLetterResponse response = gameService.getFixedLetterResponse(Language.FI, 5, 5);
    assertEquals(5, response.getFixedLetters().size());
    assertEquals(5, response.getWordLength());
  }

  @Test
  @Transactional
  public void getFixedLetterResponseShouldReturnAllAvailableWordsIfRequestedMoreThanExist() {
    finnishWordRepository.deleteAll();
    assertEquals(0, finnishWordRepository.count());
    finnishWordRepository.saveAll(
        Arrays.asList(
            new FinnishWord(null, "vehnä"),
            new FinnishWord(null, "suola"),
            new FinnishWord(null, "maito")));

    FixedLetterResponse response = gameService.getFixedLetterResponse(Language.FI, 5, 10);

    assertEquals(3, response.getFixedLetters().size());
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionWhenWordCountIsNegative() {
    assertThrows(
        IllegalArgumentException.class,
        () -> gameService.getFixedLetterResponse(Language.FI, 5, -5));
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionWhenWordCountIsZero() {
    assertThrows(
        IllegalArgumentException.class,
        () -> gameService.getFixedLetterResponse(Language.FI, 5, 0));
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionWhenWordLengthIsTooShort() {
    assertThrows(
        IllegalArgumentException.class,
        () -> gameService.getFixedLetterResponse(Language.FI, 4, 5));
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionWhenWordLengthIsTooLong() {
    assertThrows(
        IllegalArgumentException.class,
        () -> gameService.getFixedLetterResponse(Language.FI, 8, 5));
  }

  @Test
  @Transactional
  public void
      getFixedLetterResponseShouldThrowExceptionWhenRepositoryForRequestedLanguageIsEmpty() {
    finnishWordRepository.deleteAll();
    assertEquals(0, finnishWordRepository.count());

    assertThrows(
        IllegalStateException.class, () -> gameService.getFixedLetterResponse(Language.FI, 5, 5));
  }

  @Test
  public void validateGameGridShouldReturnValidResponseWhenAllWordsAreCorrect() {
    GameGridRequest gameGridRequest = new GameGridRequest();
    gameGridRequest.setGameGrid(
        Arrays.asList(
            Arrays.asList("V", "E", "H", "N", "Ä"), // correct
            Arrays.asList("S", "U", "O", "L", "A"), // correct
            Arrays.asList("M", "A", "I", "T", "O"), // correct
            Arrays.asList("K", "A", "H", "V", "I"), // correct
            Arrays.asList("K", "E", "R", "M", "A"))); // correct

    ValidationResultResponse validationResultResponse =
        gameService.validateGameGrid(gameGridRequest, Language.FI);

    for (int i = 0; i < gameGridRequest.getGameGrid().size(); i++) {
      assertTrue(validationResultResponse.getValidationResults().get(i).get("correctWord"));
    }
  }

  @Test
  public void validateGameGridShouldReturnValidResponseWhenWordsHaveDuplicates() {
    GameGridRequest gameGridRequest = new GameGridRequest();
    gameGridRequest.setGameGrid(
        Arrays.asList(
            Arrays.asList("V", "E", "H", "N", "Ä"), // duplicate
            Arrays.asList("V", "E", "H", "N", "Ä"), // duplicate
            Arrays.asList("V", "E", "H", "N", "Ä"), // duplicate
            Arrays.asList("V", "E", "H", "N", "Ä"), // duplicate
            Arrays.asList("V", "E", "H", "N", "Ä"))); // duplicate

    ValidationResultResponse validationResultResponse =
        gameService.validateGameGrid(gameGridRequest, Language.FI);

    for (int i = 0; i < gameGridRequest.getGameGrid().size(); i++) {
      assertTrue(validationResultResponse.getValidationResults().get(i).get("duplicateWord"));
    }
  }

  @Test
  public void validateGameGridShouldReturnValidResponseWhenWordsAreIncorrect() {
    GameGridRequest gameGridRequest = new GameGridRequest();
    gameGridRequest.setGameGrid(
        Arrays.asList(
            Arrays.asList("A", "E", "H", "N", "Ä"), // incorrect
            Arrays.asList("A", "U", "O", "L", "A"), // incorrect
            Arrays.asList("A", "A", "I", "T", "O"), // incorrect
            Arrays.asList("A", "A", "H", "V", "I"), // incorrect
            Arrays.asList("A", "E", "R", "M", "A"))); // incorrect

    ValidationResultResponse validationResultResponse =
        gameService.validateGameGrid(gameGridRequest, Language.FI);

    for (int i = 0; i < gameGridRequest.getGameGrid().size(); i++) {
      assertFalse(validationResultResponse.getValidationResults().get(i).get("correctWord"));
    }
  }

  @Test
  public void validateGameGridShouldReturnValidResponseWhenSomeWordsAreCorrectAndSomeIncorrect() {
    GameGridRequest gameGridRequest = new GameGridRequest();
    gameGridRequest.setGameGrid(
        Arrays.asList(
            Arrays.asList("V", "E", "H", "N", "Ä"), // correct
            Arrays.asList("A", "U", "O", "L", "A"), // incorrect
            Arrays.asList("M", "A", "I", "T", "O"), // correct
            Arrays.asList("A", "A", "H", "V", "I"), // incorrect
            Arrays.asList("K", "E", "R", "M", "A"))); // correct

    ValidationResultResponse validationResultResponse =
        gameService.validateGameGrid(gameGridRequest, Language.FI);

    assertTrue(validationResultResponse.getValidationResults().get(0).get("correctWord"));
    assertFalse(validationResultResponse.getValidationResults().get(1).get("correctWord"));
    assertTrue(validationResultResponse.getValidationResults().get(2).get("correctWord"));
    assertFalse(validationResultResponse.getValidationResults().get(3).get("correctWord"));
    assertTrue(validationResultResponse.getValidationResults().get(4).get("correctWord"));
  }

  @Test
  public void
      validateGameGridShouldReturnValidResponseWhenSomeWordsAreCorrectSomeIncorrectAndSomeDuplicates() {
    GameGridRequest gameGridRequest = new GameGridRequest();
    gameGridRequest.setGameGrid(
        Arrays.asList(
            Arrays.asList("V", "E", "H", "N", "Ä"), // correct, duplicate
            Arrays.asList("A", "U", "O", "L", "A"), // incorrect
            Arrays.asList("V", "E", "H", "N", "Ä"), // correct, duplicate
            Arrays.asList("A", "A", "H", "V", "I"), // incorrect
            Arrays.asList("K", "E", "R", "M", "A"))); // correct

    ValidationResultResponse validationResultResponse =
        gameService.validateGameGrid(gameGridRequest, Language.FI);

    assertTrue(validationResultResponse.getValidationResults().get(0).get("correctWord"));
    assertTrue(validationResultResponse.getValidationResults().get(0).get("duplicateWord"));

    assertFalse(validationResultResponse.getValidationResults().get(1).get("correctWord"));
    assertFalse(validationResultResponse.getValidationResults().get(1).get("duplicateWord"));

    assertTrue(validationResultResponse.getValidationResults().get(2).get("correctWord"));
    assertTrue(validationResultResponse.getValidationResults().get(2).get("duplicateWord"));

    assertFalse(validationResultResponse.getValidationResults().get(3).get("correctWord"));
    assertFalse(validationResultResponse.getValidationResults().get(3).get("duplicateWord"));

    assertTrue(validationResultResponse.getValidationResults().get(4).get("correctWord"));
    assertFalse(validationResultResponse.getValidationResults().get(4).get("duplicateWord"));
  }

  @Test
  public void validateGameGridShouldReturnValidResponseWhenGameGridIsNotFull() {
    GameGridRequest gameGridRequest = new GameGridRequest();
    gameGridRequest.setGameGrid(
        Arrays.asList(
            Arrays.asList("A", "E", "H", "N", "Ä"),
            Arrays.asList("A", "E", "L", "J", "Ä"),
            Arrays.asList("A", "I", "I", "L", "I"),
            Arrays.asList("A", "I", "E", "L", "I"),
            Arrays.asList("A", "E", "N", "K", "")));

    assertThrows(
        IllegalArgumentException.class,
        () -> gameService.validateGameGrid(gameGridRequest, Language.FI));
  }
}
