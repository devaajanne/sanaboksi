package backend.domain;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FixedLetter {

  @NotNull(message = "Fixed index cannot be null.")
  @Min(value = 0, message = "Fixed index minimum value is 0.")
  @Max(value = 6, message = "Fixed index maximum value is 6.")
  private Integer fixedIndex;

  @NotNull(message = "Fixed letter cannot be null.")
  private Character fixedLetter;
}
