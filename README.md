<a id="top"></a>

<div align="center">
 <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/devaajanne/sanaboksi?style=for-the-badge">
 <img alt="GitHub Tag" src="https://img.shields.io/github/v/tag/devaajanne/sanaboksi?sort=semver&style=for-the-badge">
 <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/devaajanne/sanaboksi/main?style=for-the-badge">
 <img alt="GitHub License" src="https://img.shields.io/github/license/devaajanne/sanaboksi?style=for-the-badge">
</div>

<br>
<br>

<h1 align="center">Sanaboksi</h1>
<h3 align="center">A game where you fill in a letter grid with words based on given letters in the correct positions. Play Sanaboksi at <a href="https://sanaboksi.fi">sanaboksi.fi</a>!

<br>

## About Sanaboksi

Sanaboksi is a word game where your goal is to fill in the game grid with valid Finnish words. Each row contains one fixed letter, and your task is to find a Finnish word where the given fixed letter is in the correct position.

For example, if the row is "_ _ H _ _", you could play words "K A H V I" or "V E H N Ä", because both words have the given fixed letter in the correct position. No duplicate words though!

The project consists of a Java backend and React/TypeScript frontend. CI/CD automations have been created with GitHub Actions, and the selected cloud provider is Azure.

The project is a part of my Bachelor's thesis at Haaga-Helia University of Applied Sciences. While my thesis focused on DevOps and CI/CD pipelines, this app was crucial in developing and testing an automated CI/CD pipeline. You can read the thesis (in Finnish) in Theseus here: [Web-sovelluksen CI/CD-putken toteutus osana DevOps-pohjaista kehitysprosessia](https://www.theseus.fi/handle/10024/920463)

Sanaboksi has been inspired by Sanuli, another word game developed by Haaga-Helia students. Sanuli can be played here: [sanuli.fi](https://sanuli.fi/)

### Used technologies
[![Java][java-logo]][java-url]
[![Spring Boot][spring-logo]][spring-url]
[![Gradle][gradle-logo]][gradle-url]
![SQL][sql-logo]
[![SQLite][sqlite-logo]][sqlite-url]
[![TypeScript][typescript-logo]][typescript-url]
[![React][react-logo]][react-url]
[![Vite][vite-logo]][vite-url]
[![i18next][i18next-logo]][i18next-url]
[![Docker][docker-logo]][docker-url]
[![Git][git-logo]][git-url]
[![GitHub][github-logo]][github-url]
[![GitHub Actions][github-actions-logo]][github-actions-url]
[![GitHub Copilot][github-copilot-logo]][github-copilot-url]
[![Visual Studio Code][vs-code-logo]][vs-code-url]
[![Azure][azure-logo]][azure-url]

<p align="right">(<a href="#top">back to top</a>)</p>

## Running Sanaboksi locally

To run Sanaboksi locally, you need to have the following installed:
- Docker (download from [docker.com](https://www.docker.com/))

Clone the repository:
```bash
git clone https://github.com/devaajanne/sanaboksi.git
```

Or fork it on GitHub.

Run Sanaboksi in production environment with these Docker commands:
```bash
# Start app containers
docker compose -f compose.yaml up --build

# Stop app containers
docker compose -f compose.yaml down

# Stop app containers and remove images
docker compose -f compose.yaml down --rmi local
```

Run Sanaboksi in development environment with these Docker commands:
```bash
# Start app containers
docker compose -f compose.dev.yaml up --watch

# Stop app containers
docker compose -f compose.dev.yaml down

# Stop app containers and remove images
docker compose -f compose.dev.yaml down --rmi local
```
After starting the containers, open the app at `localhost:5173`.

<p align="right">(<a href="#top">back to top</a>)</p>

## Documentation

Sanaboksi's documentation can be found in [docs](./docs/). The documentation includes
- CI/CD pipeline ([cicd-pipeline.md](./docs/cicd-pipeline.md))
- Containerization ([containerization.md](./docs/containerization.md))
- Database ([database.md](./docs/database.md))
- Requirements ([requirements.md](./docs/requirements.md))
- Relevant thesis files at the time of submission ([thesis-files](./docs/thesis-files/))

<p align="right">(<a href="#top">back to top</a>)</p>

[java-logo]: https://img.shields.io/badge/Java-%23ED8B00.svg?logo=openjdk&logoColor=white&style=for-the-badge
[java-url]: https://www.java.com/en/
[spring-logo]: https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white
[spring-url]: https://spring.io/
[gradle-logo]: https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=Gradle&logoColor=white
[gradle-url]: https://gradle.org/
[sqlite-url]: https://sqlite.org/
[sqlite-logo]: https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white
[sql-logo]: https://img.shields.io/badge/sql-000000?style=for-the-badge
[typescript-logo]: https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge
[typescript-url]: https://www.typescriptlang.org/
[react-logo]: https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB&style=for-the-badge
[react-url]: https://react.dev/
[vite-url]: https://vite.dev/
[vite-logo]: https://img.shields.io/badge/Vite-003B57?style=for-the-badge&logo=Vite&logoColor=white
[i18next-logo]: https://img.shields.io/badge/i18next-26A69A?logo=i18next&logoColor=fff&style=for-the-badge
[i18next-url]: https://www.i18next.com/
[docker-logo]: https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=for-the-badge
[docker-url]: https://www.docker.com/
[github-logo]: https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white&style=for-the-badge
[github-url]: https://github.com/
[git-logo]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[git-url]: https://git-scm.com/
[github-actions-logo]: https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white&style=for-the-badge
[github-actions-url]: https://github.com/features/actions
[github-copilot-logo]: https://img.shields.io/badge/github_copilot-8957E5?style=for-the-badge&logo=github-copilot&logoColor=white
[github-copilot-url]: https://github.com/copilot
[vs-code-logo]: https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=vsc&logoColor=white&style=for-the-badge
[vs-code-url]: https://code.visualstudio.com/
[azure-logo]: https://custom-icon-badges.demolab.com/badge/Microsoft%20Azure-0089D6?logo=msazure&logoColor=white&style=for-the-badge
[azure-url]: https://azure.microsoft.com/en-us