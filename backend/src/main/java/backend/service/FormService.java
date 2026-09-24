package backend.service;

import backend.domain.dto.FormRequest;
import org.springframework.stereotype.Service;

@Service
public class FormService {

  public void createNewGitHubIssue(FormRequest formRequest) {
    System.out.println("createNewGitHubIssue() called");
    System.out.println("formType: " + formRequest.getFormFields().getFormType());
    System.out.println("formTitle: " + formRequest.getFormFields().getFormTitle());
    System.out.println("formBody: " + formRequest.getFormFields().getFormBody());
    System.out.println("deviceType: " + formRequest.getUserDeviceInfo().getDeviceType());
    System.out.println("os: " + formRequest.getUserDeviceInfo().getOs());
    System.out.println("browser: " + formRequest.getUserDeviceInfo().getBrowser());
    System.out.println("viewportHeight: " + formRequest.getUserDeviceInfo().getViewportHeight());
    System.out.println("viewportWidth: " + formRequest.getUserDeviceInfo().getViewportWidth());
  }
}
