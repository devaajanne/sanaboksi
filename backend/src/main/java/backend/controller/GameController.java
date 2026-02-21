package backend.controller;

import backend.domain.Language;
import backend.dto.FixedLetterResponse;
import backend.dto.GameGridRequest;
import backend.dto.ValidationResultResponse;
import backend.service.GameService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for game-related endpoints. Provides APIs for retrieving fixed letters and
 * validating game grids.
 */
@RestController
@RequestMapping("/api")
public class GameController {

  private final GameService gameService;

  public GameController(GameService gameService) {
    this.gameService = gameService;
  }

  /**
   * Retrieves fixed letters for the game grid based on language, word length, and word count.
   *
   * @param language the language for the game
   * @param wordLength the length of each word (5-7)
   * @param wordCount the number of words in the grid
   * @return a {@link FixedLetterResponse} containing the fixed letters
   */
  @GetMapping("/fixed-letters/{language}/{wordLength}/{wordCount}")
  public ResponseEntity<FixedLetterResponse> getFixedLetters(
      @PathVariable Language language, @PathVariable int wordLength, @PathVariable int wordCount) {
    return ResponseEntity.ok(gameService.getFixedLetterResponse(language, wordLength, wordCount));
  }

  /**
   * Validates the submitted game grid for the specified language.
   *
   * @param gameGridRequest the request containing the game grid
   * @param language the language of words to be validated
   * @return a {@link ValidationResultResponse} indicating the validation result
   */
  @PostMapping("/validation/{language}")
  public ResponseEntity<ValidationResultResponse> validateGameGrid(
      @Valid @RequestBody GameGridRequest gameGridRequest, @PathVariable Language language) {
    return ResponseEntity.ok(gameService.validateGameGrid(gameGridRequest, language));
  }
}
