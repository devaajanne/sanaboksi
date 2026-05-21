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
</ol>

## Overview

This document describes the requirements for the **Sanaboksi** word game. The game consists of a React frontend and a Java Spring Boot backend. The requirements are presented as user stories and detailed functional specifications.

<p align="right">(<a href="#top">back to top</a>)</p>

## User Stories

- **As a player**, I want a Sanaboksi grid to load automatically when I open the app, so I can start playing right away.
- **As a player**, I want to play a daily Sanaboksi grid.
- **As a player**, I want to solve a game consisting of a 5x5 grid by default.
- **As a player**, I want to have the option to play 5x4, 5x6 or 5x7 grids, so I can choose my preferred difficulty.
- **As a player**, I want each row of the game to display one to three fixed letter(s) in its correct position, so I know which letter(s) must appear and where.
- **As a player**, I want to type words that fit the grid, ensuring each word contains the fixed letter(s) at the correct index/indices.
- **As a player**, I want the app to check my answers and tell me which words are correct and which need fixing.
- **As a player**, I want to be congratulated and offered a new game if I solve the current one correctly.
- **As a player**, I want to know which rows are incorrect if I make a mistake, so I can correct them.

<p align="right">(<a href="#top">back to top</a>)</p>

## Functional Requirements

1. **Automatic Game Loading**
   - The frontend loads a Sanaboksi grid automatically when the page opens.

2. **Grid Structure**
   - By default, the grid has 5 rows and 5 columns.
   - Optionally, the player can choose the grid to be 5x4, 5x6 or 5x7.
   - Each row contains one to three fixed letter(s) at a specific index/indices (columns).

3. **Word Entry**
   - Players type one word per row.
   - Players type one letter per input field.
   - Players can delete their inputs.
   - Players cannot delete or modify the fixed letter(s).
   - Each word must match the row's length (4, 5, 6, or 7 letters).
   - Each word must contain the fixed letter(s) at the correct index/indices for its row.

4. **Answer Submission**
   - The frontend collects all words and sends them to the backend for validation.

5. **Answer Validation**
   - The backend checks:
     - Each word’s length matches the grid size.
     - Each word contains the fixed letter(s) at the correct index/indices.
     - Each word exists in the word list (database table).
   - The backend returns:
     - Per-row validation results.
     - Overall pass/fail status.

6. **Result Handling**
   - If all words are valid:
     - The frontend congratulates the player and offers a new randomly generated game.
   - If any word is invalid:
     - The frontend shows which rows failed and allows the player to correct them.

7. **Backend Logic**
   - All dictionary lookups, game generation, and validation logic are handled exclusively in the backend.

<p align="right">(<a href="#top">back to top</a>)</p>

## Non-Functional Requirements

- The frontend must not contain or expose any word lists or game logic.
- All word lists and game generation must be securely managed in the backend.
- The application must support Finnish word lists for 4-, 5-, 6-, and 7-letter words, with the possibility to extend the game to other languages.

<p align="right">(<a href="#top">back to top</a>)</p>

## Data Requirements

- The backend must have database tables containing words used in the game.
- One database table contains all the words for one language.
- The database tables must not contain duplicates.
- The backend must use these tables for
  - game generation (selecting fixed letters and valid solution sets)
  - word validation during gameplay.

<p align="right">(<a href="#top">back to top</a>)</p>

*Docs have been written with the help of AI*