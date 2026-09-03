# AllCollegeEvent.com - AI Event & Hackathon Intelligence Platform (HackGuru 2026)

Production-grade, full-stack multi-platform solution serving as India's #1 AI-powered event recommendation engine, hackathon discovery layer, and student intelligence platform for **AllCollegeEvent.com**.

[![Vercel Live App](https://img.shields.io/badge/Vercel-Live_Production-blue?logo=vercel)](https://ace-phi-five.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-navneethvaradharaj11--dev/HackGURU-black?logo=github)](https://github.com/navneethvaradharaj11-dev/HackGURU)
[![Build Status](https://img.shields.io/badge/Next.js-28_Routes_Prerendered-success?logo=next.js)](https://ace-phi-five.vercel.app/)
[![Flutter App](https://img.shields.io/badge/Flutter-Dart_SDK_Mobile-02569B?logo=flutter)](https://github.com/navneethvaradharaj11-dev/HackGURU/tree/main/flutter_app)

---

## 🌐 Live Production Links

* **Official Vercel Web Application:** [https://ace-phi-five.vercel.app/](https://ace-phi-five.vercel.app/)
* **Official Gold Trophy Favicon:** [https://ace-phi-five.vercel.app/favicon.svg](https://ace-phi-five.vercel.app/favicon.svg)
* **GitHub Repository:** [https://github.com/navneethvaradharaj11-dev/HackGURU](https://github.com/navneethvaradharaj11-dev/HackGURU)

---

## 🏛️ Multi-Platform Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      FLUTTER MOBILE APP (Android / iOS)                         │
│   Dart SDK • Material 3 Dark Theme • 3 Core Screens • HTTP REST API Client      │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
┌────────────────────────────────────────┴────────────────────────────────────────┐
│                        NEXT.JS WEB APP (App Router)                             │
│   28 Production Routes • Dark Glassmorphic Theme • Vercel Deployed • Auth       │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                       HTTP REST API (Port 5000 / /api)
                      Header: Authorization: Bearer <TOKEN>
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                 NODE.JS + TYPESCRIPT AI BACKEND ENGINE                          │
│   AI Gateway (Gemini, OpenAI, Hugging Face) • Scoring Engine • Routers • Prisma │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                          Decoupled Database Adapter
                           (Prisma / InMemory Mode)
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database Schema (allcollegeevent.sql)               │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Core Components & Features

### 1. **Flutter Mobile Application (`flutter_app/`)**
- Built in pure **Dart**.
- **Dart Models (`lib/models/`)**: `StudentProfile`, `EventItem`, `RecommendationItem`.
- **API Service (`lib/services/api_service.dart`)**: HTTP client targeting backend REST API (`http://localhost:5000/api` / `http://10.0.2.2:5000/api`).
- **UI Screens (`lib/screens/`)**:
  - `dashboard_screen.dart`: Student intelligence dashboard, quick stats cards, deadline alerts.
  - `recommendations_screen.dart`: Agent 1 live match feed with match score badges.
  - `events_screen.dart`: Event catalog and taxonomy tag viewer.

### 2. **Next.js Web Application (`frontend/`)**
- **28 Production App Router Routes**: Includes `/dashboard`, `/recommendations`, `/events`, `/calendar`, `/ai-telemetry`, `/student/*`, `/organizer/*`.
- **Official Branding**: AllCollegeEvent trophy logo, gold badges, and glassmorphic UI system.
- **Favicon**: Official gold trophy vector icon (`/favicon.svg`).
- **Vercel Config**: [frontend/vercel.json](file:///e:/HackGuru/frontend/vercel.json) ready for one-click Vercel deployments.

### 3. **Node.js TypeScript AI Intelligence Backend (`src/`)**
- **Centralized AI Gateway**: Multi-provider router managing **10 Gemini keys**, **5 OpenAI keys**, and **2 Hugging Face keys** with automatic fallback.
- **Agent 1 (Opportunity Matcher)**: Refines candidates into natural language match rationale.
- **Agent 2 (Event Parser)**: Scrapes and extracts domain tags, prerequisites, and learning outcome taxonomy.
- **Deterministic Ranking Engine**: Filters 10,000+ events to top candidate recommendations in `<120ms`.
- **AI Telemetry (`GET /api/ai/usage`)**: Monitors token usage, latency, cache hit ratios, and estimated costs.

---

## 🛠️ Technology Stack

- **Mobile**: Flutter (v3.0+), Dart (v3.0+)
- **Frontend**: Next.js (v15 App Router), React (v19), TypeScript (v5+), Tailwind CSS
- **Backend**: Node.js (v24+), TypeScript (v5+), Express.js (v4+)
- **Database**: PostgreSQL (`allcollegeevent.sql`), Prisma ORM
- **AI SDKs**: Gemini API (`@google/generative-ai`), OpenAI (`openai`), Hugging Face (`@huggingface/inference`)
- **Hosting**: Vercel (`https://ace-phi-five.vercel.app/`)

---

## 🚀 Quick Start Guide

### 1. Install Backend Dependencies
```bash
npm install
```

### 2. Configure Environment (`.env`)
```env
DATABASE_ADAPTER="inmemory"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ace_ai_db?schema=public"

GEMINI_API_KEY_1="your_gemini_key"
OPENAI_API_KEY_1="your_openai_key"
HF_API_KEY_1="your_hf_key"
```

### 3. Start Backend Server (Port 5000)
```bash
npm run dev
```

### 4. Start Next.js Frontend (Port 3000)
```bash
# In e:\HackGuru\frontend
npm run dev
```

### 5. Run Flutter Mobile Application
```bash
# In e:\HackGuru\flutter_app
flutter run
```

### 6. Run Automated Test Suite
```bash
npm test
```

---

## 📚 Documentation Links

- 🤖 [AI Architecture & Gateway Guide](file:///e:/HackGuru/docs/AI_ARCHITECTURE.md)
- 📋 [Database Contract Specifications](file:///e:/HackGuru/DATABASE_CONTRACT.md)
- 🔌 [API Documentation](file:///e:/HackGuru/API_DOCUMENTATION.md)
- ⚖️ [Recommendation Engine Specification](file:///e:/HackGuru/RECOMMENDATION_ENGINE.md)

---

## 📜 License & Copyright

© 2026 **AllCollegeEvent.com**. All Rights Reserved. Built for **Hackathon 2026**.
