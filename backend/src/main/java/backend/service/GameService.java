package backend.service;

import backend.domain.Word;
import backend.dto.FixedLetterResponse;
import backend.repository.WordRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class GameService {

  private final WordRepository wordRepository;
  private final UtilityService utilityService;

  public GameService(WordRepository wordRepository, UtilityService utilityService) {
    this.wordRepository = wordRepository;
    this.utilityService = utilityService;
  }

  public List<Word> getRandomWords(int wordCount) {
    int repositorySize = (int) wordRepository.count();

    // Throw error if repository is empty
    if (repositorySize == 0) {
      throw new IllegalStateException("wordRepository is empty.");
    }

    // Throw error if requested word count is negative
    if (wordCount < 0) {
      throw new IllegalArgumentException("wordCount must be non-negative.");
    }

    // Get all words if request more words than there are words in the repository
    wordCount = Math.min(wordCount, repositorySize);

    List<Word> allWords = wordRepository.findAll();
    List<Word> randomWordList = new ArrayList<Word>();

    for (int i = 0; i < wordCount; i++) {
      int randomIndex =
          utilityService.getRandomInt(repositorySize)
              - 1; // -1 to convert random number between 1 and repositorySize to index starting at
      // 0
      randomWordList.add(allWords.get(randomIndex));
    }

    return randomWordList;
  }

  public List<FixedLetterResponse> getFixedLettersFromRandomWords(int wordCount) {
    List<Word> randomWordList = getRandomWords(wordCount);
    List<FixedLetterResponse> fixedLetters = new ArrayList<FixedLetterResponse>();
    int wordLength, randomIndex;

    for (Word word : randomWordList) {
      FixedLetterResponse fixedLetter = new FixedLetterResponse();
      wordLength = word.getWord().length();
      randomIndex =
          utilityService.getRandomInt(wordLength)
              - 1; // -1 to convert random number between 1 and wordLength to index starting at 0
      fixedLetter.setFixedIndex(randomIndex);
      fixedLetter.setFixedCharacter(word.getWord().charAt(randomIndex));
      fixedLetters.add(fixedLetter);
    }

    return fixedLetters;
  }
}
