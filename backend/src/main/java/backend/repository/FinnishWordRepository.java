package backend.repository;

import backend.domain.entities.FinnishWord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FinnishWordRepository extends JpaRepository<FinnishWord, Long> {
  @Query(
      value =
          "SELECT * FROM finnish_words WHERE LENGTH(word) = :wordLength ORDER BY RANDOM() LIMIT :wordCount",
      nativeQuery = true)
  List<FinnishWord> findRandomWordsByWordLengthAndCount(
      @Param("wordLength") int wordLength, @Param("wordCount") int wordCount);

  @Query(
      value = "SELECT COUNT(*) FROM finnish_words WHERE LENGTH(word) = :wordLength",
      nativeQuery = true)
  int countByWordLength(@Param("wordLength") int wordLength);
}
