# Database Contract Specification (Shared PostgreSQL DB)

This document defines the explicit data contract between the **AllCollegeEvent AI Backend** and the **Shared PostgreSQL Database** owned by the Database/Backend Team.

> [!IMPORTANT]
> **Database Ownership Rule:**
> The AI Backend service does **NOT** own, alter, create, or run migrations (`npx prisma db push` / `prisma migrate`) against the PostgreSQL database.
> The AI backend consumes shared read tables and writes only to specific intelligence/recommendation tables via a clean **Database Adapter Layer** (`IDatabaseAdapter`).

---

## 📖 1. READ CONTRACT (Tables & Fields Expected from Shared DB)

The AI Backend requires read access to the following shared database entities:

### 1.1 `users`
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `id` | String (UUID/Text) | Primary Key |
| `email` | String | Unique email address |
| `passwordHash` | String | Encrypted password string |
| `role` | String / Enum (`STUDENT`, `ADMIN`) | User role |

### 1.2 `student_profiles`
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `id` | String (UUID/Text) | Primary Key |
| `userId` | String | Foreign Key referencing `users(id)` |
| `fullName` | String | Full name of the student |
| `collegeName` | String | Name of college / institute |
| `branch` | String | Academic branch (e.g. `Computer Science`) |
| `yearOfStudy` | Integer (1-5) | Current year of study |
| `degree` | String | Degree (e.g. `B.Tech`, `M.Tech`, `B.Sc`) |
| `location` | String | City / State / Region |
| `careerGoal` | String | Career objective (e.g. `AI Research Scientist`) |
| `bio` | String (Optional) | Short biography |

### 1.3 `interests` & `student_interests`
- `interests`: `id`, `name` (unique), `category`
- `student_interests`: `id`, `studentId`, `interestId`

### 1.4 `skills` & `student_skills`
- `skills`: `id`, `name` (unique), `category`
- `student_skills`: `id`, `studentId`, `skillId`, `proficiencyLevel` (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`, `EXPERT`)

### 1.5 `events`
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `id` | String (UUID/Text) | Primary Key |
| `title` | String | Title of event |
| `description` | Text | Full event description |
| `category` | String | Category (e.g. `AI & ML`, `Web Development`) |
| `eligibility` | String | Eligibility criteria |
| `requiredSkills` | Array of Strings / Text | Required technical skills |
| `location` | String | Venue or `Online` / `Remote` |
| `duration` | String | Event duration (e.g. `48 Hours`) |
| `startDate` | DateTime | Event start timestamp |
| `endDate` | DateTime (Optional) | Event end timestamp |
| `registrationDeadline` | DateTime | Deadline timestamp for registration |
| `organizer` | String | Organizer / Company name |
| `externalUrl` | String (Optional) | Link to external registration page |
| `imageUrl` | String (Optional) | Event banner URL |

### 1.6 `projects`, `hackathons`, `hackathon_participations`, `internships`
- `projects`: `id`, `studentId`, `title`, `description`, `githubUrl`, `demoUrl`
- `hackathons`: `id`, `title`, `organizer`, `date`, `location`
- `hackathon_participations`: `id`, `studentId`, `hackathonId`, `projectTitle`, `achievement`
- `internships`: `id`, `studentId`, `company`, `role`, `startDate`, `endDate`, `isCurrent`

### 1.7 `interactions`
| Field Name | Type | Description |
| :--- | :--- | :--- |
| `id` | String (UUID/Text) | Primary Key |
| `studentId` | String | Foreign Key referencing `student_profiles(id)` |
| `eventId` | String | Foreign Key referencing `events(id)` |
| `action` | Enum/String (`VIEW`, `SAVE`, `SHARE`, `REGISTER`, `DISMISS`, `SEARCH`, `CALENDAR_ADD`) | Interaction action |
| `metadata` | JSON (Optional) | Platform telemetry metadata |

---

## ✍️ 2. WRITE CONTRACT (Entities Updated/Created by AI Backend)

The AI backend persists data into the following tables:

### 2.1 `event_intelligence` (Agent 2 Output)
- `id`, `eventId`, `domains[]`, `skills[]`, `targetAudience[]`, `difficulty`, `careerPaths[]`, `prerequisites[]`, `learningOutcomes[]`, `eventType`, `contentHash`, `analyzedAt`

### 2.2 `recommendations` (Agent 1 Feed Output)
- `id`, `studentId`, `eventId`, `score` (Float 0.0-1.0), `reason`, `explanation`, `agentRefined` (Boolean), `status` (`ACTIVE`, `DISMISSED`)

### 2.3 `calendar_events`
- `id`, `studentId`, `eventId`, `startDate`, `registrationDeadline`, `reminderTime`, `reminderType`, `status`

### 2.4 `notifications` & `notification_preferences`
- `notifications`: `id`, `studentId`, `eventId`, `title`, `message`, `type` (`DEADLINE`, `RECOMMENDATION`), `isRead`
- `notification_preferences`: `studentId`, `enableDeadlineAlerts`, `enableRecommendationAlerts`, `emailNotifications`, `pushNotifications`

### 2.5 `ai_usage` & `ai_request_logs`
- `ai_usage`: `provider`, `model`, `requestType`, `inputTokens`, `outputTokens`, `totalTokens`, `estimatedCost`, `success`, `timestamp`
- `ai_request_logs`: `provider`, `model`, `requestType`, `inputPrompt`, `rawResponse`, `durationMs`, `success`, `errorMessage`

---

## 🔌 3. DATABASE ADAPTER ABSTRACTION (`IDatabaseAdapter`)

To prevent direct tight-coupling to PostgreSQL schema migrations:
- `PrismaDatabaseAdapter`: Production adapter connecting via Prisma ORM to shared PostgreSQL.
- `InMemoryDatabaseAdapter`: High-performance local adapter with pre-populated contract data for zero-dependency development and automated Jest testing.
