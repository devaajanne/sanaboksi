package backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FixedLetterResponse {

  @NotNull(message = "Fixed index cannot be null.")
  @Min(value = 0, message = "Fixed index minimum value is 0.")
  @Max(value = 4, message = "Fixed index maximum value is 4.")
  private Integer fixedIndex;

  @NotNull(message = "Fixed letter cannot be null.")
  private Character fixedLetter;
}
