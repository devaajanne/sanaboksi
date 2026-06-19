package backend.domain;

import backend.util.Constants;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** DTO representing a fixed letter and its index in a word for the game grid. */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FixedLetter {

  /**
   * The index of the fixed letter in the word. Must be between 0 and max word length - 1
   * (inclusive).
   */
  @Min(
      value = Constants.FIXED_INDEX_MIN_VALUE,
      message = "Fixed index minimum value is " + Constants.FIXED_INDEX_MIN_VALUE + ".")
  @Max(
      value = Constants.FIXED_INDEX_MAX_VALUE,
      message = "Fixed index maximum value is " + Constants.FIXED_INDEX_MAX_VALUE + ".")
  private int fixedIndex;

  /** The fixed letter at the specified index. Cannot be null. */
  @NotNull(message = "Fixed letter cannot be null.")
  private Character fixedLetter;
}
