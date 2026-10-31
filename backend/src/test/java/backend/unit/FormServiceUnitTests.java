package backend.unit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import backend.domain.dto.FormRequest;
import backend.domain.entity.FormFields;
import backend.domain.entity.UserDeviceInfo;
import backend.exception.GitHubIssueNotCreatedException;
import backend.service.FormService;
import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import tools.jackson.databind.ObjectMapper;

/** Unit tests for {@link FormService}. */
@Tag("unitTest")
public class FormServiceUnitTests {

  private HttpClient httpClient;
  private FormService formService;

  private FormRequest createFormRequest() {
    return new FormRequest(
        new FormFields("feedback", "Test title", "Test body"),
        new UserDeviceInfo("desktop", "OS", "Browser", 100, 200));
  }

  @BeforeEach
  public void setUpMockClasses() {
    httpClient = mock(HttpClient.class);
    formService = new FormService(httpClient, new ObjectMapper());
  }

  @Test
  public void createNewGitHubIssueShouldMapUnauthorizedResponseTo502Exception() throws Exception {
    @SuppressWarnings("unchecked")
    HttpResponse<String> response = mock(HttpResponse.class);
    when(response.statusCode()).thenReturn(401);
    when(httpClient.send(any(), any())).thenAnswer(invocation -> response);

    GitHubIssueNotCreatedException exception =
        assertThrows(
            GitHubIssueNotCreatedException.class,
            () -> formService.createNewGitHubIssue(createFormRequest()));

    assertEquals("Failed to create GitHub issue", exception.getMessage());
  }

  @Test
  public void createNewGitHubIssueShouldMapServerErrorResponseTo502Exception() throws Exception {
    @SuppressWarnings("unchecked")
    HttpResponse<String> response = mock(HttpResponse.class);
    when(response.statusCode()).thenReturn(500);
    when(httpClient.send(any(), any())).thenAnswer(invocation -> response);

    GitHubIssueNotCreatedException exception =
        assertThrows(
            GitHubIssueNotCreatedException.class,
            () -> formService.createNewGitHubIssue(createFormRequest()));

    assertEquals("Failed to create GitHub issue", exception.getMessage());
  }

  @Test
  public void createNewGitHubIssueShouldPropagateInterruptedStatus() throws Exception {
    when(httpClient.send(any(), any())).thenThrow(new InterruptedException());

    assertThrows(
        GitHubIssueNotCreatedException.class,
        () -> formService.createNewGitHubIssue(createFormRequest()));

    assertTrue(Thread.interrupted());
  }

  @Test
  public void createNewGitHubIssueShouldWrapHttpClientFailure() throws Exception {
    IOException cause = new IOException("connection failed");
    when(httpClient.send(any(), any())).thenThrow(cause);

    GitHubIssueNotCreatedException exception =
        assertThrows(
            GitHubIssueNotCreatedException.class,
            () -> formService.createNewGitHubIssue(createFormRequest()));

    assertEquals("Failed to create GitHub issue", exception.getMessage());
    assertEquals(cause, exception.getCause());
  }
}
