package backend.integration;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Tag("integrationTest")
public class PlaceholderIntegrationTest {

  // A placeholder test to check that custom Gradle task runs
  @Test
  public void placeholderIntegrationTests() {
    assertTrue(true);
  }
}
