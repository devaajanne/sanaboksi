package backend.integration;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import backend.domain.dto.FormRequest;
import backend.domain.entity.FormFields;
import backend.domain.entity.UserDeviceInfo;
import backend.exception.GitHubIssueNotCreatedException;
import backend.service.FormService;
import java.net.http.HttpClient;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

/** Integration tests for {@link FormService}. */
@SpringBootTest
@AutoConfigureMockMvc
@Tag("integrationTest")
@ActiveProfiles("test")
public class FormServiceIntegrationTests {

  @Autowired private FormService formService;
  @MockitoBean private HttpClient httpClient;

  private FormRequest createFormRequest() {
    return new FormRequest(
        new FormFields("feedback", "Test title", "Test body"),
        new UserDeviceInfo("desktop", "OS", "Browser", 100, 200));
  }

  @Test
  public void createNewGitHubIssueShouldCompleteWhenGitHubReturnsCreated() throws Exception {
    @SuppressWarnings("unchecked")
    HttpResponse<String> response = mock(HttpResponse.class);
    when(response.statusCode()).thenReturn(201);
    when(httpClient.send(any(), any())).thenAnswer(invocation -> response);

    assertDoesNotThrow(() -> formService.createNewGitHubIssue(createFormRequest()));
  }

  @Test
  public void createNewGitHubIssueShouldReturnGenericFailureForUnauthorizedGitHubResponse()
      throws Exception {
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
  public void createNewGitHubIssueShouldReturnGenericFailureForServerErrorGitHubResponse()
      throws Exception {
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
}
