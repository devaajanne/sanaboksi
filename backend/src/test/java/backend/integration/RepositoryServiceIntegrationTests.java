package backend.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import backend.domain.Language;
import backend.domain.entities.FinnishWord;
import backend.domain.entities.Word;
import backend.repository.FinnishWordRepository;
import backend.service.RepositoryService;
import jakarta.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/** Integration tests for {@link RepositoryService}. */
@SpringBootTest
@Tag("integrationTest")
@ActiveProfiles("test")
public class RepositoryServiceIntegrationTests {
  @Autowired private RepositoryService repositoryService;
  @Autowired private FinnishWordRepository finnishWordRepository;

  @Test
  public void findRandomWordsShouldReturnWordListWithCorrectAmountOfWords() {
    List<? extends Word> wordList =
        repositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(Language.FI, 5, 5);
    assertEquals(5, wordList.size());
  }

  @Test
  public void findRandomWordsShouldReturnWordListWithWordsOfCorrectLength() {
    List<? extends Word> wordList =
        repositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(Language.FI, 5, 5);

    for (int i = 0; i < wordList.size(); i++) {
      assertEquals(5, wordList.get(i).getWord().length());
    }
  }

  @Test
  public void findRandomWordsShouldThrowExceptionIfLanguageIsUnknown() {
    assertThrows(
        IllegalArgumentException.class,
        () ->
            repositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(
                Language.UNKNOWN, 5, 5));
  }

  @Test
  @Transactional
  public void findRandomWordsShouldThrowExceptionIfRepositoryForRequestedLanguageIsEmpty() {
    finnishWordRepository.deleteAll();
    assertEquals(0, finnishWordRepository.count());

    assertThrows(
        IllegalStateException.class,
        () ->
            repositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(Language.FI, 5, 5));
  }

  @Test
  @Transactional
  public void getRepositoryCountForWordsWithCorrectLanguageAndLengthShouldReturnCorrectWordCount() {
    finnishWordRepository.deleteAll();
    assertEquals(0, finnishWordRepository.count());
    finnishWordRepository.saveAll(
        Arrays.asList(
            new FinnishWord(null, "vehnä"),
            new FinnishWord(null, "suola"),
            new FinnishWord(null, "maito"),
            new FinnishWord(null, "kahvi"),
            new FinnishWord(null, "kerma")));

    int wordCount =
        repositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(Language.FI, 5);

    assertEquals(5, wordCount);
  }

  @Test
  public void
      getRepositoryCountForWordsWithCorrectLanguageAndLengthShouldThrowExceptionIfLanguageIsUnknown() {
    assertThrows(
        IllegalArgumentException.class,
        () ->
            repositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
                Language.UNKNOWN, 5));
  }

  @Test
  @Transactional
  public void
      getRepositoryCountForWordsWithCorrectLanguageAndLengthShouldThrowExceptionIfRepositoryForRequestedLanguageIsEmpty() {
    finnishWordRepository.deleteAll();
    assertEquals(0, finnishWordRepository.count());

    assertThrows(
        IllegalStateException.class,
        () ->
            repositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
                Language.FI, 5));
  }

  @Test
  public void validateWordsShouldReturnValidResponse() {
    List<String> gameGridWords = Arrays.asList("vehnä", "suola", "maito", "kahvi", "kerma");
    Map<Integer, Boolean> correctResponse = Map.of(0, true, 1, true, 2, true, 3, true, 4, true);

    assertEquals(correctResponse, repositoryService.validateWords(gameGridWords, Language.FI));
  }

  @Test
  public void validateWordsShouldThrowExceptionIfLanguageIsUnknown() {
    List<String> gameGridWords = Arrays.asList("vehnä", "suola", "maito", "kahvi", "kerma");
    assertThrows(
        IllegalArgumentException.class,
        () -> repositoryService.validateWords(gameGridWords, Language.UNKNOWN));
  }
}
