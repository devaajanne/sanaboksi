package backend.service;

import backend.domain.Language;
import backend.domain.entities.Word;
import backend.repository.FinnishWordRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 * Service class for accessing word repositories and performing operations such as retrieving random
 * words, counting words, and validating words based on language and word length.
 */
@Service
public class RepositoryService {

  private final FinnishWordRepository finnishWordRepository;

  public RepositoryService(FinnishWordRepository finnishWordRepository) {
    this.finnishWordRepository = finnishWordRepository;
  }

  /**
   * Retrieves a list of random words for the specified language, word length, and count.
   *
   * @param language the language of the words
   * @param wordLength the length of each word
   * @param wordCount the number of words to retrieve
   * @return a list of randomly selected words
   * @throws IllegalArgumentException if the requested language is not in language enums
   * @throws IllegalStateException if the repository is empty or unseeded for the given parameters
   */
  public List<? extends Word> findRandomWordsWithCorrectLanguageLengthAndCount(
      Language language, int wordLength, int wordCount) {
    List<? extends Word> wordList = new ArrayList<>();

    switch (language) {
      case Language.FI:
        wordList = finnishWordRepository.findRandomWordsByWordLengthAndCount(wordLength, wordCount);
        break;
      default:
        throw new IllegalArgumentException("Unknown language: " + language);
    }

    if (wordList == null || wordList.isEmpty()) {
      throw new IllegalStateException(
          "Word repository appears to be empty or unseeded for language "
              + language
              + " and word length "
              + wordLength);
    }

    return wordList;
  }

  /**
   * Returns the count of words in the repository for the specified language and word length.
   *
   * @param language the language of the words
   * @param wordLength the length of each word
   * @return the number of words available
   * @throws IllegalArgumentException if the requested language is not in language enums
   * @throws IllegalStateException if the repository is empty or unseeded for the given parameters
   */
  public int getRepositoryCountForWordsWithCorrectLanguageAndLength(
      Language language, int wordLength) {
    int wordCount;

    switch (language) {
      case Language.FI:
        wordCount = finnishWordRepository.countByWordLength(wordLength);
        break;
      default:
        throw new IllegalArgumentException("Unknown language: " + language);
    }

    if (wordCount == 0) {
      throw new IllegalStateException(
          "Word repository appears to be empty or unseeded for language "
              + language
              + " and word length "
              + wordLength);
    }

    return wordCount;
  }

  /**
   * Validates a list of words for the specified language.
   *
   * @param gameGridWords the list of words to validate
   * @param language the language of the words
   * @return a map of word indices to validation results (true if valid, false otherwise)
   * @throws IllegalArgumentException if the requested language is not in language enums
   */
  public Map<Integer, Boolean> validateWords(List<String> gameGridWords, Language language) {
    Map<Integer, Boolean> resultsMap = new HashMap<>();
    Boolean result;

    switch (language) {
      case Language.FI:
        for (int i = 0; i < gameGridWords.size(); i++) {
          result = finnishWordRepository.validateWord(gameGridWords.get(i));
          resultsMap.put(i, result);
        }
        break;
      default:
        throw new IllegalArgumentException("Unknown language: " + language);
    }

    return resultsMap;
  }
}
