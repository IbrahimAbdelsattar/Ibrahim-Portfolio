import type { Project } from "./types";

/**
 * Evidence standard for this file
 * ---------------------------------
 * - `description` / `highlights` are derived from repository READMEs, repo trees,
 *   GitHub language stats and live HTTP checks performed 2026-10-01.
 * - `githubUrl` is set ONLY for publicly reachable repositories. A repository
 *   that exists but is private is flagged via `sourcePrivate` instead, so the
 *   UI never renders a link that 404s for a visitor.
 * - `status` reflects documented deployment evidence, not optimism.
 * - Forks of other people's projects are intentionally excluded (see EXCLUDED).
 *
 * Architecture: every entry here is one record. Adding a project means adding
 * one object — see the "Adding a project" note at the bottom of this file.
 */
export const projects: Project[] = [
  // =====================================================================
  // FLAGSHIP — AI products with real depth
  // =====================================================================
  {
    id: "dawrly",
    title: "Dawrly",
    tagline: "AI job-matching and career-intelligence platform for the Egyptian and MENA market.",
    category: "AI Products",
    status: "Production",
    tier: "flagship",
    year: "2025",
    role: "Full-Stack AI Engineer",
    description:
      "Dawrly is an enterprise job-matching platform that ingests job postings, structures them into a searchable index, and scores them against a user's profile to surface ranked recommendations. The backend is a layered FastAPI service running behind PostgreSQL with pgvector, with Redis-backed Celery workers handling scraping and enrichment off the request path. The frontend is a React 19 / TypeScript SPA. The repository ships full C4 architecture documentation, a database ER model, auth and job-recommendation sequence diagrams, and a CI/CD pipeline that deploys through Dokploy and Traefik.",
    problem:
      "Job discovery across the Egyptian and MENA market is fragmented across unnormalised listings, and candidates cannot reliably judge which roles actually fit their profile.",
    highlights: [
      "Layered FastAPI backend with PostgreSQL and pgvector-backed storage",
      "Redis + Celery async workers for scraping and enrichment off the request path",
      "React 19 + TypeScript frontend with Zustand state management",
      "AI gateway routing layer for model calls (OmniRoute mesh)",
      "Comprehensive C4, ER, sequence and activity diagram set in-repo",
      "GitHub Actions CI/CD deploying to Dokploy behind Traefik",
      "Clerk-based authentication with an auth-bridge sequence to Wajehni",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Celery",
      "Docker",
      "Dokploy",
    ],
    architecture: {
      backend: ["FastAPI", "Celery workers"],
      frontend: ["React 19", "TypeScript", "Zustand"],
      ai: ["AI gateway routing", "pgvector embeddings"],
      database: ["PostgreSQL", "pgvector"],
      infrastructure: ["Docker", "Dokploy", "Traefik", "GitHub Actions"],
      integrations: ["Clerk auth"],
    },
    sourcePrivate: true,
    liveUrl: "https://dawrly.space",
    relatedRepos: [
      {
        slug: "tea-tec",
        isPrivate: true,
        role: "Shared account/auth ecosystem",
      },
    ],
    image: "/project-images/dawrly-platform.jpg",
  },
  {
    id: "wajehni",
    title: "Wajehni (Nexus Academy)",
    tagline: "AI career guidance and adaptive learning platform that turns aptitude into a study roadmap.",
    category: "AI Products",
    status: "Production",
    tier: "flagship",
    year: "2026",
    role: "Full-Stack AI Engineer",
    description:
      "Wajehni is an adaptive learning and career-guidance product. It assesses a learner's aptitudes, then synthesises a personalised track of milestones and recommended resources instead of serving a fixed catalogue. The application is built on Next.js with React, TypeScript, Tailwind CSS and Vite, and is presented under the Neuronix product ecosystem as the career-guidance and adaptive-learning line.",
    problem:
      "Static course catalogues do not adapt to a learner's actual strengths, so students finish programmes without a clear route from assessment to employment.",
    highlights: [
      "Aptitude-driven assessment that produces a personalised learning roadmap",
      "Adaptive curriculum synthesis with milestone and resource recommendations",
      "Next.js + React + TypeScript + Tailwind CSS + Vite stack",
      "Part of the Neuronix AI Solutions product ecosystem",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vite"],
    architecture: {
      frontend: ["Next.js", "React", "Tailwind CSS"],
      infrastructure: ["Vite"],
    },
    sourcePrivate: true,
    image: "/project-images/wajehni-ai.jpg",
  },
  {
    id: "supplymind-ai",
    title: "SupplyMind AI",
    tagline: "Demand forecasting and inventory intelligence for supply-chain operations.",
    category: "AI Products",
    status: "Production",
    tier: "flagship",
    year: "2026",
    role: "AI Engineer",
    description:
      "SupplyMind AI is an enterprise supply-chain platform covering forecasting, inventory optimisation, explainability and MLOps with real-time alerting. It combines gradient-boosted demand forecasting with retrieval-augmented generation and multi-agent orchestration, and emits concrete inventory actions — economic order quantity, safety stock and reorder point — rather than raw forecasts. The stack spans FastAPI, React, PostgreSQL, LangGraph, ChromaDB and OpenRouter-hosted LLMs.",
    problem:
      "Inventory decisions are made on gut feel and spreadsheets, so teams either over-order and tie up capital or under-stock and lose service levels.",
    highlights: [
      "XGBoost demand-forecasting models feeding inventory policy outputs",
      "Automated EOQ, safety-stock and reorder-point recommendations",
      "RAG layer over ChromaDB with explainable-AI output for every recommendation",
      "Multi-agent orchestration via LangGraph with executive insight summaries",
      "Conversational decision support over the operational data",
      "FastAPI service, React frontend and PostgreSQL persistence",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "LangGraph",
      "ChromaDB",
      "XGBoost",
      "RAG",
      "MLOps",
      "Docker",
    ],
    architecture: {
      backend: ["FastAPI"],
      frontend: ["React"],
      ai: ["XGBoost", "LangGraph agents", "RAG", "LLMs via OpenRouter"],
      database: ["PostgreSQL", "ChromaDB"],
      infrastructure: ["MLOps pipelines", "Docker"],
    },
    githubUrl: "https://github.com/IbrahimAbdelsattar/SupplyMindAI",
    image: "/project-images/supplymind-ai.jpg",
  },
  {
    id: "mesdaq-ai",
    title: "Mesdaq AI",
    tagline: "Arabic misinformation detection with credibility scoring and generated explanations.",
    category: "AI Products",
    status: "Production",
    tier: "flagship",
    year: "2026",
    role: "AI Engineer",
    description:
      "Mesdaq AI detects Arabic misinformation and scores the credibility of news claims. It combines a fine-tuned AraBERT classifier with four auxiliary linguistic feature modules — sentiment, clickbait, named-entity recognition and text statistics — then produces a human-readable explanation of its verdict through a generative verification service. A React frontend and FastAPI backend return a credibility score between 0 and 100 with the supporting linguistic analysis.",
    problem:
      "Arabic-language misinformation spreads without an accessible way to assess whether a claim is credible, and existing general-purpose classifiers do not handle Arabic linguistic structure well.",
    highlights: [
      "Fine-tuned AraBERT transformer for Arabic claim classification",
      "Four auxiliary NLP feature modules: sentiment, clickbait, NER, text statistics",
      "Generative verification service producing human-readable explanations",
      "Credibility score from 0–100 returned per request",
      "React frontend with FastAPI backend and database persistence",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Python",
      "FastAPI",
      "AraBERT",
      "Transformers",
      "NLP",
      "Explainable AI",
    ],
    architecture: {
      frontend: ["React", "TypeScript"],
      backend: ["FastAPI"],
      ai: ["AraBERT", "Transformer fine-tuning", "LLM explanation service"],
      infrastructure: ["Microservices"],
    },
    githubUrl: "https://github.com/IbrahimAbdelsattar/Mesdaq_AI",
    image: "/project-images/mesdaq-ai.jpg",
  },
  {
    id: "eva-ai",
    title: "Eva AI",
    tagline: "Retrieval-augmented clinical decision support for adrenal insufficiency.",
    category: "AI Products",
    status: "Active Development",
    tier: "flagship",
    year: "2026",
    role: "AI Engineer",
    description:
      "Eva AI is a clinical decision-support system for adrenal insufficiency. It retrieves relevant clinical context and surfaces decision support to clinicians rather than answering from model weights alone, which keeps the output grounded in retrievable sources. The repository carries a GitHub Actions CI/CD pipeline, so changes are validated automatically.",
    problem:
      "Adrenal insufficiency management is context-sensitive, and clinicians need decision support that cites retrievable evidence rather than free-form generation.",
    highlights: [
      "Retrieval-augmented generation grounding output in clinical context",
      "Purpose-built for adrenal insufficiency decision support",
      "GitHub Actions CI/CD pipeline in the repository",
    ],
    technologies: ["Python", "RAG", "LLMs", "GitHub Actions"],
    architecture: {
      ai: ["RAG", "Clinical decision support"],
      infrastructure: ["GitHub Actions CI/CD"],
    },
    githubUrl: "https://github.com/IbrahimAbdelsattar/Eva-AI",
    image: "/project-images/eva-ai.jpg",
  },
  {
    id: "vox-mind",
    title: "VoxMind",
    tagline: "Multimodal speech platform for early Alzheimer's and MCI detection.",
    category: "AI Products",
    status: "Research",
    tier: "flagship",
    year: "2026",
    role: "AI Engineer",
    description:
      "VoxMind is a clinical decision-support and governance platform for early Alzheimer's disease and mild cognitive impairment detection from speech. It denoises recordings with DeepFilterNet3, segments voice activity with Silero VAD, transcribes with a speech-to-text model, and then fuses acoustic biomarkers with linguistic NLP features into a decision model built on a LoRA-tuned language model plus XGBoost. Access is governed through Clerk SSO and organisation join codes, with audit logging over a Supabase Postgres instance using row-level security.",
    problem:
      "Early cognitive decline is detectable in speech long before it is caught by standard cognitive screening, but clinicians lack tooling that fuses acoustic and linguistic signal under proper clinical governance.",
    highlights: [
      "Acoustic biomarkers extracted after DeepFilterNet3 denoising and Silero VAD segmentation",
      "Speech-to-text transcription pipeline feeding linguistic NLP features",
      "Multimodal fusion of acoustic and linguistic signal into a decision model",
      "Decision model combining a LoRA-tuned LLM with XGBoost",
      "Clerk SSO with organisation join codes and Supabase row-level security",
      "HIPAA-oriented audit and governance layer",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "Tailwind CSS",
      "DeepFilterNet3",
      "Silero VAD",
      "XGBoost",
      "LoRA",
      "Clerk",
      "Supabase",
      "Audio DSP",
    ],
    architecture: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      backend: ["FastAPI"],
      ai: ["Acoustic biomarkers", "Linguistic NLP", "Multimodal fusion", "LoRA", "XGBoost"],
      database: ["Supabase Postgres", "RLS"],
      infrastructure: ["Clerk SSO", "Audit governance"],
    },
    sourcePrivate: true,
    image: "/project-images/audio-classification.png",
  },
  {
    id: "trio-lms",
    title: "Trio Academy (Trio Learning Hub)",
    tagline: "Enterprise corporate learning management system built for a catering organisation.",
    category: "Full-Stack Systems",
    status: "Production",
    tier: "flagship",
    year: "2026",
    role: "AI Engineer",
    description:
      "Trio Academy is an enterprise corporate LMS built for Trio Catering. It is a two-tier application: a Vite + React 18 + TypeScript frontend using Tailwind CSS, shadcn/ui, Framer Motion and TanStack Query, backed by an ASP.NET Core 8 Web API written to Clean Architecture with EF Core 8 and FluentValidation. Authentication uses short-lived JWT access tokens with rotating refresh tokens in Secure HttpOnly cookies. Video delivery is handled through Bunny Stream with signed playback URLs, file storage sits behind a pluggable abstraction, and the whole stack runs under Docker Compose with an Nginx reverse proxy and health checks. The API enforces a no-Supabase boundary that is verified in CI.",
    problem:
      "A large multi-site catering organisation needs structured corporate training with role-scoped access, durable video delivery and auditable progress tracking rather than ad-hoc document sharing.",
    highlights: [
      "ASP.NET Core 8 Web API structured with Clean Architecture and EF Core 8",
      "JWT access tokens with rotating refresh tokens in Secure HttpOnly cookies",
      "Bunny Stream video delivery with signed playback URLs",
      "Pluggable file-storage abstraction: local Docker volume in dev, object-storage ready",
      "MySQL 8.4 via the Pomelo EF Core provider",
      "Docker Compose with Nginx reverse proxy and health checks",
      "CI-enforced no-Supabase boundary across auth, data, APIs and storage",
    ],
    technologies: [
      "ASP.NET Core 8",
      "C#",
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "MySQL",
      "EF Core",
      "Docker",
      "Nginx",
      "JWT",
    ],
    architecture: {
      frontend: ["React 18", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack Query"],
      backend: ["ASP.NET Core 8", "Clean Architecture", "FluentValidation"],
      database: ["MySQL 8.4", "EF Core 8"],
      infrastructure: ["Docker Compose", "Nginx", "Health checks"],
      integrations: ["Bunny Stream", "ASP.NET Identity"],
    },
    sourcePrivate: true,
    liveUrl: "https://trio-academy.tech",
    relatedRepos: [
      {
        slug: "trio-learn-hub",
        isPrivate: true,
        role: "Earlier generation of the same LMS line",
      },
    ],
    image: "/project-images/trio-lms.jpg",
  },
  {
    id: "tea-tec",
    title: "TeaTec",
    tagline: "Bilingual Arabic-first e-learning SaaS built around condensed, practical sessions.",
    category: "Full-Stack Systems",
    status: "Active Development",
    tier: "flagship",
    year: "2026",
    role: "Full-Stack AI Engineer",
    description:
      "TeaTec is a bilingual, Arabic-first e-learning SaaS platform built on a condensed-learning philosophy: each field is distilled into focused two-hour sessions paired with interactive assessments and automated certificates. The product pairs a web client with a native Android client so learners can move between desktop coursework and mobile study without losing progress.",
    problem:
      "Learners abandon long courses before completing them, and Arabic-language technical material is poorly served by platforms designed for English-first audiences.",
    highlights: [
      "Condensed two-hour sessions per topic instead of long course tracks",
      "Interactive assessments paired with each session",
      "Automated certificate issuance on completion",
      "Bilingual Arabic-first interface",
      "Matching native Android client for mobile study",
    ],
    technologies: ["TypeScript", "React", "Kotlin", "Android", "Tailwind CSS", "REST API"],
    architecture: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Kotlin / Android"],
      integrations: ["REST API"],
    },
    sourcePrivate: true,
    relatedRepos: [
      {
        slug: "TeaTec-Android",
        isPrivate: true,
        role: "Native Android client for the same product",
      },
    ],
    image: "/project-images/teatec-platform.jpg",
  },
  {
    id: "c-sat",
    title: "Trio C-SaT",
    tagline: "Customer-satisfaction platform for corporate and factory catering operations.",
    category: "Full-Stack Systems",
    status: "Active Development",
    tier: "notable",
    year: "2026",
    role: "Full-Stack AI Engineer",
    description:
      "C-SaT is an enterprise customer-satisfaction platform built for corporate and factory catering operations. It combines a React 19 and TypeScript frontend styled with Tailwind CSS 4 on Vite 6, an Express 4 API and PostgreSQL 16 for persistence, with OmniRoute providing the AI layer. CI/CD runs through GitHub Actions.",
    problem:
      "Catering operations serving factory and corporate sites collect satisfaction feedback across disconnected channels, with no consolidated view to act on.",
    highlights: [
      "React 19 + TypeScript + Tailwind CSS 4 on Vite 6",
      "Express 4 API with PostgreSQL 16 persistence",
      "OmniRoute AI layer for feedback analysis",
      "GitHub Actions CI/CD",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Express",
      "PostgreSQL",
      "OmniRoute",
      "GitHub Actions",
    ],
    architecture: {
      frontend: ["React 19", "TypeScript", "Tailwind CSS", "Vite"],
      backend: ["Express 4"],
      database: ["PostgreSQL 16"],
      ai: ["OmniRoute AI gateway"],
      infrastructure: ["GitHub Actions CI/CD"],
    },
    sourcePrivate: true,
    image: "/project-images/customer-churn.png",
  },
  {
    id: "jarvis",
    title: "JARVIS",
    tagline: "Holographic hands-free AI chief of staff for executive operations.",
    category: "AI Products",
    status: "Active Development",
    tier: "notable",
    year: "2026",
    role: "Full-Stack AI Engineer",
    description:
      "JARVIS is a hands-free executive assistant interface: a React 19 and Three.js front end paired with MediaPipe hand tracking, driven by a FastAPI service on Python 3.13, with model calls routed through the OmniRoute AI gateway. The interface is designed to be operated without a keyboard — gesture and voice input drive a persistent view of current operations.",
    problem:
      "Executive workflows are fragmented across tools that all demand a keyboard and a mouse, which makes monitoring and acting on them during live operations impractical.",
    highlights: [
      "React 19 + Three.js front end with a holographic HUD presentation",
      "MediaPipe hand tracking for keyboard-free operation",
      "FastAPI service on Python 3.13",
      "OmniRoute AI gateway for model routing",
      "Persistent operations view for hands-free monitoring",
    ],
    technologies: [
      "React 19",
      "Three.js",
      "MediaPipe",
      "FastAPI",
      "Python",
      "OmniRoute",
      "TypeScript",
    ],
    architecture: {
      frontend: ["React 19", "Three.js", "MediaPipe"],
      backend: ["FastAPI", "Python 3.13"],
      ai: ["OmniRoute AI gateway"],
    },
    sourcePrivate: true,
    image: "/project-images/jarvis-hud.jpg",
  },
  {
    id: "neuronix",
    title: "Neuronix AI Solutions",
    tagline: "The product umbrella behind Dawrly, Wajehni, Eva AI, VoxMind and Mesdaq AI.",
    category: "AI Products",
    status: "Production",
    tier: "notable",
    year: "2026",
    role: "Founder",
    description:
      "Neuronix AI Solutions is the parent brand and product registry for the AI product portfolio. Rather than applying AI to client problems as a consultancy, Neuronix builds and maintains its own products, each targeting a specific real-world problem: Dawrly for job discovery, Wajehni for career guidance and adaptive learning, Eva AI for clinical decision support, VoxMind for speech-based cognitive screening, and Mesdaq AI for Arabic misinformation detection. The registry is data-driven so a new product can be added without redesigning the site, which also keeps the portfolio here in sync with the product catalogue.",
    problem:
      "Independent AI products fragment into unrelated identities; Neuronix gives them one coherent home and a shared release process.",
    highlights: [
      "Single product registry driving the corporate site and this portfolio",
      "Five distinct production AI products under one brand",
      "Deployed to Cloud Run with a standalone Next.js build",
      "Adding a product is a data change, not a redesign",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Cloud Run", "Docker"],
    architecture: {
      frontend: ["Next.js", "React", "Tailwind CSS"],
      infrastructure: ["Cloud Run", "Docker", "Standalone build"],
    },
    sourcePrivate: true,
    liveUrl: "https://neuronix-843213893012.europe-west1.run.app",
    image: "/project-images/dawrly-platform.jpg",
  },
  {
    id: "numerix",
    title: "Numerix",
    tagline: "Interactive numerical-analysis platform with step-by-step algorithmic solvers.",
    category: "Full-Stack Systems",
    status: "Prototype",
    tier: "notable",
    year: "2026",
    role: "Full-Stack AI Engineer",
    description:
      "Numerix is an interactive web platform for numerical analysis and mathematical computing. It walks through algorithms step by step, compares methods side by side in a race dashboard, visualises error topologies in 3D, and plots live convergence benchmarks so the behaviour of a method is visible rather than merely asserted.",
    problem:
      "Numerical methods are usually taught as formulas on paper, which hides the convergence behaviour that actually distinguishes one method from another.",
    highlights: [
      "Step-by-step algorithmic solvers rather than black-box results",
      "Multi-method comparison race dashboard",
      "3D error-topology visualisation",
      "Real-time convergence benchmarking",
      "Interactive pedagogical labs",
    ],
    technologies: ["TypeScript", "JavaScript", "Web", "Data Visualisation"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Numerix",
    image: "/project-images/numerix-platform.jpg",
  },

  // =====================================================================
  // NOTABLE — Generative AI, NLP, speech and production ML pipelines
  // =====================================================================
  {
    id: "mr-nlp-rag",
    title: "MR NLP Robust RAG",
    tagline: "Multimodal voice and document RAG with adaptive embedding failover.",
    category: "Generative AI & Agents",
    status: "Production",
    tier: "notable",
    year: "2025",
    role: "AI Engineer",
    description:
      "A multimodal retrieval-augmented generation platform that answers from both documents and speech. Audio is transcribed before indexing, retrieval runs against a high-fidelity vector store, and generation uses a quantized LLM. The distinguishing feature is adaptive embedding failover: when the primary embedding backend degrades, ingestion and retrieval fail over rather than erroring, which is what makes the ingestion pipeline resilient in practice.",
    problem:
      "RAG systems fail silently when a single embedding dependency degrades, corrupting the index without any visible error.",
    highlights: [
      "Speech-to-text transcription feeding the same index as documents",
      "High-fidelity vector retrieval with a quantized LLM generation stage",
      "Adaptive embedding failover for resilient ingestion",
      "Multilingual speech synthesis on the response path",
    ],
    technologies: [
      "Python",
      "RAG",
      "LLMs",
      "LangChain",
      "Vector Search",
      "Speech-to-Text",
      "Quantization",
    ],
    architecture: {
      ai: ["RAG", "Speech-to-text", "Quantized LLM", "Embedding failover"],
    },
    githubUrl: "https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot",
    image: "/project-images/rag-chatbot.png",
  },
  {
    id: "moderation-system",
    title: "Moderation System",
    tagline: "Multi-label toxic-comment classification with batch and real-time scoring.",
    category: "NLP & Speech",
    status: "Completed",
    tier: "notable",
    year: "2025",
    role: "AI Engineer",
    description:
      "A content-moderation engine that scores comments across five labels — toxic, obscene, threat, insult and hate speech — in a single multi-label pass rather than as five independent binary models. Results are exposed both as a real-time Streamlit interface and as batch CSV scoring for large backfills.",
    problem:
      "Comment moderation systems built as independent binary classifiers cannot represent comments that are several categories at once, which is the normal case.",
    highlights: [
      "Single multi-label pass across five toxicity categories",
      "Real-time Streamlit scoring interface",
      "Batch CSV scoring for backfilling large comment volumes",
    ],
    technologies: [
      "Python",
      "NLP",
      "Multi-Label Classification",
      "Streamlit",
      "Scikit-Learn",
      "Pandas",
    ],
    architecture: {
      ai: ["Multi-label classification"],
    },
    githubUrl: "https://github.com/IbrahimAbdelsattar/Moderation_System",
    image: "/project-images/content-moderation.png",
  },
  {
    id: "arabic-sentiment",
    title: "Arabic & Egyptian Dialect Sentiment",
    tagline: "Dual classical-ML and deep-learning sentiment analysis for Arabic dialect text.",
    category: "NLP & Speech",
    status: "Completed",
    tier: "notable",
    year: "2025",
    role: "AI Engineer",
    description:
      "Sentiment analysis for Modern Standard Arabic and Egyptian dialect, implemented as two models on the same problem: a TF-IDF feature space with logistic regression, and a Keras dense network over the same corpus. The pair makes the trade-off between a small interpretable model and a higher-capacity one explicit rather than assumed. The TensorFlow Lite conversion allows the model to run on edge devices, and scoring is exposed through a Streamlit app.",
    problem:
      "Models trained on MSA degrade badly on Egyptian dialect text, and dialect data is where most social conversation actually happens.",
    highlights: [
      "Parallel TF-IDF + logistic regression and Keras deep-learning models",
      "Covers Egyptian dialect alongside Modern Standard Arabic",
      "Quantized TensorFlow Lite export for edge deployment",
      "Interactive Streamlit scoring application",
    ],
    technologies: [
      "Python",
      "NLP",
      "Scikit-Learn",
      "TensorFlow",
      "Keras",
      "TFLite",
      "Streamlit",
      "Pandas",
    ],
    architecture: {
      ai: ["TF-IDF", "Logistic Regression", "Keras DNN", "TensorFlow Lite"],
    },
    githubUrl: "https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis",
    image: "/project-images/arabic-sentiment.png",
  },
  {
    id: "audio-gender-classification",
    title: "Audio Signal Classification",
    tagline: "Deep-learning voice gender classification from spectral audio features.",
    category: "NLP & Speech",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "A deep-learning engine for classifying voice recordings by speaker gender. It extracts a multi-tier spectral profile with Librosa — MFCCs, Mel spectrograms, spectral centroid and zero-crossing rate — then trains a Keras network over that feature matrix. An interactive studio view renders the waveform and spectrogram alongside the model output.",
    problem:
      "Raw waveforms are a poor model input; the discriminative information lives in the time-frequency structure.",
    highlights: [
      "Librosa feature extraction across MFCC, Mel, centroid and zero-crossing rate",
      "Keras deep neural network over the spectral feature matrix",
      "Interactive waveform and spectrogram studio for inspecting inputs",
    ],
    technologies: [
      "Python",
      "Deep Learning",
      "Keras",
      "TensorFlow",
      "Librosa",
      "Audio DSP",
      "Pandas",
    ],
    architecture: {
      ai: ["Spectral feature extraction", "Keras DNN"],
    },
    githubUrl: "https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender",
    image: "/project-images/audio-classification.png",
  },
  {
    id: "road-accident-severity",
    title: "Road Accident Severity Prediction",
    tagline: "XGBoost pipeline classifying accident severity from geospatial and weather data.",
    category: "Machine Learning",
    status: "Completed",
    tier: "notable",
    year: "2025",
    role: "AI Engineer",
    description:
      "A production-style machine-learning pipeline that classifies road-accident severity into four ordered levels. Gradient boosting with XGBoost is fed geospatial and meteorological feature pipelines, and the model is exposed through an interactive Streamlit diagnostic studio for inspecting individual predictions.",
    problem:
      "Severity assessment after an accident is manual and slow, and the factors that drive it — location, road conditions and weather — are spread across datasets.",
    highlights: [
      "XGBoost gradient-boosted classifier over four severity levels",
      "Geospatial and meteorological feature pipelines",
      "Interactive Streamlit diagnostic studio for prediction inspection",
    ],
    technologies: ["Python", "XGBoost", "Scikit-Learn", "Pandas", "NumPy", "Streamlit"],
    architecture: {
      ai: ["XGBoost", "Geospatial features", "Meteorological features"],
    },
    relatedRepos: [
      {
        slug: "traffic",
        url: "https://github.com/IbrahimAbdelsattar/traffic",
        isPrivate: false,
        role: "Companion repo holding the serialised model and inference app",
      },
    ],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Road-Accident-Severity-Prediction",
    notes: [
      "`traffic` and `Traffic_Accident_Prediction` are the same project split across two repositories: this one holds the dataset and analysis, `traffic` holds the serialised model, encoders and inference app.",
    ],
    image: "/project-images/road-safety.png",
  },
  {
    id: "hr-performance",
    title: "Employee Performance Prediction",
    tagline: "Performance-rating prediction for HR analytics using gradient-boosted models.",
    category: "Machine Learning",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "A supervised-learning project predicting employee performance ratings from HR feature sets, comparing tree-ensemble models across standard evaluation splits. The work covers preprocessing, feature treatment and model comparison rather than production serving.",
    highlights: [
      "Supervised regression on HR performance features",
      "Comparative evaluation across tree-ensemble models",
      "Full preprocessing and feature-treatment pipeline",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Employee-Performance-Rating-Prediction",
    image: "/project-images/hr-performance.png",
  },
  {
    id: "credit-card-fraud",
    title: "Credit Card Fraud Detection",
    tagline: "Class-imbalanced fraud classification with careful evaluation.",
    category: "Machine Learning",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "Fraud detection on transaction data, where the real difficulty is the extreme class imbalance: a model that predicts 'not fraud' for everything scores well and is worthless. The project focuses on resampling strategies and threshold selection rather than headline accuracy.",
    highlights: [
      "Handles severe class imbalance between fraud and legitimate transactions",
      "Resampling and threshold selection as the primary levers",
      "Evaluation metrics suited to imbalanced classification",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection",
    notes: [
      "Same Kaggle credit-card fraud problem as `GTC-Fraud-Detection`, which carries the more substantial packaging (setup.py, Dockerfile and a src/ layout with config, models, utils and deployment modules).",
    ],
    image: "/project-images/fraud-detection.png",
  },
  {
    id: "customer-churn",
    title: "Customer Churn Analysis",
    tagline: "Retention modelling with cohort and segmentation analysis.",
    category: "Data Science",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "Customer churn analysis combining exploratory segmentation with predictive retention modelling, identifying which customer attributes are associated with churn risk and where intervention is worth the cost.",
    highlights: [
      "Cohort and segmentation analysis ahead of modelling",
      "Predictive churn-risk modelling",
      "Cost-weighted focus on intervention-worthy segments",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Customer-Churn-Analysis",
    image: "/project-images/customer-churn.png",
  },
  {
    id: "purchase-intention",
    title: "Online Shoppers Purchase Intention",
    tagline: "Predicting purchase intent from session and marketing attributes.",
    category: "Machine Learning",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "Classification of purchase intent from online session behaviour and marketing channel attributes, with comparison of model families against a non-linear baseline to establish whether the added complexity is justified.",
    highlights: [
      "Session and channel feature modelling",
      "Comparison of linear and tree-based model families",
      "Baseline-versus-complexity justification",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Online-Shoppers-Purchase-Intention-Prediction",
    image: "/project-images/ecommerce-analytics.png",
  },
  {
    id: "mall-segmentation",
    title: "Mall Customer Segmentation",
    tagline: "Unsupervised customer grouping for targeted retail campaigns.",
    category: "Data Science",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "Unsupervised segmentation of retail customers into behavioural groups, giving marketing teams a small number of interpretable segments to target rather than treating the customer base as homogeneous.",
    highlights: [
      "Clustering into interpretable customer segments",
      "Segment profiling for targeted campaigns",
      "Cluster-quality diagnostics",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Mall-Customer-Segmentation-",
    image: "/project-images/mall-customers.png",
  },
  {
    id: "heart-attack-risk",
    title: "Heart Attack Risk Detection",
    tagline: "Cardiovascular risk classification from clinical indicators.",
    category: "Machine Learning",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "Classification of heart-attack risk from common clinical indicators, covering the full path from data inspection through feature preparation to model evaluation and risk-factor interpretation.",
    highlights: [
      "Clinical feature preparation and analysis",
      "Comparative model evaluation",
      "Risk-factor interpretation alongside predictions",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Heart-Attack-Detection",
    image: "/project-images/heart-attack-risk.png",
  },
  {
    id: "diabetes-risk",
    title: "Diabetes Risk Prediction",
    tagline: "Clinical diabetes risk classification with exploratory analysis.",
    category: "Machine Learning",
    status: "Completed",
    tier: "archive",
    year: "2026",
    role: "AI Engineer",
    description:
      "Diabetes risk classification from clinical measures, with exploratory analysis used to justify the feature treatment before modelling.",
    highlights: [
      "Exploratory analysis driving feature decisions",
      "Supervised classification on clinical measures",
      "Model comparison with documented evaluation",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/diabetes",
    notes: [
      "The repository's notebook is named after a third party (`alaa hamdy.ipynb`); treat attribution for this work as unconfirmed.",
    ],
    image: "/project-images/diabetes-detection.png",
  },
  {
    id: "retail-sales",
    title: "Retail Sales & Demographics",
    tagline: "Sales performance analysis segmented by customer demographics.",
    category: "Data Science",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "Retail sales analysis breaking performance down across customer demographic segments, supporting assortment and campaign decisions with descriptive and visual analysis.",
    highlights: [
      "Demographic segmentation of sales performance",
      "Descriptive statistics with visual reporting",
      "Actionable segment-level findings",
    ],
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    githubUrl:
      "https://github.com/IbrahimAbdelsattar/Retail_Sales_and_Customer_Demographics_Analysis",
    image: "/project-images/retail-sales.png",
  },
  {
    id: "student-grade-prediction",
    title: "Student Grade Prediction",
    tagline: "Forecasting student performance from academic and attendance features.",
    category: "Machine Learning",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "Regression predicting final student grades from academic history and attendance features, evaluated on the question of whether early-warning intervention is feasible from the available signals.",
    highlights: [
      "Grade regression from academic and attendance features",
      "Early-intervention feasibility analysis",
      "Documented feature importance",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Student-Final-Grade-Prediction",
    notes: [
      "The README describes a Gradio interface that is not present in the repository tree.",
    ],
    image: "/project-images/student-grade-prediction.png",
  },
  {
    id: "traffic-accident-prediction",
    title: "Traffic Accident Prediction",
    tagline: "Accident-count forecasting with XGBoost and Streamlit reporting.",
    category: "Machine Learning",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "Traffic accident prediction built on pandas and NumPy preprocessing with XGBoost modelling and a Streamlit layer for presenting results to non-technical stakeholders.",
    highlights: [
      "XGBoost accident modelling",
      "Streamlit reporting layer for stakeholders",
      "Pandas/NumPy preprocessing pipeline",
    ],
    technologies: ["Python", "XGBoost", "Pandas", "NumPy", "Streamlit"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Traffic_Accident_Prediction",
    image: "/project-images/road-safety.png",
  },
  {
    id: "flight-reservation",
    title: "Flight Reservation Desktop App",
    tagline: "Desktop booking application built in Python.",
    category: "Full-Stack Systems",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "A desktop flight-reservation application in Python covering the booking flow end to end, built to practise full application structure rather than isolated model work.",
    highlights: ["Desktop booking flow", "Python application structure", "End-to-end reservation logic"],
    technologies: ["Python", "Desktop Application"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Flight-Reservation-Desktop-App",
    image: "/project-images/flight-reservation.png",
  },
  {
    id: "email-intelligence-agent",
    title: "Email Intelligence & Excel Agent",
    tagline: "Automated inbox harvesting that turns scattered email into structured Excel reporting.",
    category: "Full-Stack Systems",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "AI Engineer",
    description:
      "An automation agent that bridges mail and operational spreadsheets. It connects to enterprise mail servers over IMAP (Gmail, Outlook, Office 365, Yahoo) or the Google Gmail API, then extracts, normalises, filters and formats messages into styled multi-sheet Excel workbooks. A Streamlit studio provides the operational interface, with attachment auditing, chronological filtering and per-workbook statistical summaries.",
    highlights: [
      "Dual-protocol ingestion: IMAP and the Gmail API",
      "Field parsing, metadata sanitisation and attachment auditing",
      "Styled multi-sheet Excel export with OpenPyXL and XlsxWriter",
      "Interactive Streamlit operational studio",
    ],
    technologies: ["Python", "IMAP", "Gmail API", "Streamlit", "OpenPyXL", "XlsxWriter"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/chatbot",
    image: "/project-images/sentiment-analysis.jpg",
  },

  // =====================================================================
  // RESEARCH & COURSEWORK — real work, kept discoverable but not inflated
  // =====================================================================
  {
    id: "gtc-ml-labs",
    title: "GTC ML Internship Labs",
    tagline: "Machine-learning labs from a supervised training programme.",
    category: "Research & Coursework",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "Student",
    description:
      "A set of supervised machine-learning labs completed during a training programme: fraud detection, diabetes prediction, California house-price regression and hotel-bookings cancellation modelling. Each lab follows the same structure — data inspection, preparation, model fitting and evaluation — which is what makes them useful as a record of applied practice.",
    highlights: [
      "Fraud-detection classification lab",
      "Diabetes classification lab",
      "California house-price regression lab",
      "Hotel-bookings cancellation modelling lab",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Jupyter Notebook"],
    architecture: {},
    notes: [
      "`GTC-Fraud-Detection` is the most substantially packaged repo in this group (setup.py, Dockerfile, and a src/ layout covering config, models, utils and deployment), but its README reports 40% F1/accuracy, which is below a majority-class baseline and should not be treated as a validated result.",
      "`GTC-Fraud-Detection` and `Credit-card-Fraud-Detection` address the same Kaggle fraud problem.",
    ],
    githubUrl: "https://github.com/IbrahimAbdelsattar/GTC-ML-Internship-California-House-Price-Prediction",
    relatedRepos: [
      {
        slug: "GTC-ML-Internship-California-House-Price-Prediction",
        url: "https://github.com/IbrahimAbdelsattar/GTC-ML-Internship-California-House-Price-Prediction",
        isPrivate: false,
        role: "House-price regression lab",
      },
      {
        slug: "GTC-ML-Internship-Diabetes-Prediction",
        url: "https://github.com/IbrahimAbdelsattar/GTC-ML-Internship-Diabetes-Prediction",
        isPrivate: false,
        role: "Diabetes classification lab",
      },
      {
        slug: "gtc-ml-project1-hotel-bookings",
        url: "https://github.com/IbrahimAbdelsattar/gtc-ml-project1-hotel-bookings",
        isPrivate: false,
        role: "Hotel-bookings cancellation lab",
      },
      {
        slug: "GTC-Fraud-Detection",
        url: "https://github.com/IbrahimAbdelsattar/GTC-Fraud-Detection",
        isPrivate: false,
        role: "Fraud-detection lab",
      },
    ],
    image: "/project-images/house-price.png",
  },
  {
    id: "depi-data-science",
    title: "DEPI Data Science",
    tagline: "Data-science coursework from the Digital Egypt Pioneers Initiative.",
    category: "Research & Coursework",
    status: "Completed",
    tier: "archive",
    year: "2024",
    role: "Student",
    description:
      "Data-science coursework completed through the Digital Egypt Pioneers Initiative (DEPI), covering the core analysis and modelling sequence: exploratory analysis, preprocessing, model building and evaluation, across a set of separate assignment repositories.",
    highlights: [
      "Core data-science sequence across multiple assignment repositories",
      "Exploratory analysis and preprocessing practice",
      "DEPI national programme specialisation in AI and data engineering",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Data-Science-Projects-.DEPI",
    relatedRepos: [
      {
        slug: "Data-Science-Projects-.DEPI",
        url: "https://github.com/IbrahimAbdelsattar/Data-Science-Projects-.DEPI",
        isPrivate: false,
        role: "Project-track coursework",
      },
      {
        slug: "Data-Science-Assignments.DEPI",
        url: "https://github.com/IbrahimAbdelsattar/Data-Science-Assignments.DEPI",
        isPrivate: false,
        role: "Assignment-track coursework",
      },
    ],
    image: "/project-images/sentiment-analysis.jpg",
  },
  {
    id: "bank-term-deposit",
    title: "Bank Term Deposit Prediction",
    tagline: "Subscription propensity modelling for bank term deposits.",
    category: "Machine Learning",
    status: "Completed",
    tier: "archive",
    year: "2025",
    role: "Student",
    description:
      "Binary classification predicting whether a client subscribes to a bank term deposit, a classic propensity problem where class imbalance and threshold choice matter more than raw accuracy.",
    highlights: [
      "Client propensity classification",
      "Class-imbalance-aware evaluation",
      "Threshold analysis for campaign targeting",
    ],
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/IbrahimAbdelsattar/Bank-Term-Deposit-Prediction-",
    image: "/project-images/bank-term-deposit.png",
  },
];

/**
 * Adding a project
 * ----------------
 * Append one object above. Nothing else needs to change: filters, the archive,
 * search, the featured rail and the tech-stack counters all derive from this
 * array. Keep `githubUrl` only for publicly reachable repositories.
 */

/**
 * Repositories deliberately excluded from the portfolio.
 *
 * Forks of other people's projects are not presented as original work, and a
 * link is only rendered when it resolves publicly.
 */
export const EXCLUDED_REPOS = [
  { slug: "hermes-agent", reason: "Fork of an upstream project" },
  { slug: "openclaw", reason: "Fork of an upstream project" },
  { slug: "OmniRoute", reason: "Fork of an upstream project" },
  { slug: "searxng", reason: "Fork of an upstream project" },
  { slug: "skills", reason: "Fork of an upstream project" },
  { slug: "profile-readme-generator", reason: "Fork of an upstream project" },
  { slug: "Profile-README-Templates", reason: "Fork of an upstream project" },
  { slug: "twitter-sentiment-analysis", reason: "Fork of an upstream project" },
  {
    slug: "RAG-Powered-Knowledge-Assistantf-for-Teachers",
    reason: "Fork of an upstream project",
  },
  { slug: "Ibrahim-Portfolio", reason: "This portfolio repository" },
  { slug: "IbrahimAbdelsattar", reason: "GitHub profile readme, not a project" },
  { slug: "tea-tec", reason: "Represented once as the TeaTec product" },
  { slug: "TeaTec-Android", reason: "Represented as a TeaTec related repo" },
  { slug: "trio-learn-hub", reason: "Represented as a Trio Academy related repo" },
  { slug: "traffic", reason: "Overlaps Traffic_Accident_Prediction; awaiting confirmation" },
  { slug: "numerical", reason: "Experimental, no distinguishing README" },
  { slug: "numerical-g2", reason: "Experimental, no distinguishing README" },
  { slug: "numerix-labs", reason: "Experimental, no distinguishing README" },
  { slug: "mini-rag", reason: "Experimental, private, no distinguishing README" },
  { slug: "soliman-group", reason: "Template README only; description would be invented" },
  { slug: "alien-ai-venture-main", reason: "Template README only; description would be invented" },
  { slug: "bodyiq-mti-main", reason: "Template README only; description would be invented" },
  { slug: "love", reason: "Personal page, not portfolio work" },
] as const;

/* ------------------------------------------------------------------ */
/* Derived helpers — keep the UI free of filtering logic.              */
/* ------------------------------------------------------------------ */

export const featuredProjects = projects.filter((p) => p.tier === "flagship");

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.id === slug);

/** Every distinct technology actually referenced by a listed project. */
export const allTechnologies = Array.from(
  new Set(projects.flatMap((p) => p.technologies)),
).sort((a, b) => a.localeCompare(b));

/** Real counts derived from the data — never hardcoded. */
export const projectStats = {
  total: projects.length,
  featured: featuredProjects.length,
  publicRepos: projects.filter((p) => p.githubUrl).length,
  technologies: allTechnologies.length,
  categories: new Set(projects.map((p) => p.category)).size,
};
