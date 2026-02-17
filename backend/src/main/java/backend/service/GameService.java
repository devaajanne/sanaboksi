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

    int repositorySizeForLanguageAndWordLength =
        repositoryService.getRepositoryCountForWordsWithCorrectLength(language, wordLength);

    if (repositorySizeForLanguageAndWordLength == 0) {
      throw new IllegalStateException(
          "Repository is empty for language " + language + " and word length " + wordLength);
    }

    if (repositorySizeForLanguageAndWordLength < wordCount) {
      throw new IllegalStateException(
          "Not enough words in repository for language "
              + language
              + " and word length "
              + wordLength);
    }

    // Return the whole repository word count if the requested word count is larger than there are
    // words for correct language and word length in
    // the repository
    wordCount = Math.min(wordCount, repositorySizeForLanguageAndWordLength);

    List<? extends Word> randomWordList =
        repositoryService.findRandomWordsWithCorrectLengthCountAndLanguage(
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
