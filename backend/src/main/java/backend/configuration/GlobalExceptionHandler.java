package backend.configuration;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Global exception handler for the application.
 *
 * <p>Handles common exceptions thrown by controllers and services, returning appropriate HTTP
 * status codes and error messages in the response body.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

  /**
   * Handles IllegalArgumentException thrown by controllers or services. Returns a JSON error
   * message and HTTP 400 Bad Request status.
   *
   * @param exception the IllegalArgumentException thrown
   * @return ResponseEntity containing error details and status 400
   */
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, String>> handleIllegalArgumentException(
      IllegalArgumentException exception) {
    Map<String, String> error = new HashMap<>();
    error.put("error", exception.getMessage());
    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }

  /**
   * Handles IllegalStateException thrown by controllers or services. Returns a JSON error message
   * and HTTP 204 No Content status.
   *
   * @param exception the IllegalStateException thrown
   * @return ResponseEntity containing error details and status 204
   */
  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<Map<String, String>> handleIllegalStateException(
      IllegalStateException exception) {
    Map<String, String> error = new HashMap<>();
    error.put("error", exception.getMessage());
    return new ResponseEntity<>(error, HttpStatus.NO_CONTENT);
  }
}
