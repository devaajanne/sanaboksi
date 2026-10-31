package backend.integration;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import backend.exception.GitHubIssueNotCreatedException;
import backend.service.FormService;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

/** Integration tests for {@link backend.controller.FormController}. */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Tag("integrationTest")
@ActiveProfiles("test")
public class FormControllerIntegrationTests {
  @Autowired private MockMvc mockMvc;
  @MockitoBean private FormService formService;

  private String validFormRequest() {
    return """
        {
          "formFields": {
            "formType": "feedback",
            "formTitle": "Test title",
            "formBody": "Test body"
          },
          "userDeviceInfo": {
            "deviceType": "desktop",
            "os": "OS",
            "browser": "Browser",
            "viewportHeight": 100,
            "viewportWidth": 200
          }
        }
        """;
  }

  private String formRequestWithValidationErrors() {
    return """
        {
          "formFields": {
            "formType": null,
            "formTitle": null,
            "formBody": null
          },
          "userDeviceInfo": {
            "deviceType": " ",
            "os": "OS",
            "browser": "",
            "viewportHeight": null,
            "viewportWidth": null
          }
        }
        """;
  }

  @Test
  public void submitFormShouldReturn502WhenGitHubIssueCreationFails() throws Exception {
    doThrow(new GitHubIssueNotCreatedException("Failed to create GitHub issue"))
        .when(formService)
        .createNewGitHubIssue(any());

    mockMvc
        .perform(
            post("/api/form-submission")
                .contentType("application/json")
                .content(validFormRequest()))
        .andExpect(status().isBadGateway())
        .andExpect(jsonPath("$.statusCode").value(502))
        .andExpect(jsonPath("$.error").value("Failed to create GitHub issue"));
  }

  @Test
  public void submitFormShouldReturn200WhenFormServiceSucceeds() throws Exception {
    mockMvc
        .perform(
            post("/api/form-submission")
                .contentType("application/json")
                .content(validFormRequest()))
        .andExpect(status().isOk());

    verify(formService).createNewGitHubIssue(any());
  }

  @Test
  public void submitFormShouldReturn400WhenFormRequestValidationFails() throws Exception {
    mockMvc
        .perform(
            post("/api/form-submission")
                .contentType("application/json")
                .content(formRequestWithValidationErrors()))
        .andExpect(status().isBadRequest());

    verifyNoInteractions(formService);
  }
}
