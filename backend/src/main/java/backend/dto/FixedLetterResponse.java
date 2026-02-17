package backend.dto;

import backend.domain.FixedLetter;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FixedLetterResponse {

  @Min(value = 0, message = "Fixed index minimum value is 0.")
  @Max(value = 6, message = "Fixed index maximum value is 6.")
  private int wordLength;

  @NotNull(message = "Fixed letter list cannot be null.")
  private List<FixedLetter> fixedLetters;
}
