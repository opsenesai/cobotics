# Contributing to Cobotics

Thanks for your interest in contributing! Cobotics is an open-source monorepo,
and contributions of all kinds are welcome — code, docs, bug reports, and ideas.

Repository: <https://github.com/opsenesai/cobotics>

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork:

   ```bash
   git clone https://github.com/<your-username>/cobotics.git
   cd cobotics
   ```

3. Add the upstream remote:

   ```bash
   git remote add upstream https://github.com/opsenesai/cobotics.git
   ```

4. Copy `.env.example` to `.env.local` and configure your environment.
5. Install dependencies in the relevant package (`frontend/` or `backend/`).

## Development Workflow

1. Create a branch for your change:

   ```bash
   git checkout -b feature/short-description
   ```

2. Make your changes, following the existing code style.
3. Run linting and tests before committing.
4. Commit using clear, descriptive messages.
5. Push your branch and open a pull request against `opsenesai/cobotics`.

## Pull Requests

- Keep PRs focused and reasonably small.
- Describe what the change does and why.
- Reference any related issues (e.g., `Closes #123`).
- Update documentation and the `CHANGELOG.md` when relevant.
- Ensure CI passes.

## Reporting Issues

Open an issue on GitHub with a clear title, a description, steps to reproduce,
and the expected vs. actual behavior.

## Code of Conduct

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).
