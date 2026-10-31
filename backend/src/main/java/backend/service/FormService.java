package backend.service;

import backend.domain.dto.FormRequest;
import backend.exception.GitHubIssueNotCreatedException;
import backend.util.Constants;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class FormService {

  private final HttpClient httpClient;
  private final ObjectMapper objectMapper;

  public FormService(HttpClient httpClient, ObjectMapper objectMapper) {
    this.httpClient = httpClient;
    this.objectMapper = objectMapper;
  }

  private static String GITHUB_TOKEN;
  private static String GITHUB_REPOSITORY_OWNER;
  private static String GITHUB_REPOSITORY_NAME;

  @Value("${github.token}")
  private void setGitHubToken(String name) {
    GITHUB_TOKEN = name;
  }

  @Value("${github.repository-owner}")
  private void setGitHubRepositoryOwner(String name) {
    GITHUB_REPOSITORY_OWNER = name;
  }

  @Value("${github.repository-name}")
  private void setGitHubRepositoryName(String name) {
    GITHUB_REPOSITORY_NAME = name;
  }

  private record GitHubIssue(String title, String body, String[] labels) {}

  public void createNewGitHubIssue(FormRequest formRequest) {
    try {
      final String GITHUB_URI =
          "https://api.github.com/repos/"
              + GITHUB_REPOSITORY_OWNER
              + "/"
              + GITHUB_REPOSITORY_NAME
              + "/issues";

      String issueBodyString = createIssueBodyString(formRequest);

      HttpRequest httpRequest =
          HttpRequest.newBuilder()
              .uri(URI.create(GITHUB_URI))
              .header("Accept", "application/vnd.github+json")
              .header("Authorization", "Bearer " + GITHUB_TOKEN)
              .header("X-GitHub-Api-Version", "2026-03-10")
              .header("Content-Type", "application/json")
              .POST(HttpRequest.BodyPublishers.ofString(issueBodyString))
              .build();

      HttpResponse<String> httpResponse =
          httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

      if (httpResponse.statusCode() >= 400) {
        String errorMessage = "Failed to create GitHub issue";
        throw new GitHubIssueNotCreatedException(errorMessage);
      }
    } catch (IOException e) {
      throw new GitHubIssueNotCreatedException("Failed to create GitHub issue", e);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
      throw new GitHubIssueNotCreatedException("GitHub issue creation was interrupted", e);
    }
  }

  private String createIssueBodyString(FormRequest formRequest) {
    StringBuilder sb = new StringBuilder();
    boolean isBugReport = Constants.BUG_REPORT.equals(formRequest.getFormFields().getFormType());
    String bodyDesription =
        Constants.BUG_REPORT.equals(formRequest.getFormFields().getFormType())
            ? "Bug description"
            : "Feedback";

    String title = formRequest.getFormFields().getFormTitle();

    sb.append(bodyDesription);
    sb.append(System.lineSeparator());
    sb.append(System.lineSeparator());
    sb.append(formRequest.getFormFields().getFormBody());
    if (Constants.BUG_REPORT.equals(formRequest.getFormFields().getFormType())) {
      sb.append(System.lineSeparator());
      sb.append(System.lineSeparator());
      sb.append("User device info:");
      sb.append(System.lineSeparator());
      sb.append("Device type: " + formRequest.getUserDeviceInfo().getDeviceType());
      sb.append(System.lineSeparator());
      sb.append("OS: " + formRequest.getUserDeviceInfo().getOs());
      sb.append(System.lineSeparator());
      sb.append("Browser: " + formRequest.getUserDeviceInfo().getBrowser());
      sb.append(System.lineSeparator());
      sb.append("Viewport height: " + formRequest.getUserDeviceInfo().getViewportHeight());
      sb.append(System.lineSeparator());
      sb.append("Viewport width: " + formRequest.getUserDeviceInfo().getViewportWidth());
    }
    String body = sb.toString();
    String label = isBugReport ? "bug" : "feedback";

    return objectMapper.writeValueAsString(new GitHubIssue(title, body, new String[] {label}));
  }
}
