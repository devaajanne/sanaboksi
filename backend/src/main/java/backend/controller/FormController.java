package backend.controller;

import backend.domain.dto.FormRequest;
import backend.service.FormService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FormController {

  private final FormService formService;

  public FormController(FormService formService) {
    this.formService = formService;
  }
  ;

  @PostMapping("/form-submission")
  public void submitForm(@Valid @RequestBody FormRequest formRequest) {
    formService.createNewGitHubIssue(formRequest);
  }
}
