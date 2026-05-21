package backend.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import backend.dto.GameGridRequest;
import backend.service.UtilityService;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

/** Unit tests for {@link UtilityService}. */
@Tag("unitTest")
@ActiveProfiles("test")
public class UtilityServiceUnitTests {

  private final UtilityService utilityService = new UtilityService();

  @Test
  public void getRandomIndexShouldReturnValueBetweenZeroAndExclusiveCount() {
    int randomInt;
    int count = 20;

    for (int i = 0; i < 1000; i++) {
      randomInt = utilityService.getRandomIndex(count);
      assertTrue(randomInt >= 0);
      assertTrue(randomInt < count);
    }
  }

  @Test
  public void getRandomIndexShouldReturnErrorIfCountIsNegative() {
    int count = -1;
    String expectedExceptionMessage = "count must be non-negative.";

    IllegalArgumentException exception =
        assertThrows(IllegalArgumentException.class, () -> utilityService.getRandomIndex(count));

    assertEquals(expectedExceptionMessage, exception.getMessage());
  }

  @Test
  public void getRandomIndexShouldReturnErrorIfCountIsZero() {
    int count = 0;
    String expectedExceptionMessage = "count must not be zero.";

    IllegalArgumentException exception =
        assertThrows(IllegalArgumentException.class, () -> utilityService.getRandomIndex(count));

    assertEquals(expectedExceptionMessage, exception.getMessage());
  }

  @Test
  public void getGameGridWordsShouldReturnCorrectWords() {
    List<String> testWords = Arrays.asList("vehnä", "suola", "maito", "kahvi", "kerma");
    List<List<String>> testGrid =
        Arrays.asList(
            Arrays.asList("V", "E", "H", "N", "Ä"),
            Arrays.asList("S", "U", "O", "L", "A"),
            Arrays.asList("M", "A", "I", "T", "O"),
            Arrays.asList("K", "A", "H", "V", "I"),
            Arrays.asList("K", "E", "R", "M", "A"));

    GameGridRequest testRequest = new GameGridRequest(testGrid);
    assertEquals(testWords, utilityService.getGameGridWords(testRequest));
  }

  @Test
  public void getGameGridWordsShouldThrowExceptionIfGameGridRequestIsNull() {
    assertThrows(IllegalArgumentException.class, () -> utilityService.getGameGridWords(null));
  }

  @Test
  public void getGameGridWordsShouldThrowExceptionIfGameGridIsNull() {
    GameGridRequest testRequest = new GameGridRequest(null);
    assertThrows(
        IllegalArgumentException.class, () -> utilityService.getGameGridWords(testRequest));
  }

  @Test
  public void getGameGridWordsShouldThrowExceptionIfGameGridIsEmpty() {
    GameGridRequest testRequest = new GameGridRequest(Arrays.asList());
    assertThrows(
        IllegalArgumentException.class, () -> utilityService.getGameGridWords(testRequest));
  }

  @Test
  public void getGameGridWordsShouldThrowExceptionIfGameGridRowIsNull() {
    GameGridRequest testRequest =
        new GameGridRequest(
            Arrays.asList(
                Arrays.asList("V", "E", "H", "N", "Ä"),
                Arrays.asList("S", "U", "O", "L", "A"),
                Arrays.asList("M", "A", "I", "T", "O"),
                Arrays.asList("K", "A", "H", "V", "I"),
                null));
    assertThrows(
        IllegalArgumentException.class, () -> utilityService.getGameGridWords(testRequest));
  }

  @Test
  public void getGameGridWordsShouldThrowExceptionIfGameGridRowIsEmpty() {
    GameGridRequest testRequest =
        new GameGridRequest(
            Arrays.asList(
                Arrays.asList("V", "E", "H", "N", "Ä"),
                Arrays.asList("S", "U", "O", "L", "A"),
                Arrays.asList("M", "A", "I", "T", "O"),
                Arrays.asList("K", "A", "H", "V", "I"),
                Arrays.asList()));
    assertThrows(
        IllegalArgumentException.class, () -> utilityService.getGameGridWords(testRequest));
  }

  @Test
  public void getGameGridWordsShouldThrowExceptionIfGameGridCellIsNull() {
    GameGridRequest testRequest =
        new GameGridRequest(
            Arrays.asList(
                Arrays.asList("V", "E", "H", "N", "Ä"),
                Arrays.asList("S", "U", "O", "L", "A"),
                Arrays.asList("M", "A", "I", "T", "O"),
                Arrays.asList("K", "A", "H", "V", "I"),
                Arrays.asList("K", "E", "R", "M", null)));
    assertThrows(
        IllegalArgumentException.class, () -> utilityService.getGameGridWords(testRequest));
  }

  @Test
  public void getGameGridWordsShouldThrowExceptionIfGameGridCellIsEmpty() {
    GameGridRequest testRequest =
        new GameGridRequest(
            Arrays.asList(
                Arrays.asList("V", "E", "H", "N", "Ä"),
                Arrays.asList("S", "U", "O", "L", "A"),
                Arrays.asList("M", "A", "I", "T", "O"),
                Arrays.asList("K", "A", "H", "V", "I"),
                Arrays.asList("K", "E", "R", "M", "")));
    assertThrows(
        IllegalArgumentException.class, () -> utilityService.getGameGridWords(testRequest));
  }

  @Test
  public void countDuplicateWordsCountDuplicateWordsCorrectlyWhenNoDuplicatesArePresent() {
    List<String> testWords = Arrays.asList("vehnä", "suola", "maito", "kahvi", "kerma");

    Map<String, Integer> mockResultMap =
        Map.of(
            "vehnä", 1,
            "suola", 1,
            "maito", 1,
            "kahvi", 1,
            "kerma", 1);

    Map<String, Integer> resultMap = utilityService.countDuplicateWords(testWords);

    assertEquals(mockResultMap, resultMap);
  }

  @Test
  public void countDuplicateWordsCountDuplicateWordsCorrectlyWhenOneDuplicateIsPresent() {
    List<String> testWords = Arrays.asList("vehnä", "vehnä", "maito", "kahvi", "kerma");
    Map<String, Integer> mockResultMap =
        Map.of(
            "vehnä", 2,
            "maito", 1,
            "kahvi", 1,
            "kerma", 1);

    Map<String, Integer> resultMap = utilityService.countDuplicateWords(testWords);

    assertEquals(mockResultMap, resultMap);
  }

  @Test
  public void countDuplicateWordsCountDuplicateWordsCorrectlyWhenAllWordsAreDuplicates() {
    List<String> testWords = Arrays.asList("vehnä", "vehnä", "vehnä", "vehnä", "vehnä");

    Map<String, Integer> mockResultMap = Map.of("vehnä", 5);

    Map<String, Integer> resultMap = utilityService.countDuplicateWords(testWords);

    assertEquals(mockResultMap, resultMap);
  }
}
