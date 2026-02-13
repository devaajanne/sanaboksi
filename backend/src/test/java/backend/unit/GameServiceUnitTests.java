package backend.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import backend.domain.Word;
import backend.dto.FixedLetterResponse;
import backend.repository.WordRepository;
import backend.service.GameService;
import backend.service.UtilityService;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class GameServiceUnitTests {

  private WordRepository mockRepository;
  private UtilityService mockUtilityService;

  @BeforeEach
  public void setUpMockClasses() {
    mockRepository = mock(WordRepository.class);
    mockUtilityService = mock(UtilityService.class);
  }

  @Test
  public void
      getRandomWordsShouldReturnAllWordsIfRequestedWordCountIsLargerThanWordsInRepository() {
    int wordRepositorySize = 20;
    when(mockRepository.count()).thenReturn((long) wordRepositorySize);

    List<Word> mockWords = new ArrayList<>();
    for (int i = 0; i < wordRepositorySize; i++) {
      Word word = mock(Word.class);
      when(word.getWord()).thenReturn("abcde");
      mockWords.add(word);
    }

    when(mockRepository.findAll()).thenReturn(mockWords);

    when(mockUtilityService.getRandomIndex(wordRepositorySize))
        .thenAnswer(
            invocation -> {
              int upperBound = invocation.getArgument(0);
              return new java.util.Random().nextInt(upperBound);
            });

    GameService gameService = new GameService(mockRepository, mockUtilityService);

    int repositorySize = (int) mockRepository.count();
    int requestedWordCount = 50;

    assertEquals(repositorySize, gameService.getRandomWords(requestedWordCount).size());
  }

  @Test
  public void getRandomWordsShouldThrowExceptionWhenRepositoryEmpty() {
    when(mockRepository.count()).thenReturn(0L);

    GameService gameService = new GameService(mockRepository, mockUtilityService);

    assertThrows(IllegalStateException.class, () -> gameService.getRandomWords(5));
  }

  @Test
  public void getRandomWordsShouldThrowExceptionIfRequestedWordCountIsNegative() {
    when(mockRepository.count()).thenReturn(5000L);

    GameService gameService = new GameService(mockRepository, mockUtilityService);

    assertThrows(IllegalArgumentException.class, () -> gameService.getRandomWords(-5));
  }

  @Test
  public void getFixedLettersFromRandomWordsShouldReturnTheCorrectAmountOfFixedLetters() {
    int wordRepositorySize = 5000;
    int letterCount = 5;

    when(mockRepository.count()).thenReturn((long) wordRepositorySize);

    // Mock findAll to return a list of words
    List<Word> mockWords = new ArrayList<>();
    for (int i = 0; i < wordRepositorySize; i++) {
      Word word = mock(Word.class);
      when(word.getWord()).thenReturn("abcde");
      mockWords.add(word);
    }
    when(mockRepository.findAll()).thenReturn(mockWords);

    // Mock getRandomInt for selecting words from repository
    when(mockUtilityService.getRandomIndex(wordRepositorySize))
        .thenAnswer(
            invocation -> {
              int upperBound = invocation.getArgument(0);
              return new java.util.Random().nextInt(upperBound);
            });

    // Mock getRandomInt for selecting random character index within each word
    when(mockUtilityService.getRandomIndex(letterCount))
        .thenAnswer(
            invocation -> {
              int upperBound = invocation.getArgument(0);
              return new java.util.Random().nextInt(upperBound);
            });

    GameService gameService = new GameService(mockRepository, mockUtilityService);

    List<FixedLetterResponse> fixedLetters =
        gameService.getFixedLettersFromRandomWords(letterCount);

    assertEquals(letterCount, fixedLetters.size());
  }

  @Test
  public void fixedLettersFromRandomWordsShouldMatchTheIndexAndLetterInOriginalWord() {
    int letterCount = 5;

    // Mock findAll to return a list of words with known content
    List<Word> mockWords = new ArrayList<>();
    Word word1 = mock(Word.class);
    when(word1.getWord()).thenReturn("hello");
    Word word2 = mock(Word.class);
    when(word2.getWord()).thenReturn("world");
    Word word3 = mock(Word.class);
    when(word3.getWord()).thenReturn("apple");
    Word word4 = mock(Word.class);
    when(word4.getWord()).thenReturn("clock");
    Word word5 = mock(Word.class);
    when(word5.getWord()).thenReturn("phone");
    Word word6 = mock(Word.class);
    when(word6.getWord()).thenReturn("cable");
    mockWords.add(word1);
    mockWords.add(word2);
    mockWords.add(word3);
    mockWords.add(word4);
    mockWords.add(word5);
    mockWords.add(word6);

    when(mockRepository.findAll()).thenReturn(mockWords);
    int wordRepositorySize = mockWords.size();
    when(mockRepository.count()).thenReturn((long) wordRepositorySize);

    when(mockUtilityService.getRandomIndex((int) wordRepositorySize))
        .thenReturn(0, 1, 2, 3, 4); // Returns indices for word selection

    when(mockUtilityService.getRandomIndex(letterCount))
        .thenReturn(2, 3, 1, 4, 0); // Returns character indices

    GameService gameService = new GameService(mockRepository, mockUtilityService);

    List<FixedLetterResponse> fixedLetters =
        gameService.getFixedLettersFromRandomWords(letterCount);

    // Verify first word "hello" at index 2 -> 'l'
    assertEquals(2, fixedLetters.get(0).getFixedIndex());
    assertEquals('l', fixedLetters.get(0).getFixedCharacter());

    // Verify second word "world" at index 3 -> 'l'
    assertEquals(3, fixedLetters.get(1).getFixedIndex());
    assertEquals('l', fixedLetters.get(1).getFixedCharacter());

    // Verify third word "apple" at index 1 -> 'p'
    assertEquals(1, fixedLetters.get(2).getFixedIndex());
    assertEquals('p', fixedLetters.get(2).getFixedCharacter());

    // Verify fourth word "clock" at index 4 -> 'k'
    assertEquals(4, fixedLetters.get(3).getFixedIndex());
    assertEquals('k', fixedLetters.get(3).getFixedCharacter());

    // Verify fifth word "phone" at index 0 -> 'p'
    assertEquals(0, fixedLetters.get(4).getFixedIndex());
    assertEquals('p', fixedLetters.get(4).getFixedCharacter());
  }
}
