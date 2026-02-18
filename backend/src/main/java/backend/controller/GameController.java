package backend.controller;

import backend.domain.Language;
import backend.dto.FixedLetterResponse;
import backend.dto.GameGridRequest;
import backend.dto.ValidationResultResponse;
import backend.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GameController {

  private final GameService gameService;

  public GameController(GameService gameService) {
    this.gameService = gameService;
  }

  @GetMapping("/fixed-letters/{language}/{wordLength}/{wordCount}")
  public ResponseEntity<FixedLetterResponse> getFixedLetters(
      @PathVariable Language language, @PathVariable int wordLength, @PathVariable int wordCount) {
    return ResponseEntity.ok(gameService.getFixedLetterResponse(language, wordLength, wordCount));
  }

  @PostMapping("/validation/{language}")
  public ResponseEntity<ValidationResultResponse> validateResults(
      @RequestBody GameGridRequest gameGridRequest, @PathVariable Language language) {
    return ResponseEntity.ok(gameService.validateGameGrid(gameGridRequest, language));
  }
}
