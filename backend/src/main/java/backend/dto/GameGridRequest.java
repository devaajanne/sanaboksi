package backend.dto;

import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** DTO representing a request containing a game grid. */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GameGridRequest {

  /** The game grid represented as a list of rows, each row is a list of strings. Cannot be null. */
  @NotNull(message = "Game grid cannot be null.")
  private List<List<String>> gameGrid;
}
