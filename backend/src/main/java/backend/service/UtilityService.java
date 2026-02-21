package backend.service;

import backend.dto.GameGridRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.stereotype.Service;

/**
 * Service class providing utility methods for game logic, such as random index generation,
 * extracting words from a game grid, and counting duplicate words.
 */
@Service
public class UtilityService {

  /**
   * Returns a random index between 0 (inclusive) and count (exclusive).
   *
   * @param count the upper bound for the random index (must be positive)
   * @return a random integer between 0 and count-1
   * @throws IllegalArgumentException if count is negative or zero
   */
  public int getRandomIndex(int count) {
    if (count < 0) {
      throw new IllegalArgumentException("count must be non-negative.");
    }

    if (count == 0) {
      throw new IllegalArgumentException("count must not be zero.");
    }

    // Returns an int between 0 (inclusive) and count (exclusive)
    return ThreadLocalRandom.current().nextInt(count);
  }

  /**
   * Extracts words from the provided game grid request. Each row in the grid is concatenated to
   * form a word.
   *
   * @param gameGridRequest the request containing the game grid
   * @return a list of words extracted from the grid
   * @throws IllegalArgumentException if the request or grid is null/empty, or contains invalid
   *     cells
   */
  public List<String> getGameGridWords(GameGridRequest gameGridRequest) {
    if (gameGridRequest == null) {
      throw new IllegalArgumentException("GameGridRequest cannot be null.");
    }

    List<List<String>> gameGrid = gameGridRequest.getGameGrid();
    if (gameGrid == null || gameGrid.isEmpty()) {
      throw new IllegalArgumentException("Game grid cannot be null or empty.");
    }

    List<String> gameGridWords = new ArrayList<>();
    StringBuilder stringBuilder = new StringBuilder();

    for (int rowIndex = 0; rowIndex < gameGrid.size(); rowIndex++) {
      List<String> row = gameGrid.get(rowIndex);
      if (row == null || row.isEmpty()) {
        throw new IllegalArgumentException(
            "Row with index " + rowIndex + " in game grid cannot be null or empty.");
      }

      for (int columnIndex = 0; columnIndex < row.size(); columnIndex++) {
        String cell = row.get(columnIndex);
        if (cell == null || cell.equals("")) {
          throw new IllegalArgumentException(
              "Cell at row "
                  + rowIndex
                  + " with column index "
                  + columnIndex
                  + " cannot be null or empty.");
        }
        stringBuilder.append(cell);
      }

      gameGridWords.add(stringBuilder.toString().toLowerCase());
      stringBuilder.setLength(0);
    }

    return gameGridWords;
  }

  /**
   * Counts the occurrences of each word in the provided list.
   *
   * @param words the list of words to count
   * @return a map of words to their occurrence counts
   */
  public Map<String, Integer> countDuplicateWords(List<String> words) {
    Map<String, Integer> wordCountMap = new HashMap<>();
    for (String word : words) {
      wordCountMap.put(word, wordCountMap.getOrDefault(word, 0) + 1);
    }
    return wordCountMap;
  }
}
