package backend.service;

import backend.domain.Language;
import backend.domain.entities.Word;
import backend.dto.ValidationResultResponse;
import backend.repository.FinnishWordRepository;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RepositoryService {

  private final FinnishWordRepository finnishWordRepository;

  public RepositoryService(FinnishWordRepository finnishWordRepository) {
    this.finnishWordRepository = finnishWordRepository;
  }

  public List<? extends Word> findRandomWordsWithCorrectLanguageLengthAndCount(
      Language language, int wordLength, int wordCount) {
    List<? extends Word> wordList = new ArrayList<>();

    switch (language) {
      case Language.FI:
        wordList = finnishWordRepository.findRandomWordsByWordLengthAndCount(wordLength, wordCount);
        break;
      default:
        throw new RuntimeException("Unknown language: " + language);
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

  public int getRepositoryCountForWordsWithCorrectLanguageAndLength(
      Language language, int wordLength) {
    int wordCount;

    switch (language) {
      case Language.FI:
        wordCount = finnishWordRepository.countByWordLength(wordLength);
        break;
      default:
        throw new RuntimeException("Unknown language: " + language);
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

  public ValidationResultResponse validateWords(List<String> gameGridWords, Language language) {
    ValidationResultResponse validationResultResponse = new ValidationResultResponse();
    HashMap<Integer, Boolean> resultsMap = new HashMap<>();
    Boolean result;

    switch (language) {
      case Language.FI:
        for (int i = 0; i < gameGridWords.size(); i++) {
          result = finnishWordRepository.validateWord(gameGridWords.get(i));
          resultsMap.put(i, result);
        }
        break;
      default:
        throw new RuntimeException("Unknown language: " + language);
    }

    validationResultResponse.setValidationResults(resultsMap);

    return validationResultResponse;
  }
}
