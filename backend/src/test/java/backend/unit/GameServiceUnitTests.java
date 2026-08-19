package backend.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import backend.domain.LanguageEnum;
import backend.domain.dto.FixedLetterResponse;
import backend.domain.dto.GameGridRequest;
import backend.domain.dto.ValidationResultResponse;
import backend.domain.entity.FinnishWord;
import backend.domain.entity.Word;
import backend.service.GameService;
import backend.service.RepositoryService;
import backend.service.UtilityService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

/** Unit tests for {@link GameService}. */
@Tag("unitTest")
@ActiveProfiles("test")
public class GameServiceUnitTests {

  private RepositoryService mockRepositoryService;
  private UtilityService mockUtilityService;
  private GameService gameService;

  private final LanguageEnum language = LanguageEnum.FI;
  private final int wordLength = 5;

  @BeforeEach
  public void setUpMockClasses() {
    mockRepositoryService = mock(RepositoryService.class);
    mockUtilityService = mock(UtilityService.class);
    gameService = new GameService(mockRepositoryService, mockUtilityService);
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionWhenRepositoryEmpty() {
    when(mockRepositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
            language, wordLength))
        .thenReturn(0);

    assertThrows(
        IllegalStateException.class,
        () -> gameService.getFixedLetterResponse(language, wordLength));
    verify(mockRepositoryService)
        .getRepositoryCountForWordsWithCorrectLanguageAndLength(language, wordLength);
  }

  @Test
  public void getFixedLetterResponseShouldReturnTheCorrectAmountOfFixedLetters() {
    int wordRepositorySize = 20;
    int wordLength = 5;
    int requestedWordCount = 5;

    when(mockRepositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
            language, wordLength))
        .thenReturn(wordRepositorySize);

    List<Word> mockWords = new ArrayList<>();
    for (int i = 0; i < requestedWordCount; i++) {
      Word word = mock(Word.class);
      when(word.getWord()).thenReturn("abcde");
      mockWords.add(word);
    }

    when(mockRepositoryService.findRandomWordsWithCorrectLanguageAndLength(language, wordLength))
        .thenAnswer(invocation -> mockWords);

    when(mockUtilityService.getRandomIndex(wordLength))
        .thenAnswer(
            invocation -> {
              int upperBound = invocation.getArgument(0);
              return new java.util.Random().nextInt(upperBound);
            });

    FixedLetterResponse fixedLetterResponse =
        gameService.getFixedLetterResponse(language, wordLength);

    assertEquals(requestedWordCount, fixedLetterResponse.getFixedLetters().size());
    verify(mockRepositoryService)
        .getRepositoryCountForWordsWithCorrectLanguageAndLength(language, wordLength);
    verify(mockRepositoryService).findRandomWordsWithCorrectLanguageAndLength(language, wordLength);
  }

  @Test
  public void getFixedLetterResponseShouldMatchTheIndexAndLetterInOriginalWord() {
    when(mockRepositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
            language, wordLength))
        .thenReturn(6);
    // Mock findAll to return a list of words with known content
    List<Word> mockWords = new ArrayList<>();
    FinnishWord word1 = mock(FinnishWord.class);
    when(word1.getWord()).thenReturn("vehnä");
    FinnishWord word2 = mock(FinnishWord.class);
    when(word2.getWord()).thenReturn("suola");
    FinnishWord word3 = mock(FinnishWord.class);
    when(word3.getWord()).thenReturn("maito");
    FinnishWord word4 = mock(FinnishWord.class);
    when(word4.getWord()).thenReturn("kahvi");
    FinnishWord word5 = mock(FinnishWord.class);
    when(word5.getWord()).thenReturn("kerma");
    FinnishWord word6 = mock(FinnishWord.class);
    when(word6.getWord()).thenReturn("jauho");
    mockWords.add(word1);
    mockWords.add(word2);
    mockWords.add(word3);
    mockWords.add(word4);
    mockWords.add(word5);
    mockWords.add(word6);

    when(mockRepositoryService.findRandomWordsWithCorrectLanguageAndLength(language, wordLength))
        .thenAnswer(invocation -> mockWords);

    when(mockUtilityService.getRandomIndex(wordLength))
        .thenReturn(2, 3, 1, 4, 0); // Returns character indices

    FixedLetterResponse fixedLetters = gameService.getFixedLetterResponse(language, wordLength);

    // Verify first word "vehnä" at index 2 -> 'h'
    assertEquals(2, fixedLetters.getFixedLetters().get(0).getFixedIndex());
    assertEquals('h', fixedLetters.getFixedLetters().get(0).getFixedLetter());

    // Verify second word "suola" at index 3 -> 'l'
    assertEquals(3, fixedLetters.getFixedLetters().get(1).getFixedIndex());
    assertEquals('l', fixedLetters.getFixedLetters().get(1).getFixedLetter());

    // Verify third word "maito" at index 1 -> 'a'
    assertEquals(1, fixedLetters.getFixedLetters().get(2).getFixedIndex());
    assertEquals('a', fixedLetters.getFixedLetters().get(2).getFixedLetter());

    // Verify fourth word "kahvi" at index 4 -> 'i'
    assertEquals(4, fixedLetters.getFixedLetters().get(3).getFixedIndex());
    assertEquals('i', fixedLetters.getFixedLetters().get(3).getFixedLetter());

    // Verify fifth word "kerma" at index 0 -> 'k'
    assertEquals(0, fixedLetters.getFixedLetters().get(4).getFixedIndex());
    assertEquals('k', fixedLetters.getFixedLetters().get(4).getFixedLetter());

    verify(mockRepositoryService)
        .getRepositoryCountForWordsWithCorrectLanguageAndLength(language, wordLength);
    verify(mockRepositoryService).findRandomWordsWithCorrectLanguageAndLength(language, wordLength);
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionIfWordLengthIsTooShort() {
    assertThrows(
        IllegalArgumentException.class, () -> gameService.getFixedLetterResponse(language, 3));
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionIfWordLengthIsTooLong() {
    assertThrows(
        IllegalArgumentException.class, () -> gameService.getFixedLetterResponse(language, 8));
  }

  @Test
  public void validateGameGridShouldReturnValidationResultResponse() {
    GameGridRequest mockRequest = mock(GameGridRequest.class);
    ValidationResultResponse mockResponse = mock(ValidationResultResponse.class);
    Map<Integer, Map<String, Boolean>> mockValidationResults = new HashMap<>();

    for (int i = 0; i < 5; i++) {
      Map<String, Boolean> resultMap = new HashMap<>();
      resultMap.put("duplicateWord", false);
      resultMap.put("correctWord", true);
      mockValidationResults.put(i, resultMap);
    }

    when(mockResponse.getValidationResults()).thenReturn(mockValidationResults);

    List<String> mockWords = List.of("vehnä", "suola", "maito", "kahvi", "kerma");
    Map<String, Integer> mockWordsCount =
        Map.of("vehnä", 1, "suola", 1, "maito", 1, "kahvi", 1, "kerma", 1);

    Map<Integer, Boolean> mockResultsMap = Map.of(0, true, 1, true, 2, true, 3, true, 4, true);

    when(mockUtilityService.getGameGridWords(mockRequest)).thenReturn(mockWords);
    when(mockUtilityService.countDuplicateWords(mockWords)).thenReturn(mockWordsCount);
    when(mockRepositoryService.validateWords(mockWords, language)).thenReturn(mockResultsMap);

    ValidationResultResponse response = gameService.validateGameGrid(mockRequest, language);

    assertEquals(mockResponse.getValidationResults(), response.getValidationResults());
    verify(mockUtilityService).getGameGridWords(mockRequest);
    verify(mockRepositoryService).validateWords(mockWords, language);
  }
}
