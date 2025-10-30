# TixTrack

> A modern, feature-rich ticket tracking and issue management system built with NestJS and PostgreSQL.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
  - [Available Scripts](#available-scripts)
  - [Database Migrations](#database-migrations)
  - [Testing](#testing)
- [Security](#security)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview

TixTrack is a comprehensive ticket tracking system designed to manage support tickets, services, and user roles efficiently. Built with modern technologies and best practices, it provides a robust foundation for managing customer support, issue tracking, or any ticketing workflow.

### Key Highlights

- **Role-Based Access Control (RBAC)** - Fine-grained permissions with admin and user roles
- **Service Categories** - Organize tickets by services and subjects
- **Priority & Status Management** - Track ticket lifecycle from creation to resolution
- **User Assignment** - Assign tickets to team members
- **Session-Based Authentication** - Secure cookie-based authentication
- **Docker Support** - Easy deployment with Docker Compose

## Features

### Core Functionality

- **Ticket Management**

  - Create, update, and track tickets
  - Four status levels: `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`
  - Four priority levels: `LOW`, `MEDIUM`, `HIGH`, `URGENT`
  - Assign tickets to users
  - Track creation and resolution timestamps

- **Service Organization**

  - Group tickets by services
  - Define subjects within services for better categorization
  - Active/inactive service management

- **User Management**

  - User registration and authentication
  - Role-based permissions (Admin/User)
  - Track created and assigned tickets per user

- **Security & Authentication**
  - Session-based authentication via cookies
  - Protected routes with AuthGuard
  - Role-specific access control with RoleGuard

## Tech Stack

### Backend

| Technology            | Version | Purpose                       |
| --------------------- | ------- | ----------------------------- |
| **NestJS**            | 11.0.1  | Progressive Node.js framework |
| **TypeScript**        | 5.7.3   | Type-safe development         |
| **Fastify**           | 5.3.3   | High-performance HTTP server  |
| **TypeORM**           | 0.3.24  | Database ORM                  |
| **PostgreSQL**        | latest  | Relational database           |
| **class-validator**   | 0.14.2  | Data validation               |
| **class-transformer** | 0.5.1   | DTO transformation            |
| **Jest**              | 29.7.0  | Testing framework             |
| **@nestjs/swagger**   | 11.2.1  | OpenAPI documentation         |
| **@nestjs/terminus**  | 11.0.0  | Health checks                 |

### Development Tools

- **Docker & Docker Compose** - Containerization
- **Swagger/OpenAPI** - API documentation (available at `/api`)
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting
- **ts-node** - TypeScript execution
- **@swc/core** - Fast TypeScript/JavaScript compiler

## Architecture

TixTrack follows a modular monolithic architecture with clear separation of concerns:

```
┌─────────────────────────────────────────┐
│           API Layer (Fastify)           │
├─────────────────────────────────────────┤
│  Controllers (REST Endpoints)           │
├─────────────────────────────────────────┤
│  Guards (Auth, Roles)                   │
├─────────────────────────────────────────┤
│  Service (Business Logic)              │
├─────────────────────────────────────────┤
│  TypeORM (Data Access Layer)            │
├─────────────────────────────────────────┤
│  PostgreSQL Database                     │
└─────────────────────────────────────────┘
```

### Core Modules

- **Auth Module** - Session-based authentication
- **User Module** - User management
- **Ticket Module** - Ticket CRUD operations
- **Service Module** - Service category management
- **Subject Module** - Subject (subcategory) management
- **Health Module** - Health check endpoints
- **Common Module** - Shared entities and utilities

### Naming Conventions

The project follows NestJS best practices with **singular naming**:

- **Module directories**: `user/`, `ticket/`, `service/`, `subject/` (singular)
- **Entity classes**: `User`, `Ticket`, `Service`, `Subject` (singular)
- **Controller routes**: `/user`, `/ticket`, `/service`, `/subject` (singular)
- **Database tables**: `users`, `tickets`, `services`, `subjects` (plural)

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for PostgreSQL)
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd TixTrack
```

2. **Install dependencies**

```bash
cd backend
npm install
```

3. **Set up environment variables**

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration (see [Configuration](#configuration) section).

### Configuration

Configure your application using the `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
DATABASE_NAME=tixtrack
DATABASE_SYNC=true

# Application Configuration
PORT=3000
NODE_ENV=development
APPLICATION_SLUG=tixtrack
```

**Important Notes:**

- Set `DATABASE_SYNC=false` in production environments
- Use strong passwords for database credentials
- Configure `NODE_ENV=production` for production deployments

### Running the Application

1. **Start PostgreSQL with Docker**

```bash
cd backend
npm run docker
```

This starts PostgreSQL on `localhost:5432` with credentials from `.env`.

2. **Run database migrations** (if needed)

```bash
npm run migration:run
```

3. **Start the development server**

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Project Structure

```
TixTrack/
├── backend/
│   ├── src/
│   │   ├── auth/                    # Authentication module
│   │   │   ├── decorators/          # Custom decorators
│   │   │   ├── interfaces/          # TypeScript interfaces
│   │   │   ├── auth.module.ts
│   │   │   └── auth.service.ts
│   │   │
│   │   ├── user/                    # User management (singular)
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   ├── dto/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   └── user.module.ts
│   │   │
│   │   ├── ticket/                  # Ticket management (singular)
│   │   │   ├── entities/
│   │   │   │   └── ticket.entity.ts
│   │   │   ├── dto/
│   │   │   ├── ticket.controller.ts
│   │   │   ├── ticket.service.ts
│   │   │   └── ticket.module.ts
│   │   │
│   │   ├── service/                 # Service categories (singular)
│   │   │   ├── entities/
│   │   │   │   └── service.entity.ts
│   │   │   ├── dto/
│   │   │   ├── service.controller.ts
│   │   │   ├── service.service.ts
│   │   │   └── service.module.ts
│   │   │
│   │   ├── subject/                 # Ticket subjects (singular)
│   │   │   ├── entities/
│   │   │   │   └── subject.entity.ts
│   │   │   ├── dto/
│   │   │   ├── subject.controller.ts
│   │   │   ├── subject.service.ts
│   │   │   └── subject.module.ts
│   │   │
│   │   ├── health/                  # Health check module
│   │   │   ├── health.controller.ts
│   │   │   └── health.module.ts
│   │   │
│   │   ├── common/                  # Shared module
│   │   │   ├── entities/
│   │   │   │   ├── application.entity.ts
│   │   │   │   ├── application-role.entity.ts
│   │   │   │   ├── user-application-role.entity.ts
│   │   │   │   └── timestamp.embeddable.ts
│   │   │   ├── dto/
│   │   │   ├── enum/
│   │   │   ├── common.controller.ts
│   │   │   ├── common.service.ts
│   │   │   └── common.module.ts
│   │   │
│   │   ├── guards/                  # Authorization guards
│   │   │   ├── auth.guard.ts        # Session-based auth
│   │   │   ├── role.guard.ts        # RBAC enforcement
│   │   │   └── role.decorator.ts    # @Roles() decorator
│   │   │
│   │   ├── config/                  # Configuration
│   │   │   └── database.config.ts   # Multi-env database config
│   │   │
│   │   ├── database/                # Database module
│   │   │   ├── database.providers.ts
│   │   │   └── databse.module.ts
│   │   │
│   │   ├── app.module.ts            # Root module
│   │   ├── app.controller.ts        # Root controller
│   │   ├── app.service.ts           # Root service
│   │   └── main.ts                  # Application entry point
│   │
│   ├── test/                        # Test files
│   ├── docker-compose.yaml          # Docker services
│   ├── tsconfig.json                # TypeScript config
│   ├── nest-cli.json                # NestJS CLI config
│   ├── eslint.config.mjs            # ESLint config
│   └── package.json                 # Dependencies
│
└── data/                            # PostgreSQL data volume
```

**Note:** Module directories use singular naming convention (e.g., `user/`, `ticket/`, `service/`, `subject/`) following NestJS best practices.

## API Documentation

### Interactive Documentation

**Swagger UI is available at:** [`http://localhost:3000/api`](http://localhost:3000/api)

The Swagger interface provides:

- Interactive API testing
- Complete request/response schemas
- Authentication examples
- Real-time validation

### Base URL

```
http://localhost:3000
```

### Authentication

All authenticated requests require a session cookie. The session is established upon successful login.

### Example Endpoints

#### Health Check

- `GET /health` - Check database connectivity and application health

#### Ticket

- `GET /ticket` - List all tickets
- `POST /ticket` - Create a new ticket
- `GET /ticket/:id` - Get ticket by ID
- `PATCH /ticket/:id` - Update ticket
- `DELETE /ticket/:id` - Delete ticket

#### Service (Admin only)

- `GET /service` - List all services
- `POST /service` - Create service (requires `ADMIN` role)
- `PATCH /service/:id` - Update service (requires `ADMIN` role)
- `DELETE /service/:id` - Delete service (requires `ADMIN` role)

#### Subject

- `GET /subject` - List all subjects
- `POST /subject` - Create subject
- `GET /subject/:id` - Get subject by ID
- `PATCH /subject/:id` - Update subject
- `DELETE /subject/:id` - Delete subject

#### User

- `GET /user` - List all users
- `GET /user/:id` - Get user by ID

## Database Schema

### Entity Relationships

```
User
  ├─ OneToMany → Ticket (as creator)
  ├─ OneToMany → Ticket (as assignee)
  └─ OneToMany → UserApplicationRole

Ticket
  ├─ ManyToOne → User (creator)
  ├─ ManyToOne → User (assignee)
  └─ ManyToOne → Subject

Service
  └─ OneToMany → Subject

Subject
  ├─ ManyToOne → Service (CASCADE delete)
  └─ OneToMany → Ticket

Application
  └─ OneToMany → ApplicationRole

ApplicationRole
  ├─ ManyToOne → Application
  └─ OneToMany → UserApplicationRole

UserApplicationRole
  ├─ ManyToOne → User (CASCADE delete)
  └─ ManyToOne → ApplicationRole (CASCADE delete)
```

### Key Entities

**User**

- `id` (UUID)
- `email` (unique)
- `firstName`, `lastName`
- `createdAt`, `updatedAt`

**Ticket**

- `id` (UUID)
- `title`, `description`
- `status`: OPEN | IN_PROGRESS | RESOLVED | CLOSED
- `priority`: LOW | MEDIUM | HIGH | URGENT
- `createdBy`, `assignedTo` (User references)
- `subjectId` (Subject reference)
- `createdAt`, `updatedAt`, `resolvedAt`

**Service**

- `id` (UUID)
- `name` (unique)
- `description`
- `isActive`

**Subject**

- `id` (UUID)
- `label`
- `description`
- `serviceId` (Service reference)

## Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugger

# Production
npm run build              # Compile TypeScript
npm run start:prod         # Run production build

# Code Quality
npm run format             # Format code with Prettier
npm run lint               # Lint and fix with ESLint

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Generate coverage report
npm run test:e2e           # Run end-to-end tests

# Docker
npm run docker             # Start Docker containers

# Database
npm run migration:create   # Create new migration
npm run migration:generate # Generate migration from entities
npm run migration:run      # Run pending migrations
npm run migration:revert   # Revert last migration
```

### Database Migrations

TixTrack uses TypeORM migrations for database schema management.

**Create a new migration:**

```bash
npm run migration:create -- MigrationName
```

**Generate migration from entity changes:**

```bash
npm run migration:generate -- MigrationName
```

**Run pending migrations:**

```bash
npm run migration:run
```

**Revert last migration:**

```bash
npm run migration:revert
```

**Important:** Always test migrations in a development environment before applying to production.

### Testing

The project uses Jest for unit and integration testing.

**Run all tests:**

```bash
npm test
```

**Run tests with coverage:**

```bash
npm run test:cov
```

**Run tests in watch mode (for TDD):**

```bash
npm run test:watch
```

**Run end-to-end tests:**

```bash
npm run test:e2e
```

## Security

### Authentication & Authorization

- **Session-based authentication** using secure HTTP-only cookies
- **Role-based access control (RBAC)** with `@Roles()` decorator
- **AuthGuard** validates session for protected routes
- **RoleGuard** enforces role-specific permissions

### Security Features

- **Helmet Integration** - HTTP security headers (CSP, X-Frame-Options, etc.)
- **Content Security Policy** - Configured for Swagger compatibility
- **HTTP-only Cookies** - Secure session management
- **Role-based Guards** - Fine-grained access control

### Best Practices

- Never commit `.env` files to version control
- Use strong passwords for database credentials
- Set `DATABASE_SYNC=false` in production (use migrations instead)
- Configure CORS appropriately for your frontend
- Keep dependencies up to date
- Review security advisories regularly

### Environment Configuration

**Development:**

```env
NODE_ENV=development
DATABASE_SYNC=true
```

**Production:**

```env
NODE_ENV=production
DATABASE_SYNC=false
```

## Roadmap

### Current Status

- [x] Core ticket management
- [x] Service and subject organization
- [x] User management
- [x] Role-based access control
- [x] Session authentication infrastructure
- [x] Docker support
- [x] Database migrations
- [x] API documentation (Swagger/OpenAPI)
- [x] Health check endpoints
- [x] Security headers (Helmet)
- [x] Multi-environment database configuration

### Planned Features

- [ ] Complete session management implementation
- [ ] Frontend application (React/Vue/Angular)
- [ ] Real-time notifications (WebSockets)
- [ ] Email notifications
- [ ] File attachments for tickets
- [ ] Comment/discussion threads
- [ ] Ticket history/audit log
- [ ] Dashboard and analytics
- [ ] Rate limiting and throttling
- [ ] Full-text search
- [ ] Advanced filtering and sorting
- [ ] Bulk operations
- [ ] Export functionality (PDF, CSV)
- [ ] Multi-language support (i18n)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint + Prettier)
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described
- Ensure all tests pass before submitting PR

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

For questions, issues, or feature requests, please open an issue on GitHub.

---

**Built with passion using NestJS** | **Powered by PostgreSQL**
