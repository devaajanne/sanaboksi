package backend.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

/**
 * Global exception handler for the application.
 *
 * <p>Handles common exceptions thrown by controllers and services, returning appropriate HTTP
 * status codes and error messages in the response body.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

  /**
   * Handles IllegalArgumentException thrown by controllers or services. Returns a JSON error
   * message and HTTP 400 Bad Request status.
   *
   * @param exception the IllegalArgumentException thrown
   * @return ResponseEntity containing error details and status 400
   */
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(
      IllegalArgumentException exception) {
    Map<String, Object> error = new HashMap<>();
    error.put("timeStamp", LocalDateTime.now());
    error.put("error", exception.getMessage());
    error.put("statusCode", HttpStatus.BAD_REQUEST.value());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  /**
   * Handles failures when converting path or query parameters to the required Java type.
   *
   * @param exception the parameter conversion exception
   * @return ResponseEntity containing error details and status 400
   */
  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<Map<String, Object>> handleMethodArgumentTypeMismatch(
      MethodArgumentTypeMismatchException exception) {
    Map<String, Object> error = new HashMap<>();
    error.put("timeStamp", LocalDateTime.now());
    error.put(
        "error",
        "Invalid value '"
            + exception.getValue()
            + "' for parameter '"
            + exception.getName()
            + "'.");
    error.put("statusCode", HttpStatus.BAD_REQUEST.value());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  /**
   * Handles IllegalStateException thrown by controllers or services. Returns a JSON error message
   * and HTTP 503 Service Unavailable status.
   *
   * @param exception the IllegalStateException thrown
   * @return ResponseEntity containing error details and status 503
   */
  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<Map<String, Object>> handleIllegalStateException(
      IllegalStateException exception) {
    Map<String, Object> error = new HashMap<>();
    error.put("timeStamp", LocalDateTime.now());
    error.put("error", exception.getMessage());
    error.put("statusCode", HttpStatus.SERVICE_UNAVAILABLE.value());
    return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(error);
  }
}
