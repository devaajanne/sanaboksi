package backend.domain.dto;

import backend.domain.entity.FormFields;
import backend.domain.entity.UserDeviceInfo;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** DTO representing a user submitted form */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FormRequest {

  @Valid private FormFields formFields;

  @Valid private UserDeviceInfo userDeviceInfo;
}
