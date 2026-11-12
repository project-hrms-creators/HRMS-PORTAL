
# HRMS Portal

> Enterprise-grade Human Resource Management System built with **React (Vite)** and **FastAPI**, designed with scalability, maintainability, and cloud-agnostic deployment in mind.

---

## Overview

HRMS Portal streamlines core HR operations for organizations through a modern web application. The project follows a modular architecture, offline-first principles, and clean engineering practices to support long-term growth from MVP to enterprise scale.

## Core Features

- Secure Authentication (JWT + Refresh Tokens)
- Employee Management
- Attendance Tracking (Punch In / Out, Work Hours)
- Leave Management (Annual, Sick, Casual leave balances & requests)
- Role-Based Access Control (RBAC: Employee, Admin, HR, Super Admin)
- User Profiles & Employment Details
- Offline Synchronization & Local Storage
- Audit Logging
- Multi-Tenant Architecture
- Cloud-Agnostic Deployment

---

## Tech Stack

### Web Frontend

- React 19 (Vite)
- JavaScript / JSX
- React Router DOM
- Zustand (Global State)
- TanStack Query v5 (Data Fetching & Cache)
- React Hook Form
- Zod (Schema Validation)
- Tailwind CSS (Design Tokens & Styling)
- Lucide React (Icons)
- Axios (HTTP Client & Interceptors)

### Backend

- FastAPI
- Python
- SQLAlchemy 2
- Alembic
- PostgreSQL
- Pydantic v2
- JWT
- bcrypt

---

## Project Structure

```text
hrms-portal/
├── apps/
│   ├── web/           # React 19 web application (Vite + Tailwind + React Router)
│   └── backend/       # FastAPI Python backend
├── packages/          # Shared packages & types
├── docs/              # System documentation & PRD
└── scripts/
```

---

## Documentation

| Document | Purpose |
|----------|---------|
| PRD.md | Product requirements |
| Architecture.md | System architecture |
| Schema.md | Database design |
| TRD.md | Technical requirements |
| Flow.md | User & System flows |
| Design.md | Design system |
| Plan.md | Engineering execution plan |
| GitWorkflow.md | Git collaboration guide |

---

## Architecture Principles

- Modular Monolith
- Microservice Ready
- API First
- Offline First
- Security by Default
- Multi-Tenant
- Scalable
- Clean Architecture

---

## Development Workflow

1. Clone the repository.
2. Create a feature branch.
3. Implement the feature.
4. Write or update tests.
5. Open a Pull Request.
6. Complete code review.
7. Merge after CI passes.

Refer to **GitWorkflow.md** for detailed collaboration rules.

---

## Local Setup

### Prerequisites

- Git
- Node.js (LTS)
- Expo CLI
- Python 3.13+
- uv
- PostgreSQL
- Docker (recommended)

### Clone

```bash
git clone <repository-url>
cd hrms-portal
```

### Web Frontend

```bash
# Run directly from root:
npm install
npm run dev

# Or from apps/web:
cd apps/web
npm install
npm run dev
```

### Backend

```bash
cd backend
uv sync
uv run alembic upgrade head
uv run uvicorn app.main:app --reload
```

---

## Quality Standards

- Feature-based architecture
- Conventional Commits
- Pull Request reviews
- Automated testing
- Documentation-first development
- Secure coding practices

---

## Roadmap

### MVP

- Authentication
- Employee Management
- Attendance
- Leave
- Dashboard
- Profile

### Future

- Payroll
- Notifications
- Reports
- Analytics
- AI Insights
- Enterprise Integrations

---

## Contributing

1. Read `GitWorkflow.md`.
2. Follow coding standards.
3. Keep pull requests focused.
4. Update documentation when required.
5. Ensure tests pass before requesting review.

---

## License

This repository is intended for internal development. Add an appropriate open-source or proprietary license before public release.

---

## Acknowledgements

This project follows documentation-driven development. Engineering decisions are captured in the accompanying documentation suite to ensure consistency, traceability, and maintainability throughout the software lifecycle.
 
 Test contribution by  SINCHANA. 