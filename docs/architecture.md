# Fitness Bot (Agentic AI) - System Architecture

## 1) ER-to-Relational Database Schema

### Core entities (normalized)
- `users` (account + auth identity)
- `user_profiles` (1:1 with users)
- `chats` and `messages` (1:N)
- `workouts` and `workout_exercises` (1:N)
- `nutrition_logs` (1:N from users)
- `progress_metrics` (1:N from users, unique by date)
- `goals` (1:N from users)
- `ai_plans` (1:N from users)
- `reminders` (1:N from users)
- `user_agent_preferences` (1:1 with users)

### Relationships
- **One-to-One**
  - `users` -> `user_profiles`
  - `users` -> `user_agent_preferences`
- **One-to-Many**
  - `users` -> `workouts`, `nutrition_logs`, `progress_metrics`, `goals`, `ai_plans`, `reminders`, `chats`
  - `chats` -> `messages`
  - `workouts` -> `workout_exercises`
- **Many-to-Many (pattern)**
  - `workouts` <-> `exercises` represented as junction-like `workout_exercises`.

### Integrity + performance
- PKs are UUIDs.
- FK constraints with `ON DELETE CASCADE`.
- Check constraints for enum-like fields, ranges, and statuses.
- Unique constraints on business keys (`users.email`, `progress_metrics(user_id, metric_date)`).
- Composite indexes for high-frequency user timeline queries.

## 2) Backend Design (Node.js + Express)

### Layered structure
- `controllers/` request/response orchestration
- `services/` domain logic and DB operations
- `middleware/` auth, RBAC, error handling
- `jobs/` async autonomous scheduler
- `agent/` (extendable) LLM orchestration and tool routing

### Security
- JWT access tokens
- Role-based authorization (`user`, `admin`, `ai_agent`)
- Helmet + CORS + body-size limits
- Input validation with Joi

## 3) API Endpoints (REST)

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/users` (admin)
- `GET /api/v1/users/me/profile`
- `PUT /api/v1/users/me/profile`
- `GET /api/v1/workouts`
- `POST /api/v1/workouts`
- `GET /api/v1/nutrition-logs`
- `POST /api/v1/agent/run-cycle` (admin/ai_agent)

## 4) Agentic AI Workflow

1. Scheduler (`node-cron`) triggers autonomous cycle every 30 min.
2. Agent calls tools:
   - `getUserContext`
   - `createWorkoutPlan`
   - `createReminder`
3. Agent stores generated plan in `ai_plans`.
4. Reminders are persisted with cron syntax and consumed by downstream notification workers.
5. Conversation memory persists in `messages` table.

### Tool/function calling design
- Each tool has strict input/output schema (JSON contract).
- LLM controller decides next tool call from context.
- DB write tools are idempotent-safe via upserts/guards where needed.

## 5) Frontend (Next.js)

Pages:
- `/auth/onboarding` account creation
- `/dashboard` profile + progress snapshot
- `/workouts` dynamic workout listing
- `/chat` AI cycle trigger and response pane

Security:
- API token in `Authorization` header
- backend CORS allow-list recommended in production

## 6) Deployment-ready setup

### Suggested folders
- `backend/` (API + scheduler + DB access)
- `frontend/` (Next app)
- `docs/` (architecture, flows)

### Runtime components
- Next.js frontend (container 1)
- Express API (container 2)
- PostgreSQL (container 3)
- Optional worker for reminders/notifications

### API flow (request path)
Client -> Next UI -> Express Route -> Middleware (JWT/RBAC/validation) -> Service -> PostgreSQL -> JSON response

### AI flow
Scheduler/User action -> Agent orchestrator -> Tool calls -> DB updates -> Notification queue -> UI refresh
