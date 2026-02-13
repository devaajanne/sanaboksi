package backend.service;

import java.util.concurrent.ThreadLocalRandom;
import org.springframework.stereotype.Service;

@Service
public class UtilityService {

  public int getRandomInt(int count) {
    if (count < 0) {
      throw new IllegalArgumentException("count must be non-negative.");
    }

    if (count == 0) {
      throw new IllegalArgumentException("count must not be zero.");
    }

    // Returns an int between 1 and count (inclusive)
    return ThreadLocalRandom.current().nextInt(1, count + 1);
  }
}
