<a id="top"></a>

# API Documentation

<ol>
  <li>
    <a href="#overview">Overview</a>
  </li>
  <li>
    <a href="#endpoints">Endpoints</a>
  </li>
</ol>

## Overview

This document describes the backend API for **Sanaboksi**. The API is exposed under the `/api` base path and is used by the frontend to generate fixed letters and validate submitted game grids.

The current backend controller is implemented in [`backend/src/main/java/backend/controller/GameController.java`](../backend/src/main/java/backend/controller/GameController.java). It provides endpoints for:

- fetching fixed letters for a new game round
- validating a submitted grid of words

<p align="right"><a href="#top">back to top</a></p>

## Endpoints

### GET /api/fixed-letters/{language}/{wordLength}

Fetches a set of fixed letters for a new game round. The backend chooses random words from the repository and selects one random fixed index per word.

#### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `language` | `string` | Yes | Language code for the word list. Current supported value is `FI`. |
| `wordLength` | `integer` | Yes | Length of each word in the game. Supported values are `4`, `5`, `6`, and `7`. |

#### Example request

```http
GET /api/fixed-letters/FI/5
```

#### Success response

- HTTP status: `200 OK`
- Content type: `application/json`

```json
{
  "wordLength": 5,
  "fixedLetters": [
    {
      "fixedIndex": 0,
      "fixedLetter": "v"
    },
    {
      "fixedIndex": 1,
      "fixedLetter": "u"
    },
    {
      "fixedIndex": 3,
      "fixedLetter": "t"
    },
    {
      "fixedIndex": 4,
      "fixedLetter": "i"
    },
    {
      "fixedIndex": 4,
      "fixedLetter": "i"
    }
  ]
}
```
The response contains the `wordLength` value with the length of the requested words as well as a `fixedLetters` list. The list contains objects with
- `fixedIndex`: the index of the fixed letter
- `fixedLetter`: the fixed letter in the index

This response means the game contains five rows, each with one fixed letter at the index specified by `fixedIndex`. The frontend uses these values to render the grid.

### POST /api/validation/{language}

Validates a submitted game grid against the word list for the selected language. The request body contains the full game grid, with one row per word.

#### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `language` | `string` | Yes | Language to validate against. Example: `FI`. |

#### Request body

The request body is a JSON object containing a `gameGrid` array. Each item in the array is a row, and each row is a list of strings representing the letters entered by the player.

```json
{
  "gameGrid": [
    ["V", "E", "H", "N", "O"],
    ["S", "U", "O", "L", "A"],
    ["M", "A", "I", "T", "O"],
    ["K", "A", "H", "V", "I"],
    ["K", "A", "H", "V", "I"]
  ]
}
```

#### Example request

```http
POST /api/validation/FI
Content-Type: application/json

{
  "gameGrid": [
    ["V", "E", "H", "N", "O"],
    ["S", "U", "O", "L", "A"],
    ["M", "A", "I", "T", "O"],
    ["K", "A", "H", "V", "I"],
    ["K", "A", "H", "V", "I"]
  ]
}
```

#### Success response

- HTTP status: `200 OK`
- Content type: `application/json`

```json
{
  "validationResults": {
    "0": {
      "duplicateWord": false,
      "correctWord": false
    },
    "1": {
      "duplicateWord": false,
      "correctWord": true
    },
    "2": {
      "duplicateWord": false,
      "correctWord": true
    },
    "3": {
      "duplicateWord": true,
      "correctWord": true
    },
    "4": {
      "duplicateWord": true,
      "correctWord": true
    }
  }
}
```

The response contains a `validationResults` map keyed by row index. Each row has:

- `duplicateWord`: whether the word appears more than once in the submitted grid
- `correctWord`: whether the submitted word exists in the dictionary and matches the expected word rules

This response means that five rows have been validated whether the rows are correct or duplicates. The frontend uses these values to render validation results.

<p align="right"><a href="#top">back to top</a></p>

*Docs have been written with the help of AI*