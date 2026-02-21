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

/** DTO representing the response containing fixed letters and word length for a game grid. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FixedLetterResponse {

  /** The length of each word in the game grid. Must be between 0 and 6 (inclusive). */
  @Min(value = 0, message = "Fixed index minimum value is 0.")
  @Max(value = 6, message = "Fixed index maximum value is 6.")
  private int wordLength;

  /** The list of fixed letters for the game grid. Cannot be null. */
  @NotNull(message = "Fixed letter list cannot be null.")
  private List<FixedLetter> fixedLetters;
}
