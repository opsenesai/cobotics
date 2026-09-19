# Cobotics

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Open-source monorepo for the Cobotics project, containing the frontend and backend applications.

Repository: <https://github.com/opsenesai/cobotics>

## Project Structure

```
cobotics/
├── frontend/    # Next.js web application
├── backend/     # Backend service
├── README.md
├── LICENSE
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── ROADMAP.md
├── .env.example
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/opsenesai/cobotics.git
   cd cobotics
   ```

2. Copy `.env.example` to `.env.local` and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

3. Install and run the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md)
and our [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

## Documentation

- [Contributing](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)

## License

This project is licensed under the terms of the [MIT License](LICENSE).
