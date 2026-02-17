package backend.dto;

import backend.domain.FixedLetter;
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

  @NotNull(message = "Word length cannot be null.")
  private int wordLength;

  @NotNull(message = "Fixed letter list cannot be null.")
  private List<FixedLetter> fixedLetters;
}
