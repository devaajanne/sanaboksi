package backend.service;

import backend.dto.GameGridRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.stereotype.Service;

@Service
public class UtilityService {

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
        if (cell == null) {
          throw new IllegalArgumentException(
              "Cell at row " + rowIndex + " with column index " + columnIndex + " cannot be null.");
        }
        stringBuilder.append(cell);
      }

      gameGridWords.add(stringBuilder.toString().toLowerCase());
      stringBuilder.setLength(0);
    }

    return gameGridWords;
  }
}
