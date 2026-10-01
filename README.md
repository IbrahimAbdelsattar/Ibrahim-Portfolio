# Ibrahim Abdelsattar — Portfolio

A React portfolio presenting AI and data science projects, professional background, certifications, and contact information, with a separate conversational assistant backend.

**Technology:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · FastAPI

## Features

- Navigate home, about, project catalog, project details, certifications, and contact pages.
- Explore all 60 owned GitHub repositories (42 public, 18 private), with upstream attribution for 9 forks.
- Search repository names and technologies, filter categories and source type, and share filtered URLs.
- Open a dedicated detail route for each entry; load the catalog in batches of 12.
- Use the Sapphire Veil palette (`#E7F0FA`, `#7BA4D0`, `#2E5E99`, `#0D2440`) in light and dark themes.
- Interact with spring-driven 3D cards, pointer-responsive particles, and route transitions. Motion adapts to touch devices and reduced-motion preferences.
- Provide an interactive chatbot UI connected to the separate FastAPI service.
- Include archived datasets and notebooks from selected portfolio projects.

## Repository guide

| Path | Purpose |
|---|---|
| [src/App.tsx](src/App.tsx) | Portfolio routes. |
| [src/pages](src/pages) | Portfolio pages. |
| [src/components](src/components) | UI and chatbot components. |
| [public](public) | Public assets and resume. |
| [chatbot_api.py](chatbot_api.py) | FastAPI conversational endpoint. |
| [package.json](package.json) | Frontend scripts and dependencies. |

## Requirements and current limitations

The catalog is a reviewed snapshot of the account, not a live GitHub API feed. Update `src/data/projects.ts` and the inventory test fixture when repositories change. Private entries show portfolio summaries without public source links; forks identify their upstream authors.

Portfolio project content is maintained in the frontend source; the presence of another project's notebook or dataset here does not make it part of the website's runtime. A separate `agent_server.py` exists, but it is not needed for the documented portfolio launch.

## UI architecture

```mermaid
flowchart TD
    App["Persistent app shell"] --> Routes["Lazy page routes"]
    App --> Motion["Theme and motion preferences"]
    Routes --> Catalog["Project catalog"]
    Routes --> Detail["Project detail"]
    Data["Reviewed repository inventory"] --> Catalog
    Data --> Detail
    Catalog --> Filters["URL search and filters"]
    Filters --> Cards["Progressive 3D cards"]
    Cards --> Detail
```

## UML diagrams

### Main workflow

Portfolio navigation runs in React. The optional chat request reaches FastAPI, which uses OmniRoute and falls back to local portfolio answers if the provider call fails.

```mermaid
sequenceDiagram
    actor Visitor
    participant UI as React portfolio
    participant API as chatbot_api.py
    participant Gateway as OmniRoute
    Visitor->>UI: Browse routes and project details
    UI-->>Visitor: Render local portfolio content
    opt Chatbot API connected
        Visitor->>UI: Ask a portfolio question
        UI->>API: POST /api/chat
        API->>API: Rate-limit and sanitize message
        API->>Gateway: Request chat completion
        alt Provider succeeds
            Gateway-->>API: Generated answer
        else Provider fails
            API->>API: Select local fallback answer
        end
        API->>API: Clean response formatting
        API-->>UI: ChatResponse reply
        UI-->>Visitor: Display answer
    end
```

## Getting started

```bash
git clone https://github.com/IbrahimAbdelsattar/Ibrahim-Portfolio.git
cd Ibrahim-Portfolio
```

```bash
npm ci
npm run dev
```

Open the local origin printed by the development server.

### Available scripts

| Command | Purpose |
|---|---|
| `npm run build` | Create a production build. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Check frontend TypeScript. |
| `npm test` | Check inventory coverage, source attribution, privacy, and existing project URLs. |
| `npm run preview` | Preview the Vite production build. |

## Optional chatbot API

The API is separate from the Vite development server:

```bash
python -m pip install fastapi uvicorn
python -m uvicorn chatbot_api:app --reload --port 8000
```

The service exposes `POST /api/chat` and `GET /health`. Check the API address used in `src/components/IbrahimChatbot.tsx` and the model/provider settings in `chatbot_api.py` before connecting a local frontend. Provider access is an additional runtime dependency.
