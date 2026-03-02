package backend.repository;

import backend.domain.entities.FinnishWord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Repository interface for accessing Finnish words in the database. Provides methods for retrieving
 * random words, counting words by length, and validating word existence.
 */
public interface FinnishWordRepository extends JpaRepository<FinnishWord, Long> {
  /**
   * Retrieves a list of random Finnish words with the specified length.
   *
   * @param wordLength the length of each word
   * @param wordCount the number of words to retrieve
   * @return a list of randomly selected Finnish words
   */
  @Query(
      value =
          "SELECT * FROM finnish_words WHERE LENGTH(word) = :wordLength ORDER BY RANDOM() LIMIT :wordCount",
      nativeQuery = true)
  List<FinnishWord> findRandomWordsByWordLengthAndCount(
      @Param("wordLength") int wordLength, @Param("wordCount") int wordCount);

  /**
   * Returns the count of Finnish words with the specified length.
   *
   * @param wordLength the length of each word
   * @return the number of Finnish words with the given length
   */
  @Query(
      value = "SELECT COUNT(*) FROM finnish_words WHERE LENGTH(word) = :wordLength",
      nativeQuery = true)
  int countByWordLength(@Param("wordLength") int wordLength);

  /**
   * Validates whether a Finnish word exists in the repository (case-insensitive).
   *
   * @param word the word to validate
   * @return true if the word exists, false otherwise
   */
  @Query(
      value =
          "SELECT CASE WHEN EXISTS (SELECT 1 FROM finnish_words WHERE LOWER(word) = LOWER(:word)) THEN 1 ELSE 0 END",
      nativeQuery = true)
  Integer validateWord(@Param("word") String word);
}
