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
    String[][] gameGrid = gameGridRequest.getGameGrid();
    List<String> gameGridWords = new ArrayList<>();
    StringBuilder stringBuilder = new StringBuilder();

    for (int rowIndex = 0; rowIndex < gameGrid.length; rowIndex++) {
      for (int columnIndex = 0; columnIndex < gameGrid[rowIndex].length; columnIndex++) {
        stringBuilder.append(gameGrid[rowIndex][columnIndex]);
      }
      gameGridWords.add(stringBuilder.toString().toLowerCase());
      stringBuilder.setLength(0);
    }

    return gameGridWords;
  }
}
