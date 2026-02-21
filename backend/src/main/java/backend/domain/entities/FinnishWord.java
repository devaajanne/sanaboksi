package backend.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** Entity representing a Finnish word in the database. Implements the {@link Word} interface. */
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "finnish_words")
public class FinnishWord implements Word {

  /** The unique identifier for the Finnish word. */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  /** The Finnish word. Must be 5 to 7 letters and cannot be blank. */
  @NotBlank(message = "Word cannot be blank.")
  @Size(min = 5, max = 7, message = "Word must have 5 to 7 letters.")
  @Column(name = "word", nullable = false, unique = true)
  private String word;

  /**
   * Returns the Finnish word.
   *
   * @return the word as a String
   */
  public String getWord() {
    return word;
  }
}
