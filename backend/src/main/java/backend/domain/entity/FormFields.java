package backend.domain.entity;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FormFields {

  @NotNull(message = "Form type cannot be null.")
  private String formType;

  @NotNull(message = "Form title cannot be null.")
  private String formTitle;

  @NotNull(message = "Form body cannot be null.")
  private String formBody;
}
