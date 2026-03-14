<a id="top"></a>

# CI/CD Pipeline Documentation

<ol>
    <li>
        <a href="#overview">Overview</a>
    </li>
    <li>
        <a href="#pre-commit-hook">Pre-commit Hook</a>
    </li>
    <li>
        <a href="#continuous-integration-ci-workflow">Continuous Integration (CI) Workflow</a>
    </li>
    <li>
        <a href="#continuous-deployment-cd-workflow">Continuous Deployment (CD) Workflow</a>
    </li>
    <li>
        <a href="#code-formatting-and-linting-tools">Code Formatting and Linting Tools</a>
    </li>
    <li>
        <a href="#testing-strategy">Testing Strategy</a>
    </li>
    <li>
        <a href="#best-practices">Best Practices</a>
    </li>
  </ol>

## Overview

This documentation describes a CI/CD pipeline for the **Sanaboksi** project with Java backend and TypeScript/React frontend. The pipeline consists of three layers:
1. a pre-commit hook that automatically formats and lints code locally before commits
2. a CI workflow that runs on pull requests to verify formatting (using Spotless for Java and Prettier for frontend), linting (ESLint), backend unit and integration tests, and frontend end-to-end tests (Playwright)
3. a (planned) CD workflow for automated deployment

The backend uses Google Java Format via Spotless plugin and organizes tests into unit tests (fast, isolated) and integration tests (with Spring Boot context). The frontend uses Prettier, ESLint, and Playwright E2E tests in CI.

<p align="right">(<a href="#top">back to top</a>)</p>

## Pre-commit Hook

**Location**: [.githooks/pre-commit](../.githooks/pre-commit)

### Purpose
Automatically formats and lints staged files before each commit to maintain code quality standards.

### Behavior

#### Backend (Java)
- **Trigger**: Any staged `.java` files in the `backend/` directory
- **Actions**:
  1. Runs `(cd backend && ./gradlew spotlessApply)` to format Java code
  2. Re-stages previously staged and now formatted files
  3. Exits with error if formatting fails

#### Frontend (TypeScript/React)
- **Trigger**: Any staged files in the `frontend/` directory
- **Actions**:
  1. Runs `npx prettier --write <staged-frontend-files>` to format staged files
  2. Runs `npx eslint --fix <staged-frontend-files> -c "frontend/eslint.config.js"` to lint staged files using the explicit linting config
  3. Re-stages formatted and linted files
  4. Exits with error if formatting or linting fails

### Setup
To enable the pre-commit hook:
```bash
git config core.hooksPath .githooks
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Continuous Integration (CI) Workflow

**Location**: [.github/workflows/continuous-integration.yaml](../.github/workflows/continuous-integration.yaml)

### Purpose
Automatically runs formatting and linting checks, backend unit and integration tests, and frontend end-to-end tests to ensure that the code is of high quality and in a deployable state.

### Trigger
Runs automatically on pull requests when:
- PR is opened (`opened`)
- New commits are pushed to the PR (`synchronize`)
- PR is reopened (`reopened`)

### Jobs

#### 1. Backend Formatting Check (`run-backend-formatting-check`)
- **Purpose**: Ensures backend code follows formatting standards
- **Command**: `./gradlew spotlessCheck`
- **Setup**: Uses [.github/actions/setup-backend-workflow-environment/action.yaml](../.github/actions/setup-backend-workflow-environment/action.yaml)
  - Composite action sets up JDK 25 (Temurin distribution) and grants Gradle execute permissions

#### 2. Frontend Formatting Check (`run-frontend-formatting-check`)
- **Purpose**: Validates frontend code formatting
- **Command**: `npx prettier . --check`
- **Setup**: Uses [.github/actions/setup-frontend-workflow-environment/action.yaml](../.github/actions/setup-frontend-workflow-environment/action.yaml)
  - Composite action sets up Node.js 24 and installs `npm` dependencies

#### 3. Frontend Linting Check (`run-frontend-linting-check`)
- **Purpose**: Validates frontend code quality and standards
- **Command**: `npx eslint .`
- **Setup**: Uses [.github/actions/setup-frontend-workflow-environment/action.yaml](../.github/actions/setup-frontend-workflow-environment/action.yaml)
  - Composite action sets up Node.js 24 and installs `npm` dependencies

#### 4. Backend Unit Tests (`run-backend-unit-tests`)
- **Purpose**: Runs unit tests
- **Command**: `./gradlew unitTest`
- **Setup**: Uses [.github/actions/setup-backend-workflow-environment/action.yaml](../.github/actions/setup-backend-workflow-environment/action.yaml)
  - Composite action sets up JDK 25 (Temurin distribution) and grants Gradle execute permissions
- **Test Location**: [backend/src/test/java/backend/unit/](../backend/src/test/java/backend/unit/)
- **Custom Task**: Defined in [backend/build.gradle](../backend/build.gradle)

#### 5. Backend Integration Tests (`run-backend-integration-tests`)
- **Purpose**: Runs integration tests
- **Command**: `./gradlew integrationTest`
- **Setup**: Uses [.github/actions/setup-backend-workflow-environment/action.yaml](../.github/actions/setup-backend-workflow-environment/action.yaml)
  - Composite action sets up JDK 25 (Temurin distribution) and grants Gradle execute permissions
- **Dependencies**: Runs after backend unit tests (`needs: [run-backend-unit-tests]`)
- **Test Location**: [backend/src/test/java/backend/integration/](../backend/src/test/java/backend/integration/)
- **Custom Task**: Defined in [backend/build.gradle](../backend/build.gradle)

#### 6. Frontend End-to-End Tests (`run-end-to-end-tests`)
- **Purpose**: Runs Playwright end-to-end tests against Dockerized backend and frontend
- **Command**: `npx playwright test`
- **Dependencies**: Runs after backend integration tests (`needs: [run-backend-integration-tests]`)
- **Test Location**: [frontend/tests](../frontend/tests/)
- **Steps**:
  1. Sets up frontend workflow environment
  2. Installs Playwright browsers (`npx playwright install --with-deps`)
  3. Builds and starts containers with `docker compose -f compose.yaml up --build -d`
  4. Waits until frontend health endpoint is reachable at `http://localhost:5173`
  5. Runs E2E tests with `npx playwright test`
  6. Uploads Playwright report artifact on failure (`frontend/test-results/`)

### Execution
Jobs run on `ubuntu-latest` runners with dependency chaining:
- formatting and linting checks run independently
- backend integration tests wait for backend unit tests
- frontend end-to-end tests wait for backend integration tests

<p align="right">(<a href="#top">back to top</a>)</p>

## Continuous Deployment (CD) Workflow
**To be added later.**

<p align="right">(<a href="#top">back to top</a>)</p>

## Code Formatting and Linting Tools

### Backend
- **Formatter**: Google Java Format 1.28.0 (via Spotless plugin)
- **Configuration**: [backend/build.gradle](../backend/build.gradle)

### Frontend
- **Formatter**: Prettier
- **Linter**: ESLint with TypeScript support
- **Configuration**: [frontend/eslint.config.js](../frontend/eslint.config.js)

<p align="right">(<a href="#top">back to top</a>)</p>

## Testing Strategy

### Backend
Tests are organized into two categories using custom Gradle tasks. These custom tasks run unit and integration tests separately in the workflow.

1. **Unit Tests** (`unitTest` task)
   - Pattern: `backend.unit.*`
   - Fast, isolated tests
   - No Spring context loading

2. **Integration Tests** (`integrationTest` task)
   - Pattern: `backend.integration.*`
   - Tests with `@SpringBootTest` annotation
   - Full application context loading

### Frontend
Frontend end-to-end tests are run with Playwright in the `run-end-to-end-tests` job.

<p align="right">(<a href="#top">back to top</a>)</p>

## Best Practices

1. **Always run formatters before committing**, which is automatically handled by the pre-commit hook
2. **Ensure all CI checks pass** before requesting PR review
3. **Keep unit and integration tests separate** using the appropriate backend package structure
4. **Keep integration test DB seeding deterministic** by maintaining `reseed_database.sh` and schema/seed files
5. **Add new tests** to the correct location (backend unit/integration tests or frontend Playwright tests)

<p align="right">(<a href="#top">back to top</a>)</p>

*Docs have been written with the help of AI*