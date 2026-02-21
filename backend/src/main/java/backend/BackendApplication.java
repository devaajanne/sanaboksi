package backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/** Main class for the backend Spring Boot application. Starts the application context. */
@SpringBootApplication
public class BackendApplication {

  /**
   * Entry point for the Spring Boot application.
   *
   * @param args command-line arguments
   */
  public static void main(String[] args) {
    SpringApplication.run(BackendApplication.class, args);
  }
}
