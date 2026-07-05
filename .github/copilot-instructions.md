# Sanaboksi Copilot Instructions

## Purpose
Sanaboksi is a Finnish word game. The player fills the game grid with valid Finnish words where each row has one fixed letter in the correct position. The player can change difficulty and color mode.

## Priority
1. Follow these repo instructions first.
2. Follow the user's request second.
3. Preserve the existing code style and architecture unless the task explicitly requires a change.

## Tech Stack
- Backend: Java 25, Spring Boot, Gradle, SQLite3, Azure SQL Database
- Frontend: TypeScript, React, Vite
- Testing: JUnit 5, Playwright
- Containerization: Docker, Docker Compose
- CI/CD: GitHub Actions
- Cloud: Azure Container Registry, Azure Container Apps

## Project Map
- backend/src/main/java/backend/
  - configuration/ : Spring Boot configuration
  - controller/ : REST API controllers
  - domain/ : entities, DTOs, enums
  - repository/ : persistence layer
  - service/ : business logic
  - util/ : shared utilities
- backend/src/main/resources/
  - database/ : local SQLite database files
  - databaseInit/ : database initialization and seed files
- backend/src/test/java/backend/
  - integration/ : integration tests
  - unit/ : unit tests
- frontend/src/
  - components/game/ : game grid UI
  - components/modals/ : modal UI
  - components/styledComponents/ : reusable styled components
  - context/ : React context
  - hook/ : custom hooks
  - layout/ : app layout
  - localization/ : i18n configuration and translations
  - services/ : API calls
  - types/ : TypeScript types
  - utils/ : utility functions, constants, theme, color palette
- frontend/test/ : Playwright e2e tests
- docs/ : project documentation

## Working Rules
- Put backend business logic in `service/`, not in controllers.
- Keep API and persistence changes aligned with the existing domain model.
- Put reusable frontend state in context or hooks, not inside deeply nested components.
- Add or update tests when behavior changes.
- Prefer small, focused changes over broad refactors.
- Preserve existing naming, folder structure, and conventions unless the task clearly calls for otherwise.
- If a change affects data flow, validate the full path from UI to backend to persistence when relevant.

## Response Style
- Skip greetings and closing pleasantries.
- Lead with the answer.
- Keep responses short and direct.
- Prefer bullets over long prose when listing items.
- Use code examples when they are clearer than explanation.
- Avoid generic advice and filler.

## Response Formatting
- Use headers for longer answers.
- Use inline code for symbols, filenames, and commands.
- Use tables when comparing options.
- Use blockquotes only for important warnings.

## What to Avoid in Responses
- Overexplaining standard language or library behavior.
- Repeating the user's question.
- Announcing actions before taking them.
- Adding unrelated refactors.
- Changing architecture without a clear reason.

## Good Response Output Shape
- State the result first.
- Then list the concrete changes or explanation.
- Mention risks or follow-up only if relevant.

### Example
Bad example: "Hello! That's a great question. I found that you can use the map function to iterate. Let me explain how it works..."
Good example: "Use `array.map()` to transform each element. See MDN docs for details."