package backend.exception;

/** Exception thrown when a GitHub issue cannot be created. */
public class GitHubIssueNotCreatedException extends RuntimeException {

  /**
   * Creates an exception for a failed GitHub issue creation attempt.
   *
   * @param message the reason the GitHub issue could not be created
   */
  public GitHubIssueNotCreatedException(String message) {
    super(message);
  }

  /**
   * Creates an exception for a failed GitHub issue creation attempt with its underlying cause.
   *
   * @param message the reason the GitHub issue could not be created
   * @param cause the underlying exception
   */
  public GitHubIssueNotCreatedException(String message, Throwable cause) {
    super(message, cause);
  }
}
