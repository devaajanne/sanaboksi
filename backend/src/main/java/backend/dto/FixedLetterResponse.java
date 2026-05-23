package backend.dto;

import backend.domain.Constants;
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

  /** The length of each word in the game grid. Must be between 4 and 7 (inclusive). */
  @Min(
      value = Constants.WORD_MIN_LENGTH,
      message = "Word length minimum value is " + Constants.WORD_MIN_LENGTH + ".")
  @Max(
      value = Constants.WORD_MAX_LENGTH,
      message = "Word length maximum value is " + Constants.WORD_MAX_LENGTH + ".")
  private int wordLength;

  /** The list of fixed letters for the game grid. Cannot be null. */
  @NotNull(message = "Fixed letter list cannot be null.")
  private List<FixedLetter> fixedLetters;
}
