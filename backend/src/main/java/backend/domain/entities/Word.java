package backend.domain.entities;

/** Interface representing a word entity. Provides a method to retrieve the word as a string. */
public interface Word {

  /**
   * Returns the word as a string. Classes implementing this interface must provide an
   * implementation for this method to return the word they represent.
   *
   * @return the word
   */
  String getWord();
}
