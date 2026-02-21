package backend.service;

import backend.domain.FixedLetter;
import backend.domain.Language;
import backend.domain.entities.Word;
import backend.dto.FixedLetterResponse;
import backend.dto.GameGridRequest;
import backend.dto.ValidationResultResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 * Service class providing game-related logic, including generating fixed letters for the game grid
 * and validating submitted game grids.
 */
@Service
public class GameService {

  private final RepositoryService repositoryService;
  private final UtilityService utilityService;

  public GameService(RepositoryService repositoryService, UtilityService utilityService) {
    this.repositoryService = repositoryService;
    this.utilityService = utilityService;
  }

  /**
   * Generates a {@link FixedLetterResponse} containing fixed letters for randomly selected words
   * based on language, word length, and word count.
   *
   * @param language the language for the game
   * @param wordLength the length of each word (must be 5-7)
   * @param wordCount the number of words in the grid (must be positive)
   * @return a {@link FixedLetterResponse} with fixed letters and word length
   * @throws IllegalArgumentException if wordCount is negative or zero, or wordLength is out of
   *     range
   * @throws IllegalStateException if no words are available for the specified language and length
   */
  public FixedLetterResponse getFixedLetterResponse(
      Language language, int wordLength, int wordCount) {

    // Throw error if requested word count is negative
    if (wordCount < 0) {
      throw new IllegalArgumentException("wordCount must be non-negative.");
    }

    // Throw error if requested word count is zero
    if (wordCount == 0) {
      throw new IllegalArgumentException("wordCount must be non-zero.");
    }

    // Throw error if requested word length is outside the supported range
    if (wordLength < 5 || wordLength > 7) {
      throw new IllegalArgumentException("wordLength must be 5-7.");
    }

    int repositorySizeForLanguageAndWordLength =
        repositoryService.getRepositoryCountForWordsWithCorrectLanguageAndLength(
            language, wordLength);

    if (repositorySizeForLanguageAndWordLength == 0) {
      throw new IllegalStateException(
          "Repository is empty for language " + language + " and word length " + wordLength);
    }

    // Return the whole repository word count if the requested word count is larger than there are
    // words for correct language and word length in
    // the repository
    wordCount = Math.min(wordCount, repositorySizeForLanguageAndWordLength);

    List<? extends Word> randomWordList =
        repositoryService.findRandomWordsWithCorrectLanguageLengthAndCount(
            language, wordLength, wordCount);

    FixedLetterResponse fixedLetterResponse = new FixedLetterResponse();
    List<FixedLetter> fixedLetters = new ArrayList<>();
    int randomIndex;

    for (Word word : randomWordList) {
      FixedLetter fixedLetter = new FixedLetter();
      randomIndex = utilityService.getRandomIndex(wordLength);
      fixedLetter.setFixedIndex(randomIndex);
      fixedLetter.setFixedLetter(word.getWord().charAt(randomIndex));
      fixedLetters.add(fixedLetter);
    }

    fixedLetterResponse.setFixedLetters(fixedLetters);
    fixedLetterResponse.setWordLength(wordLength);

    return fixedLetterResponse;
  }

  /**
   * Validates the submitted game grid for the specified language. Checks if words are correct and
   * identifies duplicates.
   *
   * @param gameGridRequest the request containing the game grid
   * @param language the language for validation
   * @return a {@link ValidationResultResponse} indicating validation results for each word
   */
  public ValidationResultResponse validateGameGrid(
      GameGridRequest gameGridRequest, Language language) {
    List<String> gameGridWords = utilityService.getGameGridWords(gameGridRequest);
    ValidationResultResponse validationResultResponse = new ValidationResultResponse();

    // Check for correct words
    Map<Integer, Boolean> correctWordMap = repositoryService.validateWords(gameGridWords, language);

    // Check for duplicates
    Map<String, Integer> wordCountMap = utilityService.countDuplicateWords(gameGridWords);

    // Build response
    Map<Integer, Map<String, Boolean>> validationResults = new HashMap<>();
    for (int i = 0; i < gameGridWords.size(); i++) {
      Map<String, Boolean> resultMap = new HashMap<>();
      resultMap.put("correctWord", correctWordMap.get(i));
      resultMap.put("duplicateWord", wordCountMap.get(gameGridWords.get(i)) > 1);
      validationResults.put(i, resultMap);
    }

    validationResultResponse.setValidationResults(validationResults);

    return validationResultResponse;
  }
}
