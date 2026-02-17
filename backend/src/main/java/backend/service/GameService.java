package backend.service;

import backend.domain.FixedLetter;
import backend.domain.Language;
import backend.domain.entities.Word;
import backend.dto.FixedLetterResponse;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class GameService {

  private final RepositoryService repositoryService;
  private final UtilityService utilityService;

  public GameService(RepositoryService repositoryService, UtilityService utilityService) {
    this.repositoryService = repositoryService;
    this.utilityService = utilityService;
  }

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
}
