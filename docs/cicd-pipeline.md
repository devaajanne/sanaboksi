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
    <a href="#continuous-integration-ci">Continuous Integration (CI)</a>
  </li>
  <li>
    <a href="#continuous-deployment-cd">Continuous Deployment (CD)</a>
  </li>
</ol>

## Overview
This documentation describes the CI/CD pipeline for the **Sanaboksi** project with Java backend and TypeScript/React frontend. The pipeline consists of three components:
1. **Pre-commit** hook that automatically formats and lints code locally before commits
2. **CI workflow** that runs on pull requests to
- run formatting checks (Spotless for backend and Prettier for frontend)
- run linting (ESLint)
- run backend unit and integration tests (JUnit)
- run end-to-end tests (Playwright)
- check that a needed version update label is present
3. **CD workflow** that runs after a pull request is merged to `main` to
- create and push a new version tag according to the version update label in the PR
- check if the tagged image exists in Azure Container Registry (ACR)
- deploy a container from either a tagged image from ACR or a newly created image with updated tag

<p align="right">(<a href="#top">back to top</a>)</p>

## Pre-commit Hook
A pre-commit hook automatically formats and lints staged files before each commit to maintain code quality standards.

### Location: [.githooks/pre-commit](../.githooks/pre-commit)

### Setup
Run this command in project root to enable the pre-commit hook from a custom directory:
```bash
git config core.hooksPath .githooks
```

### Formatting Backend (Java) Files
- **Purpose**: Formats any staged `.java` files in the `backend/` directory before committing them
- **Steps**:
  1. Runs `./gradlew spotlessApply` to format Java code
  2. Re-stages previously staged and now formatted files
  3. Exits with error if formatting fails

### Formatting And Linting Frontend (TypeScript/React) Files
- **Purpose**: Formats and lints any staged `.js`, `.ts`, `.jsx`, `.tsx`, `.html` or `.css` files in the `frontend/` directory before committing them
- **Steps**:
  1. Runs `npx prettier --write <staged-frontend-files>` to format staged files
  2. Runs `npx eslint --fix <staged-frontend-files> -c "frontend/eslint.config.js"` to lint staged files
  3. Re-stages previously staged and now formatted and linted files
  4. Exits with error if formatting or linting fails

<p align="right">(<a href="#top">back to top</a>)</p>

## Continuous Integration (CI)
Project's Continuous Integration (CI) pipeline consists of two GitHub Actions workflows. These workflows are run in parallel.

### Backend And Frontend Checks Workflow
Automatically runs formatting and linting checks, backend unit and integration tests and end-to-end tests. These ensure that the code is of high quality and in a deployable state.

#### Location: [.github/workflows/ci-run-backend-and-frontend-checks.yaml](../.github/workflows/ci-run-backend-and-frontend-checks.yaml)

#### Triggers
Runs automatically on pull requests when
- PR is opened (`opened`)
- new commits are pushed to the PR (`synchronize`)
- PR is reopened (`reopened`)

#### 1. Backend Formatting Check Job (`run-backend-formatting-check`)
- **Purpose**: Ensures backend code follows formatting standards
- **Steps**:
  1. Sets up backend workflow environment using composite action [.github/actions/setup-backend-workflow-environment/action.yaml](../.github/actions/setup-backend-workflow-environment/action.yaml)
  2. Runs Spotless formatting check with `./gradlew spotlessCheck`

#### 2. Frontend Formatting Check Job (`run-frontend-formatting-check`)
- **Purpose**: Validates frontend code formatting
- **Steps**:
  1. Sets up frontend workflow environment using composite action [.github/actions/setup-frontend-workflow-environment/action.yaml](../.github/actions/setup-frontend-workflow-environment/action.yaml)
  2. Runs Prettier formatting check with `npx prettier . --check`

#### 3. Frontend Linting Check Job (`run-frontend-linting-check`)
- **Purpose**: Validates frontend code quality and standards
- **Steps**:
  1. Sets up frontend workflow environment using composite action [.github/actions/setup-frontend-workflow-environment/action.yaml](../.github/actions/setup-frontend-workflow-environment/action.yaml)
  2. Runs ESLint linting check with `npx eslint .`

#### 4. Backend Unit Tests Job (`run-backend-unit-tests`)
- **Purpose**: Runs backend unit tests in a container
- **Steps**:
  1. Builds the backend test image with Docker using [Dockerfile.dev](../backend/Dockerfile.dev)
  2. Runs unit tests from [backend/src/test/java/backend/unit/](../backend/src/test/java/backend/unit/) via a custom Gradle task (from [build.gradle](../backend/build.gradle)) inside the container with `./gradlew --no-daemon unitTest`
  3. Exports the test image as `sanaboksi-backend-test.tar`
  4. Uploads the image as the `sanaboksi-backend-test-image` artifact
  5. Uploads the unit test report from `backend/build/reports/tests/unitTest/` if the job fails

#### 5. Backend Integration Tests Job (`run-backend-integration-tests`)
- **Purpose**: Runs backend integration tests in a container
- **Dependencies**: Runs after backend unit tests (`needs: run-backend-unit-tests`)
- **Steps**:
  1. Downloads the `sanaboksi-backend-test-image` artifact created by `run-backend-unit-tests`
  2. Loads the backend test image with Docker
  3. Creates and reseeds the database inside the container
  4. Runs integration tests [backend/src/test/java/backend/integration/](../backend/src/test/java/backend/integration/) via a custom Gradle task (from [build.gradle](../backend/build.gradle)) inside the container with `./gradlew --no-daemon integrationTest`
  5. Uploads the integration test report from `backend/build/reports/tests/integrationTest/` if the job fails

#### 6. End-to-End Tests Job (`run-end-to-end-tests`)
- **Purpose**: Runs Playwright end-to-end tests against Dockerized backend and frontend
- **Dependencies**: Runs after backend integration tests (`needs: run-backend-integration-tests`)
- **Steps**:
  1. Sets up frontend workflow environment
  2. Installs Playwright browsers (`npx playwright install --with-deps`)
  3. Builds and starts containers with `docker compose -f compose.yaml up --build -d`
  4. Waits until frontend health endpoint is reachable at `http://localhost:5173`
  5. Runs E2E tests from [frontend/tests](../frontend/tests/) with `npx playwright test`
  6. Uploads Playwright report artifact on failure (`frontend/test-results/`)

### Version Update Label Check Workflow
Automatically checks that PR includes exactly one version update label: `major update`, `minor update` or `patch update`. This label guides how the new tag is created after the PR is merged to `main`. If no version update label is present, the following workflow would fail.

#### Location: [.github/workflows/ci-run-update-version-label-check.yaml](../.github/workflows/ci-run-update-version-label-check.yaml)

#### Triggers
Runs automatically on pull requests when
- new commits are pushed to the PR (`synchronize`)
- PR is reopened (`reopened`)
- a label is added to the PR (`labeled`)
- a label is removed from the PR (`unlabeled`)

#### Version Update Label Check Job (`run-version-update-labels-check`)
- **Purpose**: Checks that a correct version update label is present in the PR; needed to create tags in a further workflow
- **Steps**:
  1. Gets all labels in the PR
  2. Counts the number of version update labels (`major update`, `minor update` or `patch update`) in all labels
  3. Validates that exactly one version update label is set

<p align="right">(<a href="#top">back to top</a>)</p>

## Continuous Deployment (CD)
Project's Continuous Deployment (CD) pipeline consists of two GitHub Actions workflows. These workflows are run in order: first tag update workflow, then Azure deployment workflow.

### Create And Push New Tag Workflow
Automatically creates a new tag and pushes it to the repository. The closed PR's version update label decides the tag's new version number.

#### Location: [.github/workflows/cd-create-new-tag.yaml](../.github/workflows/cd-create-new-tag.yaml)

#### Trigger
Runs automatically when
- PR targeting `main` is closed (`closed`, `main`) and merged (`if: ${{ github.event.pull_request.merged == true }}`)

#### 1. Get Latest Tag Job (`get-latest-tag`)
- **Purpose**: Gets the latest tag pushed to the repository
- **Steps**:
  1. Fetches all tags from the repository
  2. Finds the latest tag matching `v*`
  3. Validates that the tag follows semantic versioning
  4. Exposes the latest tag as an output for later jobs

#### 2. Get PR Update Label Job (`get-pr-update-label`)
- **Purpose**: Gets the merged PR's version update label
- **Steps**:
  1. Reads PR labels from the GitHub event payload
  2. Determines which version update label is present
  3. Exposes the label as an output for later jobs

#### 3. Create And Push A New Tag Job (`create-and-push-new-tag`)
- **Purpose**: Creates and pushes a new tag to the repository
- **Dependencies**: Runs after getting the latest tag and PR update label (`needs: [get-latest-tag, get-pr-update-label]`)
- **Steps**:
  1. Reads the latest tag and PR update label
  2. Increments the version according to the label
  3. Validates the new tag format
  4. Pushes the new tag to the repository

#### 4. Trigger Deployment Workflow Job (`trigger-deployment-workflow`)
- **Purpose**: Triggers Azure deployment workflow
- **Dependencies**: Runs after a new tag is created and pushed (`needs: create-and-push-new-tag`)
- **Steps**:
  1. Triggers `cd-deploy-to-azure.yaml` with the newly created tag as the Git `ref` for deployment

### Azure Deployment Workflow
Gets the newest tag in the repository. If an image matching the tag is found in Azure Container Registry (ACR), workflow deploys a container to Azure Container Apps from that image. If not, workflow creates and tags a new image and deploys a container from the new image.

#### Location: [.github/workflows/cd-deploy-to-azure.yaml](../.github/workflows/cd-deploy-to-azure.yaml)

#### Trigger
Triggered by the `cd-create-new-tag.yaml` workflow or manually via GitHub. Tag pushes from GitHub Actions workflows do not trigger other workflows, even when configured to trigger on tag push events.

#### 1. Get Version Number From Ref Job (`get-version-number-from-ref`)
- **Purpose**: Gets the correct version number from used ref: either automatically passed by the `trigger-deployment-workflow` job or set in GitHub if deploying manually
- **Steps**:
  1. Reads the tag name from the Git `ref`
  2. Validates that the ref follows semantic versioning with a leading `v`
  3. Extracts the version number without the `v` prefix
  4. Exposes the version number as an output for later jobs

#### 2. Check ACR Images Job (`check-acr-images`)
- **Purpose**: Checks whether an image with the used version is already pushed to ACR
- **Dependencies**: Runs after getting the version number from ref (`needs: get-version-number-from-ref`)
- **Steps**:
  1. Logs in to Azure
  2. Checks whether matching backend and frontend images already exist in Azure Container Registry
  3. Exposes two outputs: whether the backend image exists in ACR and whether the frontend image exists in ACR

#### 3. Deploy Backend Container To Azure Job (`deploy-backend-container-to-azure`)
- **Purpose**: Deploys the backend container app
- **Dependencies**: Runs after getting the version number from ref and checking ACR images (`needs: [get-version-number-from-ref, check-acr-images]`)
- **Steps**:
  1. Deploys container from an existing backend image from ACR if available
  2. Otherwise builds a new backend image from [Dockerfile](../backend/Dockerfile) and deploys a new container from it

#### 4. Deploy Frontend Container To Azure Job (`deploy-frontend-container-to-azure`)
- **Purpose**: Deploys the frontend container app
- **Dependencies**: Runs after getting the version number from ref, checking ACR images and deploying backend (`needs: [get-version-number-from-ref, check-acr-images, deploy-backend-container-to-azure]`)
- **Steps**:
  1. Deploys container from an existing frontend image from ACR if available
  2. Otherwise builds a new frontend image from [Dockerfile](../frontend/Dockerfile) and deploys a new container from it

<p align="right">(<a href="#top">back to top</a>)</p>

*Docs have been written with the help of AI*