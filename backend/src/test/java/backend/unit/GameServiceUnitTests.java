package backend.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import backend.domain.Language;
import backend.domain.entities.FinnishWord;
import backend.domain.entities.Word;
import backend.dto.FixedLetterResponse;
import backend.dto.GameGridRequest;
import backend.dto.ValidationResultResponse;
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

@Tag("unitTest")
public class GameServiceUnitTests {

  private RepositoryService mockRepositoryService;
  private UtilityService mockUtilityService;
  private GameService gameService;

  private final Language language = Language.FI;
  private final int wordLength = 5;
  private final int wordCount = 5;

  @BeforeEach
  public void setUpMockClasses() {
    mockRepositoryService = mock(RepositoryService.class);
    mockUtilityService = mock(UtilityService.class);
    gameService = new GameService(mockRepositoryService, mockUtilityService);
  }

  @Test
  public void
      getFixedLetterResponseShouldReturnAllWordsIfRequestedWordCountIsLargerThanWordsInRepository() {
    int wordRepositorySize = 20;
    when(mockRepositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
            language, wordLength))
        .thenReturn(wordRepositorySize);

    List<Word> mockWords = new ArrayList<>();
    for (int i = 0; i < wordRepositorySize; i++) {
      FinnishWord word = mock(FinnishWord.class);
      when(word.getWord()).thenReturn("abcde");
      mockWords.add(word);
    }
    // Allow any requested word count; only language and word length matter in this test
    // Fix: Use anyInt() for the third argument
    when(mockRepositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(
            eq(language), eq(wordLength), anyInt()))
        .thenAnswer(invocation -> mockWords);

    when(mockUtilityService.getRandomIndex(wordLength))
        .thenAnswer(
            invocation -> {
              int upperBound = invocation.getArgument(0);
              return new java.util.Random().nextInt(upperBound);
            });

    int requestedWordCount = 50; // More than available
    FixedLetterResponse fixedLetterResponse =
        gameService.getFixedLetterResponse(language, wordLength, requestedWordCount);

    assertEquals(wordRepositorySize, fixedLetterResponse.getFixedLetters().size());
    verify(mockRepositoryService)
        .getRepositoryCountForWordsWithCorrectLanguageAndLength(language, wordLength);
    verify(mockRepositoryService)
        .findRandomWordsWithCorrectLanguageLengthAndCount(eq(language), eq(wordLength), anyInt());
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionWhenRepositoryEmpty() {
    when(mockRepositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
            language, wordLength))
        .thenReturn(0);

    assertThrows(
        IllegalStateException.class,
        () -> gameService.getFixedLetterResponse(language, wordLength, wordCount));
    verify(mockRepositoryService)
        .getRepositoryCountForWordsWithCorrectLanguageAndLength(language, wordLength);
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionIfRequestedWordCountIsNegative() {
    assertThrows(
        IllegalArgumentException.class,
        () -> gameService.getFixedLetterResponse(language, wordLength, -5));
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionIfRequestedWordCountIsZero() {
    assertThrows(
        IllegalArgumentException.class,
        () -> gameService.getFixedLetterResponse(language, wordLength, 0));
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

    when(mockRepositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(
            language, wordLength, requestedWordCount))
        .thenAnswer(invocation -> mockWords);

    when(mockUtilityService.getRandomIndex(wordLength))
        .thenAnswer(
            invocation -> {
              int upperBound = invocation.getArgument(0);
              return new java.util.Random().nextInt(upperBound);
            });

    FixedLetterResponse fixedLetterResponse =
        gameService.getFixedLetterResponse(language, wordLength, requestedWordCount);

    assertEquals(requestedWordCount, fixedLetterResponse.getFixedLetters().size());
    verify(mockRepositoryService)
        .getRepositoryCountForWordsWithCorrectLanguageAndLength(language, wordLength);
    verify(mockRepositoryService)
        .findRandomWordsWithCorrectLanguageLengthAndCount(language, wordLength, requestedWordCount);
  }

  @Test
  public void getFixedLetterResponseShouldMatchTheIndexAndLetterInOriginalWord() {
    when(mockRepositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
            language, wordLength))
        .thenReturn(6);
    // Mock findAll to return a list of words with known content
    List<Word> mockWords = new ArrayList<>();
    FinnishWord word1 = mock(FinnishWord.class);
    when(word1.getWord()).thenReturn("hello");
    FinnishWord word2 = mock(FinnishWord.class);
    when(word2.getWord()).thenReturn("world");
    FinnishWord word3 = mock(FinnishWord.class);
    when(word3.getWord()).thenReturn("apple");
    FinnishWord word4 = mock(FinnishWord.class);
    when(word4.getWord()).thenReturn("clock");
    FinnishWord word5 = mock(FinnishWord.class);
    when(word5.getWord()).thenReturn("phone");
    FinnishWord word6 = mock(FinnishWord.class);
    when(word6.getWord()).thenReturn("cable");
    mockWords.add(word1);
    mockWords.add(word2);
    mockWords.add(word3);
    mockWords.add(word4);
    mockWords.add(word5);
    mockWords.add(word6);

    when(mockRepositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(
            language, wordLength, wordCount))
        .thenAnswer(invocation -> mockWords);

    when(mockUtilityService.getRandomIndex(wordLength))
        .thenReturn(2, 3, 1, 4, 0); // Returns character indices

    FixedLetterResponse fixedLetters =
        gameService.getFixedLetterResponse(language, wordLength, wordCount);

    // Verify first word "hello" at index 2 -> 'l'
    assertEquals(2, fixedLetters.getFixedLetters().get(0).getFixedIndex());
    assertEquals('l', fixedLetters.getFixedLetters().get(0).getFixedLetter());

    // Verify second word "world" at index 3 -> 'l'
    assertEquals(3, fixedLetters.getFixedLetters().get(1).getFixedIndex());
    assertEquals('l', fixedLetters.getFixedLetters().get(1).getFixedLetter());

    // Verify third word "apple" at index 1 -> 'p'
    assertEquals(1, fixedLetters.getFixedLetters().get(2).getFixedIndex());
    assertEquals('p', fixedLetters.getFixedLetters().get(2).getFixedLetter());

    // Verify fourth word "clock" at index 4 -> 'k'
    assertEquals(4, fixedLetters.getFixedLetters().get(3).getFixedIndex());
    assertEquals('k', fixedLetters.getFixedLetters().get(3).getFixedLetter());

    // Verify fifth word "phone" at index 0 -> 'p'
    assertEquals(0, fixedLetters.getFixedLetters().get(4).getFixedIndex());
    assertEquals('p', fixedLetters.getFixedLetters().get(4).getFixedLetter());

    verify(mockRepositoryService)
        .getRepositoryCountForWordsWithCorrectLanguageAndLength(language, wordLength);
    verify(mockRepositoryService)
        .findRandomWordsWithCorrectLanguageLengthAndCount(language, wordLength, wordCount);
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionIfWordLengthIsTooShort() {
    assertThrows(
        IllegalArgumentException.class,
        () -> gameService.getFixedLetterResponse(language, 4, wordCount));
  }

  @Test
  public void getFixedLetterResponseShouldThrowExceptionIfWordLengthIsTooLong() {
    assertThrows(
        IllegalArgumentException.class,
        () -> gameService.getFixedLetterResponse(language, 8, wordCount));
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
