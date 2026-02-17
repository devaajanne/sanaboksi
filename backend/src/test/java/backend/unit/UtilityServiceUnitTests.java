package backend.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import backend.service.UtilityService;
import org.junit.jupiter.api.Test;

public class UtilityServiceUnitTests {

  private final UtilityService utilityService = new UtilityService();

  @Test
  public void getRandomIntShouldReturnValueBetweenZeroAndExclusiveCount() {
    int randomInt;
    int count = 20;

    for (int i = 0; i < 1000; i++) {
      randomInt = utilityService.getRandomIndex(count);
      assertTrue(randomInt >= 0);
      assertTrue(randomInt < count);
    }
  }

  @Test
  public void getRandomIntShouldReturnErrorIfCountIsNegative() {
    int count = -1;
    String expectedExceptionMessage = "count must be non-negative.";

    IllegalArgumentException exception =
        assertThrows(IllegalArgumentException.class, () -> utilityService.getRandomIndex(count));

    assertEquals(expectedExceptionMessage, exception.getMessage());
  }

  @Test
  public void getRandomIntShouldReturnErrorIfCountIsZero() {
    int count = 0;
    String expectedExceptionMessage = "count must not be zero.";

    IllegalArgumentException exception =
        assertThrows(IllegalArgumentException.class, () -> utilityService.getRandomIndex(count));

    assertEquals(expectedExceptionMessage, exception.getMessage());
  }
}
