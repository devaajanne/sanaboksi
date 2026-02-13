package backend.service;

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
}
