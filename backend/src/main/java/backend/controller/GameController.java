package backend.controller;

import backend.dto.FixedLetterResponse;
import backend.service.GameService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GameController {

  private final GameService gameService;

  public GameController(GameService gameService) {
    this.gameService = gameService;
  }

  @GetMapping("/fixed-letters/{count}")
  public ResponseEntity<List<FixedLetterResponse>> getFixedLetters(@PathVariable int count) {
    return ResponseEntity.ok(gameService.getFixedLettersFromRandomWords(count));
  }
}
