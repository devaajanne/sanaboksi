package backend;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/** Integration test for loading the Spring Boot application context. */
@SpringBootTest
@Tag("integrationTest")
@ActiveProfiles("test")
class BackendApplicationTests {

  @Test
  void contextLoads() {}
}
