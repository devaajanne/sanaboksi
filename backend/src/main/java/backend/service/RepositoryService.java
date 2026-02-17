package backend.service;

import backend.domain.Language;
import backend.domain.entities.Word;
import backend.repository.FinnishWordRepository;
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
    if (language == Language.FI) {
      return finnishWordRepository.findRandomWordsByWordLengthAndCount(wordLength, wordCount);
    }
    throw new RuntimeException("Unknown language: " + language);
  }

  public int getRepositoryCountForWordsWithCorrectLanguageAndLength(
      Language language, int wordLength) {
    if (language == Language.FI) {
      return finnishWordRepository.countByWordLength(wordLength);
    }
    throw new RuntimeException("Unknown language: " + language);
  }
}
