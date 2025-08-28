# Headhill Server

A professional NestJS application with PostgreSQL and Prisma ORM.

## 🏗️ Project Structure

```
src/
├── common/                 # Shared utilities and configurations
│   ├── config/            # Configuration modules
│   ├── decorators/        # Custom decorators
│   ├── interceptors/      # Custom interceptors
│   └── pipes/             # Custom pipes
├── database/              # Database service and module
├── generated/             # Generated Prisma client
├── modules/               # Feature modules
│   ├── users/            # User management
│   └── posts/            # Post management
├── app.controller.ts      # Main app controller
├── app.module.ts          # Main app module
├── app.service.ts         # Main app service
└── main.ts               # Application entry point

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seed data
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- Docker & Docker Compose
- PostgreSQL (if running locally)

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the database (using Docker):

```bash
docker-compose -f docker-compose.dev.yml up postgres -d
```

4. Generate Prisma client:

```bash
pnpm run db:generate
```

5. Run database migrations:

```bash
pnpm run db:migrate
```

6. Seed the database (optional):

```bash
pnpm run db:seed
```

7. Start the development server:

```bash
pnpm run start:dev
```

## 📦 Available Scripts

### Development

- `pnpm run start:dev` - Start development server with hot reload
- `pnpm run start:debug` - Start server in debug mode
- `pnpm run build` - Build the application
- `pnpm run start:prod` - Start production server

### Database

- `pnpm run db:generate` - Generate Prisma client
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:migrate` - Create and run migrations
- `pnpm run db:migrate:prod` - Deploy migrations in production
- `pnpm run db:seed` - Seed the database
- `pnpm run db:studio` - Open Prisma Studio
- `pnpm run db:reset` - Reset database and run migrations

### Testing & Linting

- `pnpm run test` - Run unit tests
- `pnpm run test:e2e` - Run end-to-end tests
- `pnpm run test:cov` - Run tests with coverage
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier

## 🐳 Docker Development

Start the entire development environment:

```bash
docker-compose -f docker-compose.dev.yml up
```

This will start:

- PostgreSQL database (port 5432)
- Adminer database UI (port 8080)
- NestJS application (port 3001)

## 🌐 API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Health Check

- `GET /` - Application health check

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: User management with authentication support
- **Posts**: Blog posts or content management
- **BaseModel**: Common fields for all entities (id, createdAt, updatedAt)

## 🔧 Configuration

Environment variables:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/headhill_db?schema=public"

# Application
NODE_ENV=development
PORT=3001

# Security
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1d
```

## 🛠️ Technology Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: class-validator, class-transformer
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Containerization**: Docker

## 📝 Development Best Practices

1. **Module Structure**: Each feature has its own module with controllers, services, and DTOs
2. **Database Access**: All database operations go through the DatabaseService
3. **Validation**: Use DTOs with class-validator decorators
4. **Error Handling**: Consistent error responses with proper HTTP status codes
5. **Configuration**: Environment-based configuration with type safety
6. **Database Migrations**: Always use Prisma migrations for schema changes

## 🔍 Database Management

### Adminer (Development)

Access the database UI at `http://localhost:8080` when running with Docker Compose.

**Connection details:**

- Server: `postgres`
- Username: `postgres`
- Password: `password`
- Database: `headhill_db`

### Prisma Studio

```bash
pnpm run db:studio
```

Opens Prisma Studio at `http://localhost:5555` for database management.

## 🚀 Production Deployment

1. Build the application:

```bash
pnpm run build
```

2. Run production migrations:

```bash
pnpm run db:migrate:prod
```

3. Start the production server:

```bash
pnpm run start:prod
```

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
