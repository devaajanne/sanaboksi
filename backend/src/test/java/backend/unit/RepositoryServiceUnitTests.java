package backend.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import backend.domain.Language;
import backend.domain.entities.FinnishWord;
import backend.domain.entities.Word;
import backend.repository.FinnishWordRepository;
import backend.service.RepositoryService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

/** Unit tests for {@link RepositoryService}. */
@Tag("unitTest")
@ActiveProfiles("test")
public class RepositoryServiceUnitTests {

  private RepositoryService repositoryService;
  private FinnishWordRepository mockFinnishWordRepository;

  @BeforeEach
  public void setUpMockClasses() {
    mockFinnishWordRepository = mock(FinnishWordRepository.class);
    repositoryService = new RepositoryService("test", mockFinnishWordRepository);
  }

  @Test
  public void findRandomWordsWithCorrectLanguageLengthAndCountShouldReturnWords() {
    List<FinnishWord> mockWords = new ArrayList<>();
    mockWords.add(new FinnishWord(1L, "vehnä"));
    mockWords.add(new FinnishWord(2L, "maito"));

    when(mockFinnishWordRepository.findRandomWordsByWordLengthAndCount(5, 2)).thenReturn(mockWords);

    List<? extends Word> result =
        repositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(Language.FI, 5, 2);

    assertEquals(mockWords, result);
    verify(mockFinnishWordRepository).findRandomWordsByWordLengthAndCount(5, 2);
  }

  @Test
  public void
      findRandomWordsWithCorrectLanguageLengthAndCountShouldThrowExceptionIfLanguageIsUnknown() {

    assertThrows(
        RuntimeException.class,
        () ->
            repositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(
                Language.UNKNOWN, 5, 5));
  }

  @Test
  public void
      findRandomWordsWithCorrectLanguageLengthAndCountShouldThrowExceptionIfWordRepositoryIsNull() {
    when(mockFinnishWordRepository.findRandomWordsByWordLengthAndCount(5, 5)).thenReturn(null);

    assertThrows(
        IllegalStateException.class,
        () ->
            repositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(Language.FI, 5, 5));
    verify(mockFinnishWordRepository).findRandomWordsByWordLengthAndCount(5, 5);
  }

  @Test
  public void
      findRandomWordsWithCorrectLanguageLengthAndCountShouldThrowExceptionIfWordRepositoryIsEmpty() {
    when(mockFinnishWordRepository.findRandomWordsByWordLengthAndCount(5, 5))
        .thenReturn(Arrays.asList());

    assertThrows(
        IllegalStateException.class,
        () ->
            repositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(Language.FI, 5, 5));
    verify(mockFinnishWordRepository).findRandomWordsByWordLengthAndCount(5, 5);
  }

  @Test
  public void getRepositoryCountForWordsWithCorrectLanguageAndLengthShouldReturnCount() {
    when(mockFinnishWordRepository.countByWordLength(5)).thenReturn(42);

    int result =
        repositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(Language.FI, 5);

    assertEquals(42, result);
    verify(mockFinnishWordRepository).countByWordLength(5);
  }

  @Test
  public void
      getRepositoryCountForWordsWithCorrectLanguageAndLengthShouldThrowExceptionIfLanguageIsUnknown() {
    assertThrows(
        RuntimeException.class,
        () ->
            repositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
                Language.UNKNOWN, 5));
  }

  @Test
  public void
      getRepositoryCountForWordsWithCorrectLanguageAndLengthShouldThrowExceptionIfWordRepositoryIsEmpty() {
    when(mockFinnishWordRepository.countByWordLength(5)).thenReturn(0);

    assertThrows(
        IllegalStateException.class,
        () ->
            repositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
                Language.FI, 5));
    verify(mockFinnishWordRepository).countByWordLength(5);
  }

  @Test
  void validateWordsReturnsCorrectMap() {
    List<String> testWords = Arrays.asList("vehnä", "suola", "maito", "kahvi", "kerma");
    Map<Integer, Boolean> mockResultsMap = new HashMap<>();

    for (int i = 0; i < testWords.size(); i++) {
      mockResultsMap.put(i, true);
    }

    for (String word : testWords) {
      when(mockFinnishWordRepository.validateWord(word)).thenReturn(1);
    }

    Map<Integer, Boolean> result = repositoryService.validateWords(testWords, Language.FI);

    assertEquals(mockResultsMap, result);
    for (String word : testWords) {
      verify(mockFinnishWordRepository).validateWord(word);
    }
  }

  @Test
  public void validateWordsShouldThrowExceptionIfLanguageIsUnknown() {
    List<String> testWords = Arrays.asList("vehnä", "suola", "maito", "kahvi", "kerma");

    assertThrows(
        RuntimeException.class, () -> repositoryService.validateWords(testWords, Language.UNKNOWN));
  }
}
