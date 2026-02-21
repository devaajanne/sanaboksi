package backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidationResultResponse {

  private Map<
          @Min(value = 0, message = "Validation result row index minimum value is 0.")
          @Max(value = 6, message = "Validation result row index maximum value is 6.") Integer,
          Map<
              @NotNull(
                  message =
                      "Validation result category (correctWord or duplicateWord) must not be null.")
              String,
              @NotNull(message = "Validation result must be true or false, not null.") Boolean>>
      validationResults;
}
