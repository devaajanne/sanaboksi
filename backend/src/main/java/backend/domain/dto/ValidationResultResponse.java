package backend.domain.dto;

import backend.util.Constants;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * DTO representing the response for game grid validation results. Contains a map of word indices to
 * validation categories and their boolean results.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ValidationResultResponse {

  /**
   * Validation results for each word in the game grid. The key is the row index (0-6), and the
   * value is a map of validation categories (e.g., "correctWord", "duplicateWord") to their boolean
   * result.
   */
  private Map<
          @Min(
              value = Constants.FIXED_INDEX_MIN_VALUE,
              message =
                  "Validation result row index minimum value is "
                      + Constants.FIXED_INDEX_MIN_VALUE
                      + ".")
          @Max(
              value = Constants.FIXED_INDEX_MAX_VALUE,
              message =
                  "Validation result row index maximum value is "
                      + Constants.FIXED_INDEX_MAX_VALUE
                      + ".")
          Integer,
          Map<
              @NotNull(
                  message =
                      "Validation result category (correctWord or duplicateWord) must not be null.")
              String,
              @NotNull(message = "Validation result must be true or false, not null.") Boolean>>
      validationResults;
}
