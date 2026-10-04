<div align="center">
  <img src="frontend/public/favicon.svg" alt="HackGURU logo" width="96" />
  <p>
    <img src="image2" alt="EC Learnox logo" width="220" />
    &nbsp;&nbsp;&nbsp;
    <img src="image1" alt="Ace All College Event logo in purple" width="220" />
  </p>
  <h1>HackGURU 2026</h1>
  <p><strong>AI-powered event discovery and opportunity intelligence for every college student.</strong></p>
  <p>
    <a href="https://ace-phi-five.vercel.app/">Live Demo</a> ·
    <a href="https://github.com/navneethvaradharaj11-dev/HackGURU">Repository</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js 15" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Flutter-Mobile-02569B?logo=flutter&logoColor=white" alt="Flutter" />
    <img src="https://img.shields.io/badge/License-All%20Rights%20Reserved-lightgrey" alt="License" />
  </p>
</div>

---

## About HackGURU 2026

**HackGURU 2026** is a production-ready, multi-platform intelligence platform created for **AllCollegeEvent**. It helps students discover hackathons, competitions, workshops, internships, and other high-value opportunities through personalized recommendations rather than generic event listings.

The platform combines a modern web experience, a Flutter mobile application, a secure TypeScript API, and an AI-assisted recommendation layer. Together, these components turn a large and constantly changing event ecosystem into a focused opportunity feed tailored to each student's interests, skills, eligibility, and goals.

> **Vision:** Make the right opportunity easier to discover, understand, and act on.

## What HackGURU Solves

Students often miss valuable opportunities because event information is fragmented, deadlines are difficult to track, and eligibility requirements are unclear. HackGURU addresses these challenges by providing:

- **Personalized discovery** based on a student's profile and interests
- **AI-assisted matching** with clear explanations for why an opportunity is relevant
- **Structured event intelligence** including domains, prerequisites, audience level, and learning outcomes
- **Deadline awareness** through dashboards and event alerts
- **Multi-platform access** across web and mobile
- **Reliable performance** through deterministic ranking, caching, and provider fallbacks

## Key Features

### Student Experience

- Personalized dashboard with opportunity insights and quick statistics
- Event and hackathon discovery with searchable categories and tags
- Recommendation feed with match scores and natural-language rationale
- Calendar-oriented planning and deadline visibility
- Student profile support for skills, interests, and preferred domains

### AI & Intelligence Layer

- **Opportunity Matcher:** ranks relevant opportunities and explains each match
- **Event Parser:** extracts domains, prerequisites, target audience, and outcomes
- Multi-provider AI gateway with fallback support
- Content-hash caching to reduce repeated model calls
- AI telemetry for usage, latency, cache performance, and estimated cost

### Platform & Engineering

- Responsive Next.js web application
- Flutter mobile application for Android and iOS
- Type-safe Node.js and TypeScript backend
- JWT authentication and validated API payloads
- Prisma/PostgreSQL support with an in-memory development adapter
- Automated tests with Jest and Supertest

## Architecture

```text
┌──────────────────────────────────────────────────────────────┐
│                    Flutter Mobile App                        │
│                  Android / iOS • Dart                        │
└──────────────────────────────┬───────────────────────────────┘
                               │ REST API
┌──────────────────────────────▼───────────────────────────────┐
│                    Next.js Web Application                    │
│                 React • TypeScript • Tailwind                 │
└──────────────────────────────┬───────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────┐
│              Node.js + TypeScript Intelligence API            │
│       Authentication • Ranking • AI Gateway • Telemetry       │
└──────────────────────────────┬───────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────┐
│              Prisma / PostgreSQL Data Layer                   │
│             In-memory adapter for local development           │
└──────────────────────────────────────────────────────────────┘
```

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Web | Next.js 15, React 19, TypeScript, Tailwind CSS |
| Mobile | Flutter, Dart, Material 3 |
| Backend | Node.js, Express, TypeScript |
| AI | Google Gemini, OpenAI, Hugging Face, offline fallback provider |
| Data | PostgreSQL, Prisma ORM, in-memory adapter |
| Security | JWT, bcryptjs, Helmet, Zod, CORS, rate limiting |
| Quality | Jest, Supertest, TypeScript strict mode |
| Deployment | Vercel |

## Project Structure

```text
.
├── frontend/             # Next.js web application
├── flutter_app/          # Flutter mobile application
├── src/                  # TypeScript backend and AI services
├── prisma/               # Database schema and Prisma configuration
├── docs/                 # Architecture and API documentation
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Flutter SDK 3+
- PostgreSQL (optional when using the in-memory adapter)

### 1. Install backend dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the repository root:

```env
DATABASE_ADAPTER="inmemory"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ace_ai_db?schema=public"

GEMINI_API_KEY_1="your_gemini_key"
OPENAI_API_KEY_1="your_openai_key"
HF_API_KEY_1="your_huggingface_key"
```

Never commit real credentials or production secrets to the repository.

### 3. Start the backend

```bash
npm run dev
```

The API runs on port `5000` by default.

### 4. Start the web application

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run the Flutter application

```bash
cd flutter_app
flutter pub get
flutter run
```

### 6. Run tests

From the repository root:

```bash
npm test
npx tsc --noEmit
```

## Live Application

- **Web application:** [ace-phi-five.vercel.app](https://ace-phi-five.vercel.app/)
- **Repository:** [navneethvaradharaj11-dev/HackGURU](https://github.com/navneethvaradharaj11-dev/HackGURU)

## Documentation

- [AI Architecture](docs/AI_ARCHITECTURE.md)
- [API Documentation](API_DOCUMENTATION.md)
- [Database Contract](DATABASE_CONTRACT.md)
- [Recommendation Engine](RECOMMENDATION_ENGINE.md)

## HackGURU 2026

HackGURU 2026 is built with a simple goal: **help students find opportunities that move their future forward**. From discovering a first hackathon to planning a complete learning and competition journey, the platform brings event discovery, personalization, and actionable intelligence into one experience.

## Contributing

Contributions, ideas, and feedback are welcome. Please open an issue to discuss a proposed change before submitting a pull request.

## License

© 2026 AllCollegeEvent.com. All rights reserved.

This project is currently intended for the HackGURU 2026 event and is not distributed under an open-source license.
