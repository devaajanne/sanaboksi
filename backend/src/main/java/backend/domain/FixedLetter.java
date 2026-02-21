package backend.domain;

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

  /** The index of the fixed letter in the word. Must be between 0 and 6 (inclusive). */
  @Min(value = 0, message = "Fixed index minimum value is 0.")
  @Max(value = 6, message = "Fixed index maximum value is 6.")
  private int fixedIndex;

  /** The fixed letter at the specified index. Cannot be null. */
  @NotNull(message = "Fixed letter cannot be null.")
  private Character fixedLetter;
}
