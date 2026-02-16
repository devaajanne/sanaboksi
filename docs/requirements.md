<a id="top"></a>

# Sanaboksi Requirements Documentation

<ol>
    <li>
        <a href="#overview">Overview</a>
    </li>
    <li>
        <a href="#user-stories">User Stories</a>
    </li>
    <li>
        <a href="#functional-requirements">Functional Requirements</a>
    </li>
    <li>
        <a href="#non-functional-requirements">Non-Functional Requirements</a>
    </li>
    <li>
        <a href="#data-requirements">Data Requirements</a>
    </li>
    <li>
        <a href="#best-practices">Best Practices</a>
    </li>
</ol>

## Overview

This document describes the requirements for the **Sanaboksi** application, a daily word puzzle game. The app consists of a React frontend and a Java Spring Boot backend, with all dictionary and puzzle logic handled server-side. The requirements are presented as user stories and detailed functional specifications.

<p align="right">(<a href="#top">back to top</a>)</p>

## User Stories
- **As a player**, I want the daily Sanaboksi puzzle to load automatically when I open the app, so I can start playing right away.
- **As a player**, I want to solve a puzzle consisting of a 5×5 grid by default
- **As a player**, I want to have the option to play 5×6 or 5×7 grids, so I can choose my preferred difficulty.
- **As a player**, I want each row of the puzzle to display one fixed letter in its correct position, so I know which letter must appear and where.
- **As a player**, I want to type words that fit the grid, ensuring each word contains the fixed letter at the correct index.
- **As a player**, I want the app to check my answers and tell me which words are correct and which need fixing.
- **As a player**, I want to be congratulated and offered a new puzzle if I solve the current one correctly.
- **As a player**, I want to know which rows are incorrect if I make a mistake, so I can correct them.
- **As a player**, I want to play the game in different languages.

<p align="right">(<a href="#top">back to top</a>)</p>

## Functional Requirements

1. **Automatic Puzzle Loading**
   - The frontend loads the daily Sanaboksi puzzle automatically when the page opens.

2. **Puzzle Structure**
   - The puzzle is a grid with 5 rows and 5 columns by default.
   - Optionally, the grid can be 5×6 or 5×7.
   - Each row contains one fixed letter at a specific index (column).

3. **Word Entry**
   - Players type one word per row.
   - Players type one letter per input field.
   - Players can delete their inputs.
   - Players cannot delete or modify the fixed letter.
   - Each word must match the row's length (5, 6, or 7 letters).
   - Each word must contain the fixed letter at the correct index for its row.

4. **Answer Submission**
   - The frontend collects all words and sends them to the backend for validation.

5. **Answer Validation**
   - The backend checks:
     - Each word’s length matches the grid size.
     - Each word contains the fixed letter at the correct index.
     - Each word exists in the appropriate language-specific word list (database table) for the currently selected language.
   - The backend returns:
     - Per-row validation results.
     - Overall pass/fail status.

6. **Result Handling**
   - If all words are valid:
     - The frontend congratulates the player and offers a new randomly generated puzzle.
   - If any word is invalid:
     - The frontend shows which rows failed and allows the player to correct them.

7. **Backend Logic**
   - All dictionary lookups, puzzle generation, and validation logic are handled exclusively in the backend.

8. **Language Selection**
   - Language can be changed, and the app logic takes this into account in dictionary lookups and validation logic.

<p align="right">(<a href="#top">back to top</a>)</p>

## Non-Functional Requirements

- The frontend must not contain or expose any word lists or puzzle logic.
- All word lists and puzzle generation must be securely managed in the backend.
- The application must support Finnish word lists for 5-, 6-, and 7-letter words, with the possibility to extend the game to other languages.

<p align="right">(<a href="#top">back to top</a>)</p>

## Data Requirements

- The backend must have database tables containing words:
  - One table for five-letter words per language.
  - One table for six-letter words per language.
  - One table for seven-letter words per language.
- The database tables must not contain duplicates.
- The backend must use these tables for:
  - Puzzle generation (selecting fixed letters and valid solution sets).
  - Word validation during gameplay.

<p align="right">(<a href="#top">back to top</a>)</p>

## Best Practices

1. **All puzzle and dictionary logic must reside in the backend** to prevent cheating and ensure fairness.
2. **Frontend communicates with backend via API** for puzzle loading and answer validation.
3. **Word lists must not be exposed to the client** in any form.
4. **Support multiple grid sizes** for flexibility and replayability.

<p align="right">(<a href="#top">back to top</a>)</p>

*Docs have been written with the help of AI*