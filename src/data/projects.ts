import type { Project } from "./types";

/**
 * All owner repositories reviewed on 2026-10-01.
 * Preserve existing case-study slugs; keep each repository independently searchable.
 * Descriptions come from reviewed source and READMEs. Forks credit their upstream.
 * Private repositories are represented without exposing source URLs to visitors.
 */
export const projects: Project[] = [
  {
    "id": "dawrly",
    "title": "Dawrly",
    "tagline": "AI job-matching and career-intelligence platform for the Egyptian and MENA market.",
    "category": "AI Products",
    "status": "Production",
    "tier": "flagship",
    "year": "2025",
    "role": "Full-Stack AI Engineer",
    "description": "Dawrly is an enterprise job-matching platform that ingests job postings, structures them into a searchable index, and scores them against a user's profile to surface ranked recommendations. The backend is a layered FastAPI service running behind PostgreSQL with pgvector, with Redis-backed Celery workers handling scraping and enrichment off the request path. The frontend is a React 19 / TypeScript SPA. The repository ships full C4 architecture documentation, a database ER model, auth and job-recommendation sequence diagrams, and a CI/CD pipeline that deploys through Dokploy and Traefik.",
    "problem": "Job discovery across the Egyptian and MENA market is fragmented across unnormalised listings, and candidates cannot reliably judge which roles actually fit their profile.",
    "highlights": [
      "Layered FastAPI backend with PostgreSQL and pgvector-backed storage",
      "Redis + Celery async workers for scraping and enrichment off the request path",
      "React 19 + TypeScript frontend with Zustand state management",
      "AI gateway routing layer for model calls (OmniRoute mesh)",
      "Comprehensive C4, ER, sequence and activity diagram set in-repo",
      "GitHub Actions CI/CD deploying to Dokploy behind Traefik",
      "Clerk-based authentication with an auth-bridge sequence to Wajehni"
    ],
    "technologies": [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Celery",
      "Docker",
      "Dokploy"
    ],
    "architecture": {
      "backend": [
        "FastAPI",
        "Celery workers"
      ],
      "frontend": [
        "React 19",
        "TypeScript",
        "Zustand"
      ],
      "ai": [
        "AI gateway routing",
        "pgvector embeddings"
      ],
      "database": [
        "PostgreSQL",
        "pgvector"
      ],
      "infrastructure": [
        "Docker",
        "Dokploy",
        "Traefik",
        "GitHub Actions"
      ],
      "integrations": [
        "Clerk auth"
      ]
    },
    "sourcePrivate": true,
    "liveUrl": "https://dawrly.space",
    "relatedRepos": [
      {
        "slug": "tea-tec",
        "isPrivate": true,
        "role": "Shared account/auth ecosystem"
      }
    ],
    "image": "/project-images/dawrly-platform.jpg",
    "repository": "Dawrly",
    "sourceKind": "project"
  },
  {
    "id": "wajehni",
    "title": "Wajehni (Nexus Academy)",
    "tagline": "Adaptive learning from discovery assessment to a personalized roadmap and progress tracking.",
    "category": "AI Products",
    "status": "Production",
    "tier": "flagship",
    "year": "2026",
    "role": "Full-Stack AI Engineer",
    "description": "Wajehni is an adaptive AI learning platform with a discovery assessment, personalized roadmaps, learning resources, exams, progress tracking, and an administrator workspace. Its React and Vite frontend connects to a FastAPI backend with agent, curriculum, assessment, and mastery routes.",
    "problem": "Static course catalogues do not adapt to a learner's actual strengths, so students finish programmes without a clear route from assessment to employment.",
    "highlights": [
      "Discovery assessment and personalized roadmaps",
      "Learning dashboard, resources, exams, and reports",
      "Mastery and gamification routes",
      "Clerk sign-in and an administrator control room"
    ],
    "technologies": [
      "React",
      "TypeScript",
      "Vite",
      "FastAPI",
      "Python",
      "SQLAlchemy",
      "LangGraph",
      "Clerk"
    ],
    "architecture": {
      "frontend": [
        "React",
        "TypeScript",
        "Vite"
      ],
      "backend": [
        "FastAPI",
        "SQLAlchemy"
      ],
      "ai": [
        "LangChain",
        "LangGraph"
      ],
      "integrations": [
        "Clerk"
      ]
    },
    "sourcePrivate": true,
    "image": "/project-images/wajehni-ai.jpg",
    "repository": "Nexus_Academy",
    "sourceKind": "project"
  },
  {
    "id": "supplymind-ai",
    "title": "SupplyMind AI",
    "tagline": "Demand forecasting and inventory intelligence for supply-chain operations.",
    "category": "AI Products",
    "status": "Production",
    "tier": "flagship",
    "year": "2026",
    "role": "AI Engineer",
    "description": "SupplyMind AI is an enterprise supply-chain platform covering forecasting, inventory optimisation, explainability and MLOps with real-time alerting. It combines gradient-boosted demand forecasting with retrieval-augmented generation and multi-agent orchestration, and emits concrete inventory actions — economic order quantity, safety stock and reorder point — rather than raw forecasts. The stack spans FastAPI, React, PostgreSQL, LangGraph, ChromaDB and OpenRouter-hosted LLMs.",
    "problem": "Inventory decisions are made on gut feel and spreadsheets, so teams either over-order and tie up capital or under-stock and lose service levels.",
    "highlights": [
      "XGBoost demand-forecasting models feeding inventory policy outputs",
      "Automated EOQ, safety-stock and reorder-point recommendations",
      "RAG layer over ChromaDB with explainable-AI output for every recommendation",
      "Multi-agent orchestration via LangGraph with executive insight summaries",
      "Conversational decision support over the operational data",
      "FastAPI service, React frontend and PostgreSQL persistence"
    ],
    "technologies": [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "LangGraph",
      "ChromaDB",
      "XGBoost",
      "RAG",
      "MLOps",
      "Docker"
    ],
    "architecture": {
      "backend": [
        "FastAPI"
      ],
      "frontend": [
        "React"
      ],
      "ai": [
        "XGBoost",
        "LangGraph agents",
        "RAG",
        "LLMs via OpenRouter"
      ],
      "database": [
        "PostgreSQL",
        "ChromaDB"
      ],
      "infrastructure": [
        "MLOps pipelines",
        "Docker"
      ]
    },
    "image": "/project-images/supplymind-ai.jpg",
    "repository": "SupplyMindAI",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/SupplyMindAI"
  },
  {
    "id": "mesdaq-ai",
    "title": "Mesdaq AI",
    "tagline": "Arabic misinformation detection with credibility scoring and generated explanations.",
    "category": "AI Products",
    "status": "Prototype",
    "tier": "flagship",
    "year": "2026",
    "role": "AI Engineer",
    "description": "An Arabic news credibility analysis prototype combining a local BERT-family model, linguistic signals, explanation generation, and a React interface.",
    "highlights": [
      "Accept Arabic news text and return classification, confidence, and a credibility score",
      "Extract sentiment, keyword-based clickbait indicators, word counts, and optional named-entity counts",
      "Generate explanations through OpenRouter, with a local fallback explanation path",
      "Persist analysis history, prediction metadata, and daily statistics"
    ],
    "technologies": [
      "Python",
      "FastAPI",
      "Transformers/PyTorch",
      "SQLAlchemy",
      "React",
      "Vite"
    ],
    "image": "/project-images/mesdaq-ai.jpg",
    "notes": [
      "Classifier weights are not committed. Analysis requires the matching local model; explanation generation does not replace it.",
      "Classification scores and generated explanations are model outputs, not independent verification of a news claim."
    ],
    "repository": "Mesdaq_AI",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Mesdaq_AI"
  },
  {
    "id": "eva-ai",
    "title": "Eva AI",
    "tagline": "Retrieval-augmented clinical decision support for adrenal insufficiency.",
    "category": "AI Products",
    "status": "Active Development",
    "tier": "flagship",
    "year": "2026",
    "role": "AI Engineer",
    "description": "Eva AI is a clinical decision-support system for adrenal insufficiency. It retrieves relevant clinical context and surfaces decision support to clinicians rather than answering from model weights alone, which keeps the output grounded in retrievable sources. The repository carries a GitHub Actions CI/CD pipeline, so changes are validated automatically.",
    "problem": "Adrenal insufficiency management is context-sensitive, and clinicians need decision support that cites retrievable evidence rather than free-form generation.",
    "highlights": [
      "Retrieval-augmented generation grounding output in clinical context",
      "Purpose-built for adrenal insufficiency decision support",
      "GitHub Actions CI/CD pipeline in the repository"
    ],
    "technologies": [
      "Next.js",
      "FastAPI",
      "Python",
      "RAG",
      "BM25",
      "Embeddings",
      "GitHub Actions"
    ],
    "architecture": {
      "frontend": [
        "Next.js"
      ],
      "backend": [
        "FastAPI"
      ],
      "ai": [
        "Hybrid retrieval",
        "Grounded generation"
      ],
      "infrastructure": [
        "GitHub Actions"
      ]
    },
    "image": "/project-images/eva-ai.jpg",
    "notes": [
      "Clinical decision-support research for adrenal insufficiency; it does not replace professional clinical judgment."
    ],
    "repository": "Eva-AI",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Eva-AI"
  },
  {
    "id": "vox-mind",
    "title": "VoxMind",
    "tagline": "Multimodal speech platform for early Alzheimer's and MCI detection.",
    "category": "AI Products",
    "status": "Research",
    "tier": "flagship",
    "year": "2026",
    "role": "AI Engineer",
    "description": "VoxMind is a clinical decision-support and governance platform for early Alzheimer's disease and mild cognitive impairment detection from speech. It denoises recordings with DeepFilterNet3, segments voice activity with Silero VAD, transcribes with a speech-to-text model, and then fuses acoustic biomarkers with linguistic NLP features into a decision model built on a LoRA-tuned language model plus XGBoost. Access is governed through Clerk SSO and organisation join codes, with audit logging over a Supabase Postgres instance using row-level security.",
    "problem": "Early cognitive decline is detectable in speech long before it is caught by standard cognitive screening, but clinicians lack tooling that fuses acoustic and linguistic signal under proper clinical governance.",
    "highlights": [
      "Acoustic biomarkers extracted after DeepFilterNet3 denoising and Silero VAD segmentation",
      "Speech-to-text transcription pipeline feeding linguistic NLP features",
      "Multimodal fusion of acoustic and linguistic signal into a decision model",
      "Decision model combining a LoRA-tuned LLM with XGBoost",
      "Clerk SSO with organisation join codes and Supabase row-level security",
      "HIPAA-oriented audit and governance layer"
    ],
    "technologies": [
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
      "Audio DSP"
    ],
    "architecture": {
      "frontend": [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS"
      ],
      "backend": [
        "FastAPI"
      ],
      "ai": [
        "Acoustic biomarkers",
        "Linguistic NLP",
        "Multimodal fusion",
        "LoRA",
        "XGBoost"
      ],
      "database": [
        "Supabase Postgres",
        "RLS"
      ],
      "infrastructure": [
        "Clerk SSO",
        "Audit governance"
      ]
    },
    "sourcePrivate": true,
    "image": "/project-images/audio-classification.png",
    "repository": "vox-mind",
    "sourceKind": "project"
  },
  {
    "id": "trio-lms",
    "title": "Trio Academy (Trio Learning Hub)",
    "tagline": "Enterprise corporate learning management system built for a catering organisation.",
    "category": "Full-Stack Systems",
    "status": "Production",
    "tier": "flagship",
    "year": "2026",
    "role": "AI Engineer",
    "description": "A corporate learning management platform for Trio Catering, combining employee learning, administration, assessments, certificates, reporting, and optional AI assistance.",
    "highlights": [
      "Manage employees, departments, job titles, categories, courses, modules, and learning materials",
      "Track enrollments, video progress, quizzes, scheduled exams, and practical skill assessments",
      "Issue and verify certificates and expose reporting/export workflows",
      "Provide Arabic and English interfaces and role-based employee/admin access",
      "Support optional career, copilot, insight, and proctoring routes through a separate AI service"
    ],
    "technologies": [
      "React 18",
      "TypeScript",
      "Vite",
      "ASP.NET Core 8",
      "EF Core",
      "MySQL 8.4",
      "FastAPI"
    ],
    "sourcePrivate": true,
    "liveUrl": "https://trio-academy.tech",
    "relatedRepos": [
      {
        "slug": "trio-learn-hub",
        "isPrivate": true,
        "role": "Earlier mock-data UI prototype"
      }
    ],
    "image": "/project-images/trio-lms.jpg",
    "repository": "trio-lms",
    "sourceKind": "project"
  },
  {
    "id": "tea-tec",
    "title": "TeaTec",
    "tagline": "Bilingual Arabic-first e-learning SaaS built around condensed, practical sessions.",
    "category": "Full-Stack Systems",
    "status": "Active Development",
    "tier": "flagship",
    "year": "2026",
    "role": "Full-Stack AI Engineer",
    "description": "TeaTec is a bilingual, Arabic-first e-learning SaaS platform built on a condensed-learning philosophy: each field is distilled into focused two-hour sessions paired with interactive assessments and automated certificates. The product pairs a web client with a native Android client so learners can move between desktop coursework and mobile study without losing progress.",
    "problem": "Learners abandon long courses before completing them, and Arabic-language technical material is poorly served by platforms designed for English-first audiences.",
    "highlights": [
      "Condensed two-hour sessions per topic instead of long course tracks",
      "Interactive assessments paired with each session",
      "Automated certificate issuance on completion",
      "Bilingual Arabic-first interface",
      "Matching native Android client for mobile study"
    ],
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "ASP.NET Core",
      "MySQL",
      "Docker"
    ],
    "architecture": {
      "frontend": [
        "Next.js",
        "React"
      ],
      "backend": [
        "ASP.NET Core 8"
      ],
      "database": [
        "MySQL"
      ],
      "integrations": [
        "Android client",
        "AI assistant"
      ]
    },
    "sourcePrivate": true,
    "relatedRepos": [
      {
        "slug": "TeaTec-Android",
        "isPrivate": true,
        "role": "Native Android client"
      }
    ],
    "image": "/project-images/teatec-platform.jpg",
    "repository": "tea-tec",
    "sourceKind": "project"
  },
  {
    "id": "c-sat",
    "title": "Trio C-SaT",
    "tagline": "Customer-satisfaction platform for corporate and factory catering operations.",
    "category": "Full-Stack Systems",
    "status": "Active Development",
    "tier": "notable",
    "year": "2026",
    "role": "Full-Stack AI Engineer",
    "description": "C-SaT is an enterprise customer-satisfaction platform built for corporate and factory catering operations. It combines a React 19 and TypeScript frontend styled with Tailwind CSS 4 on Vite 6, an Express 4 API and PostgreSQL 16 for persistence, with OmniRoute providing the AI layer. CI/CD runs through GitHub Actions.",
    "problem": "Catering operations serving factory and corporate sites collect satisfaction feedback across disconnected channels, with no consolidated view to act on.",
    "highlights": [
      "React 19 + TypeScript + Tailwind CSS 4 on Vite 6",
      "Express 4 API with PostgreSQL 16 persistence",
      "OmniRoute AI layer for feedback analysis",
      "GitHub Actions CI/CD"
    ],
    "technologies": [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Express",
      "PostgreSQL",
      "OmniRoute",
      "GitHub Actions"
    ],
    "architecture": {
      "frontend": [
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Vite"
      ],
      "backend": [
        "Express 4"
      ],
      "database": [
        "PostgreSQL 16"
      ],
      "ai": [
        "OmniRoute AI gateway"
      ],
      "infrastructure": [
        "GitHub Actions CI/CD"
      ]
    },
    "sourcePrivate": true,
    "image": "/project-images/customer-churn.png",
    "repository": "c-sat",
    "sourceKind": "project"
  },
  {
    "id": "jarvis",
    "title": "JARVIS",
    "tagline": "Holographic hands-free AI chief of staff for executive operations.",
    "category": "AI Products",
    "status": "Active Development",
    "tier": "notable",
    "year": "2026",
    "role": "Full-Stack AI Engineer",
    "description": "A personal AI workspace combining a React dashboard with a FastAPI backend for agent chat, reports, voice interactions, live data, music, and code graph exploration.",
    "highlights": [
      "Organize AI agent, voice, project, calendar, focus, and instructor widgets",
      "Route backend AI requests through the configured OmniRoute gateway",
      "Provide voice-command and TTS routes, live information endpoints, and model benchmark/report workflows",
      "Render interactive 3D and hand-tracking interfaces using Three.js and MediaPipe",
      "Serve the built frontend, local music, and optional Graphify outputs from FastAPI"
    ],
    "technologies": [
      "React",
      "TypeScript",
      "Vite",
      "FastAPI",
      "Three.js",
      "OmniRoute"
    ],
    "sourcePrivate": true,
    "image": "/project-images/jarvis-hud.jpg",
    "repository": "jarvis",
    "sourceKind": "project"
  },
  {
    "id": "neuronix",
    "title": "Neuronix AI Solutions",
    "tagline": "The product umbrella behind Dawrly, Wajehni, Eva AI, VoxMind and Mesdaq AI.",
    "category": "AI Products",
    "status": "Production",
    "tier": "notable",
    "year": "2026",
    "role": "Founder",
    "description": "The corporate website for the Neuronix AI product ecosystem, presenting specialized products under one parent brand while preserving each product's identity.",
    "highlights": [
      "Present Dawrly, Wajehni, EVA AI, Mesdaq AI, and VoxMind through a shared product registry",
      "Render product listings and individual product pages from structured content",
      "Provide about, solutions, research, and contact pages",
      "Generate site metadata, sitemap, and robots information",
      "Centralize brand colors and fonts in the design system stylesheet"
    ],
    "technologies": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Motion"
    ],
    "sourcePrivate": true,
    "liveUrl": "https://neuronix-843213893012.europe-west1.run.app",
    "image": "/project-images/dawrly-platform.jpg",
    "repository": "neuronix",
    "sourceKind": "project"
  },
  {
    "id": "numerix",
    "title": "Numerix",
    "tagline": "Interactive numerical-analysis platform with step-by-step algorithmic solvers.",
    "category": "Full-Stack Systems",
    "status": "Prototype",
    "tier": "notable",
    "year": "2026",
    "role": "Full-Stack AI Engineer",
    "description": "An interactive numerical analysis learning application with solvers, method comparison, error visualizations, and additional mathematical labs.",
    "highlights": [
      "Explore five root-finding methods and four linear-system methods",
      "Inspect iteration tables, step playback, convergence displays, and PDF export",
      "Compare root-finding methods in the comparison lab",
      "Study method pages, error geometry, and an equation playground",
      "Use quiz, whiteboard, and Newton-fractal pages"
    ],
    "technologies": [
      "React 18",
      "TypeScript",
      "Vite",
      "mathjs",
      "KaTeX",
      "Three.js"
    ],
    "image": "/project-images/numerix-platform.jpg",
    "repository": "Numerix",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Numerix",
    "relatedRepos": [
      {
        "slug": "numerical",
        "isPrivate": true,
        "role": "Desktop numerical lab"
      },
      {
        "slug": "numerical-g2",
        "isPrivate": true,
        "role": "Browser numerical lab"
      },
      {
        "slug": "numerix-labs",
        "isPrivate": true,
        "role": "AI tutor prototype"
      }
    ]
  },
  {
    "id": "mr-nlp-rag",
    "title": "MR NLP Robust RAG",
    "tagline": "Multimodal voice and document RAG with adaptive embedding failover.",
    "category": "Generative AI & Agents",
    "status": "Prototype",
    "tier": "notable",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A modular Streamlit document assistant that combines local language generation, configurable retrieval embeddings, and speech input/output.",
    "highlights": [
      "Answer document-based questions using retrieved context",
      "Try Sentence Transformers, a Transformers-based fallback, or TF-IDF embeddings",
      "Use Whisper for voice transcription and gTTS for spoken responses",
      "Adjust retrieval and generation parameters through the interface",
      "Organize model loading, document indexing, retrieval, and UI in separate modules"
    ],
    "technologies": [
      "Python",
      "Streamlit",
      "Transformers",
      "Sentence Transformers",
      "Chroma",
      "LlamaIndex",
      "Whisper"
    ],
    "image": "/project-images/rag-chatbot.png",
    "repository": "MR-NLP-Robust-RAG-Chatbot",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot"
  },
  {
    "id": "moderation-system",
    "title": "Moderation System",
    "tagline": "Multi-label toxic-comment classification with batch and real-time scoring.",
    "category": "NLP & Speech",
    "status": "Completed",
    "tier": "notable",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A multilabel text classification project for flagging six categories of potentially harmful comments, with single-comment and CSV batch inference.",
    "highlights": [
      "Predict toxic, severe_toxic, obscene, threat, insult, and identity_hate labels",
      "Clean text using the NLTK-based preprocessing implemented in app.py",
      "Load a fitted TF-IDF vectorizer and Naive Bayes model from local files or configured URLs",
      "Upload a CSV containing id and comment_text, inspect predictions, and export results"
    ],
    "technologies": [
      "Python",
      "TF-IDF",
      "Naive Bayes",
      "scikit-learn",
      "NLTK",
      "Streamlit"
    ],
    "image": "/project-images/content-moderation.png",
    "repository": "Moderation_System",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Moderation_System"
  },
  {
    "id": "arabic-sentiment",
    "title": "Arabic & Egyptian Dialect Sentiment",
    "tagline": "Dual classical-ML and deep-learning sentiment analysis for Arabic dialect text.",
    "category": "NLP & Speech",
    "status": "Completed",
    "tier": "notable",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A text classification project for Arabic and Egyptian dialect reviews, combining notebook experiments with an Arabic Streamlit interface.",
    "highlights": [
      "Classify entered text as negative, neutral, or positive using TF-IDF and Logistic Regression in the web app",
      "Compare classical classifiers and an embedding-based Keras network in the training notebook",
      "Keep separate Keras and TensorFlow Lite exports for the neural experiments"
    ],
    "technologies": [
      "Python",
      "scikit-learn",
      "TensorFlow/Keras",
      "Streamlit"
    ],
    "image": "/project-images/arabic-sentiment.png",
    "notes": [
      "The Streamlit entry point needs logistic_model.pkl and the matching TF-IDF vectorizer; these artifacts are not committed."
    ],
    "repository": "Arabic-Sentiment-Analysis",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis"
  },
  {
    "id": "audio-gender-classification",
    "title": "Audio Signal Classification",
    "tagline": "Deep-learning voice gender classification from spectral audio features.",
    "category": "NLP & Speech",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "An audio classification experiment with a Streamlit demo that extracts acoustic features and predicts the binary labels used by its training data.",
    "highlights": [
      "Upload WAV, MP3, or OGG recordings for inference",
      "Extract 13 MFCC means, 40 mel-band means, spectral centroid, rolloff, zero-crossing rate, and RMS: 57 features per recording",
      "Scale features with the saved preprocessing artifact and run the DNN",
      "Display the uploaded audio and acoustic visualizations; compare SVM, XGBoost, and neural experiments in the notebook"
    ],
    "technologies": [
      "Python",
      "librosa",
      "TensorFlow/Keras",
      "scikit-learn",
      "Streamlit"
    ],
    "image": "/project-images/audio-classification.png",
    "repository": "Audio-Model-Classification-Gender",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender"
  },
  {
    "id": "road-accident-severity",
    "title": "Road Accident Severity Prediction",
    "tagline": "XGBoost pipeline classifying accident severity from geospatial and weather data.",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "notable",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A Streamlit interface that predicts a four-level accident severity label using a saved XGBoost bundle.",
    "highlights": [
      "Build numeric, categorical, and Boolean inputs from the stored training schema",
      "Collect geographic, road, weather, and daylight conditions",
      "Run the saved model and decode its predicted severity through the bundle's label encoder"
    ],
    "technologies": [
      "Python",
      "XGBoost",
      "scikit-learn",
      "pandas",
      "Streamlit"
    ],
    "image": "/project-images/road-safety.png",
    "repository": "Road-Accident-Severity-Prediction",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Road-Accident-Severity-Prediction"
  },
  {
    "id": "hr-performance",
    "title": "Employee Performance Prediction",
    "tagline": "Performance-rating prediction for HR analytics using gradient-boosted models.",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "An HR machine learning experiment with a Streamlit application that predicts an employee performance rating from employment attributes.",
    "highlights": [
      "Collect department, job title, location, experience, employment status, work mode, and salary in INR",
      "Apply manually encoded inputs to the saved XGBoost model and display a rating",
      "Compare classical models and dense neural networks in the notebook"
    ],
    "technologies": [
      "Python",
      "XGBoost",
      "NumPy",
      "Streamlit"
    ],
    "image": "/project-images/hr-performance.png",
    "notes": [
      "Inference uses manual category mappings and a location-length feature. These transformations must match training."
    ],
    "repository": "Employee-Performance-Rating-Prediction",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Employee-Performance-Rating-Prediction"
  },
  {
    "id": "credit-card-fraud",
    "title": "Credit Card Fraud Detection",
    "tagline": "Class-imbalanced fraud classification with careful evaluation.",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A notebook-based fraud classification project with a Streamlit interface for inspecting individual transactions.",
    "highlights": [
      "Enter the 28 provided transaction features (V1–V28) and Amount",
      "Predict the legitimate/fraud class and display the model's class probability",
      "Compare multiple classifiers and a dense neural network in the notebook"
    ],
    "technologies": [
      "Python",
      "XGBoost",
      "scikit-learn",
      "pandas",
      "Streamlit"
    ],
    "notes": [
      "The inference app requires credit_card_fraud.pkl, which is missing from the repository."
    ],
    "image": "/project-images/fraud-detection.png",
    "repository": "Credit-card-Fraud-Detection",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection"
  },
  {
    "id": "customer-churn",
    "title": "Customer Churn Analysis",
    "tagline": "Retention modelling with cohort and segmentation analysis.",
    "category": "Data Science",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A notebook exploring banking customer attrition and comparing explainable classification models for the churn target.",
    "highlights": [
      "Explore demographics, account attributes, and churn distributions",
      "Prepare categorical features and use SMOTE on the training data",
      "Tune Decision Tree and Random Forest classifiers with GridSearchCV",
      "Inspect classification metrics, confusion matrices, ROC curves, and SHAP explanations"
    ],
    "technologies": [
      "Python",
      "pandas",
      "scikit-learn",
      "imbalanced-learn",
      "SHAP"
    ],
    "image": "/project-images/customer-churn.png",
    "repository": "Customer-Churn-Analysis",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Customer-Churn-Analysis"
  },
  {
    "id": "purchase-intention",
    "title": "Online Shoppers Purchase Intention",
    "tagline": "Predicting purchase intent from session and marketing attributes.",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A machine learning project for classifying whether an online browsing session leads to a purchase, with a Streamlit inference interface.",
    "highlights": [
      "Collect page-visit counts and durations, bounce/exit rates, page value, month, visitor type, and other session attributes",
      "Apply the saved encoders/scaler and Gradient Boosting classifier",
      "Compare multiple classifiers, SMOTE-based experiments, and a dense neural model in the notebook"
    ],
    "technologies": [
      "Python",
      "scikit-learn",
      "Gradient Boosting",
      "pandas",
      "Streamlit"
    ],
    "image": "/project-images/ecommerce-analytics.png",
    "repository": "Online-Shoppers-Purchase-Intention-Prediction",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Online-Shoppers-Purchase-Intention-Prediction"
  },
  {
    "id": "mall-segmentation",
    "title": "Mall Customer Segmentation",
    "tagline": "Unsupervised customer grouping for targeted retail campaigns.",
    "category": "Data Science",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "An unsupervised learning notebook that explores customer demographics and purchasing behavior, then groups customers with K-Means.",
    "highlights": [
      "Explore age, income, gender, and spending-score distributions",
      "Scale features before clustering",
      "Compare cluster counts through elbow and silhouette analyses",
      "Assign cluster labels and visualize customer segments"
    ],
    "technologies": [
      "Python",
      "pandas",
      "scikit-learn",
      "Plotly",
      "Matplotlib",
      "Seaborn"
    ],
    "image": "/project-images/mall-customers.png",
    "repository": "Mall-Customer-Segmentation-",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Mall-Customer-Segmentation-"
  },
  {
    "id": "heart-attack-risk",
    "title": "Heart Attack Risk Detection",
    "tagline": "Cardiovascular risk classification from clinical indicators.",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A Streamlit interface that loads a saved MLP pipeline and classifies a health questionnaire. The repository also contains a separate diabetes analysis notebook.",
    "highlights": [
      "Collect demographic, lifestyle, health-history, and accessibility inputs",
      "Pass the questionnaire DataFrame to the saved pipeline",
      "Display the predicted class returned by the model"
    ],
    "technologies": [
      "Python",
      "scikit-learn",
      "joblib",
      "pandas",
      "Streamlit"
    ],
    "image": "/project-images/heart-attack-risk.png",
    "notes": [
      "The included diabetes notebook is not established as the training source of the heart-risk model. This is an educational classifier, not a diagnosis."
    ],
    "repository": "Heart-Attack-Detection",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Heart-Attack-Detection"
  },
  {
    "id": "diabetes-risk",
    "title": "Diabetes Risk Prediction",
    "tagline": "Clinical diabetes risk classification with exploratory analysis.",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2026",
    "role": "AI Engineer",
    "description": "A Streamlit demonstration that applies a saved classifier to health and lifestyle inputs, alongside a notebook for exploratory analysis and model comparison.",
    "highlights": [
      "Collect gender, age, hypertension, heart disease, smoking history, BMI, HbA1c, and blood glucose inputs",
      "Run the saved model and display its predicted class and available probability output",
      "Explore SMOTE and compare Logistic Regression, Random Forest, and Gradient Boosting in the notebook"
    ],
    "technologies": [
      "Python",
      "scikit-learn",
      "pandas",
      "Streamlit"
    ],
    "notes": [
      "Educational model output should not be interpreted as a medical diagnosis."
    ],
    "image": "/project-images/diabetes-detection.png",
    "repository": "diabetes",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/diabetes"
  },
  {
    "id": "retail-sales",
    "title": "Retail Sales & Demographics",
    "tagline": "Sales performance analysis segmented by customer demographics.",
    "category": "Data Science",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "An exploratory retail analytics notebook with a Gradio dashboard for inspecting sales, customer demographics, and product-category patterns.",
    "highlights": [
      "Calculate retail KPIs and summarize transaction values",
      "Plot sales over time and revenue by product category",
      "Explore gender distribution, age/spending relationships, quantities, and correlations",
      "Launch the notebook's Gradio interface to display the analysis outputs"
    ],
    "technologies": [
      "Python",
      "pandas",
      "Matplotlib",
      "Seaborn",
      "Gradio"
    ],
    "image": "/project-images/retail-sales.png",
    "repository": "Retail_Sales_and_Customer_Demographics_Analysis",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Retail_Sales_and_Customer_Demographics_Analysis"
  },
  {
    "id": "student-grade-prediction",
    "title": "Student Grade Prediction",
    "tagline": "Forecasting student performance from academic and attendance features.",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A student performance regression notebook that compares models for predicting the final grade `G3` and includes an interactive Gradio example.",
    "highlights": [
      "Analyze student demographics, study habits, prior grades, and final-grade relationships",
      "Compare Linear Regression, Ridge, Lasso, Random Forest, Gradient Boosting, and XGBoost",
      "Evaluate regression predictions with error metrics and R²",
      "Provide a Gradio form using a saved Lasso model"
    ],
    "technologies": [
      "Python",
      "scikit-learn",
      "XGBoost",
      "pandas",
      "Gradio"
    ],
    "image": "/project-images/student-grade-prediction.png",
    "repository": "Student-Final-Grade-Prediction",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Student-Final-Grade-Prediction"
  },
  {
    "id": "traffic-accident-prediction",
    "title": "Traffic Accident Prediction",
    "tagline": "Accident-count forecasting with XGBoost and Streamlit reporting.",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A Streamlit accident severity demo that reconstructs its one-hot feature schema from a committed reference dataset and runs a saved XGBoost classifier.",
    "highlights": [
      "Collect 14 driver, vehicle, collision, road, and environment inputs",
      "Derive expected dummy columns from cleaned.csv using get_dummies(drop_first=True)",
      "Align encoded user inputs with that schema before classification"
    ],
    "technologies": [
      "Python",
      "XGBoost",
      "pandas",
      "Streamlit"
    ],
    "image": "/project-images/road-safety.png",
    "repository": "Traffic_Accident_Prediction",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Traffic_Accident_Prediction",
    "relatedRepos": [
      {
        "slug": "traffic",
        "isPrivate": false,
        "role": "Separate encoder-based severity application",
        "url": "https://github.com/IbrahimAbdelsattar/traffic"
      }
    ]
  },
  {
    "id": "flight-reservation",
    "title": "Flight Reservation Desktop App",
    "tagline": "Desktop booking application built in Python.",
    "category": "Full-Stack Systems",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A small Tkinter desktop project for creating, viewing, editing, and deleting local flight reservation records.",
    "highlights": [
      "Create reservations with passenger name, flight number, route, date, and seat",
      "List stored reservations and open individual records for editing or deletion",
      "Persist records in a local flights.db SQLite database initialized by database.py"
    ],
    "technologies": [
      "Python",
      "Tkinter",
      "SQLite"
    ],
    "image": "/project-images/flight-reservation.png",
    "notes": [
      "Circular imports between page modules currently prevent the documented launch."
    ],
    "repository": "Flight-Reservation-Desktop-App",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Flight-Reservation-Desktop-App"
  },
  {
    "id": "email-intelligence-agent",
    "title": "Email Intelligence & Excel Agent",
    "tagline": "Automated inbox harvesting that turns scattered email into structured Excel reporting.",
    "category": "Full-Stack Systems",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "AI Engineer",
    "description": "A Python repository containing two separate Streamlit tools: a streamed chat demo and an email extraction/export application.",
    "highlights": [
      "Run the original conversational demo with an API key entered in the interface",
      "Connect to an inbox through IMAP or Gmail API for email extraction",
      "Filter and inspect retrieved emails and export a formatted Excel workbook",
      "Keep the chat and email tools as independent entry points"
    ],
    "technologies": [
      "Python",
      "Streamlit",
      "OpenAI client",
      "IMAP/Gmail API",
      "pandas",
      "openpyxl"
    ],
    "image": "/project-images/sentiment-analysis.jpg",
    "repository": "chatbot",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/chatbot"
  },
  {
    "id": "gtc-ml-labs",
    "title": "California House Price Prediction",
    "tagline": "Machine-learning labs from a supervised training programme.",
    "category": "Research & Coursework",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "Student",
    "description": "A GTC machine learning internship project that explores California housing data and provides a Streamlit interface for median house value estimation.",
    "highlights": [
      "Collect location, housing age, room and bedroom counts, population, households, income, and ocean proximity",
      "Load the saved LightGBM model and display a median house value estimate",
      "Compare linear, tree-based, ensemble, and neural regression models in the notebook"
    ],
    "technologies": [
      "Python",
      "LightGBM",
      "scikit-learn",
      "pandas",
      "Streamlit"
    ],
    "relatedRepos": [
      {
        "slug": "GTC-ML-Internship-California-House-Price-Prediction",
        "isPrivate": false,
        "role": "House-price regression lab",
        "url": "https://github.com/IbrahimAbdelsattar/GTC-ML-Internship-California-House-Price-Prediction"
      },
      {
        "slug": "GTC-ML-Internship-Diabetes-Prediction",
        "isPrivate": false,
        "role": "Diabetes classification lab",
        "url": "https://github.com/IbrahimAbdelsattar/GTC-ML-Internship-Diabetes-Prediction"
      },
      {
        "slug": "gtc-ml-project1-hotel-bookings",
        "isPrivate": false,
        "role": "Hotel-bookings cancellation lab",
        "url": "https://github.com/IbrahimAbdelsattar/gtc-ml-project1-hotel-bookings"
      },
      {
        "slug": "GTC-Fraud-Detection",
        "isPrivate": false,
        "role": "Fraud-detection lab",
        "url": "https://github.com/IbrahimAbdelsattar/GTC-Fraud-Detection"
      }
    ],
    "image": "/project-images/house-price.png",
    "repository": "GTC-ML-Internship-California-House-Price-Prediction",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/GTC-ML-Internship-California-House-Price-Prediction"
  },
  {
    "id": "depi-data-science",
    "title": "DEPI Employee Attrition Analysis",
    "tagline": "Data-science coursework from the Digital Egypt Pioneers Initiative.",
    "category": "Research & Coursework",
    "status": "Completed",
    "tier": "archive",
    "year": "2024",
    "role": "Student",
    "description": "An employee attrition project combining exploratory analysis, classification experiments, a Streamlit prediction interface, reports, and Power BI dashboards.",
    "highlights": [
      "Analyze employee attributes and associations with attrition",
      "Compare classifiers, resampling strategies, feature engineering, and hyperparameter searches",
      "Present a Streamlit form for an employee's demographic and employment details",
      "Provide separate univariate and bivariate Power BI dashboards and written project reports"
    ],
    "technologies": [
      "Python",
      "scikit-learn",
      "LightGBM/XGBoost/CatBoost",
      "Streamlit",
      "Power BI"
    ],
    "relatedRepos": [
      {
        "slug": "Data-Science-Projects-.DEPI",
        "isPrivate": false,
        "role": "Project-track coursework",
        "url": "https://github.com/IbrahimAbdelsattar/Data-Science-Projects-.DEPI"
      },
      {
        "slug": "Data-Science-Assignments.DEPI",
        "isPrivate": false,
        "role": "Assignment-track coursework",
        "url": "https://github.com/IbrahimAbdelsattar/Data-Science-Assignments.DEPI"
      }
    ],
    "image": "/project-images/sentiment-analysis.jpg",
    "notes": [
      "The Streamlit prediction app requires the missing final_model.pkl artifact."
    ],
    "repository": "Data-Science-Projects-.DEPI",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Data-Science-Projects-.DEPI"
  },
  {
    "id": "bank-term-deposit",
    "title": "Bank Term Deposit Prediction",
    "tagline": "Subscription propensity modelling for bank term deposits.",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "role": "Student",
    "description": "A banking marketing analysis notebook that compares classifiers for predicting whether a customer subscribes to a term deposit.",
    "highlights": [
      "Explore client attributes and campaign variables",
      "Encode categorical features and apply MinMax scaling",
      "Compare Logistic Regression, SVC, K-Nearest Neighbors, and Random Forest"
    ],
    "technologies": [
      "Python",
      "pandas",
      "scikit-learn",
      "Matplotlib",
      "Seaborn"
    ],
    "image": "/project-images/bank-term-deposit.png",
    "repository": "Bank-Term-Deposit-Prediction-",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Bank-Term-Deposit-Prediction-"
  },
  {
    "title": "DEPI Python Assignments",
    "description": "A collection of introductory Python exercises and small interactive programs completed during the Digital Egypt Pioneers Initiative.",
    "highlights": [
      "Practice functions, conditionals, loops, strings, lists, tuples, and dictionaries",
      "Implement vowel counting, maximum selection, tuple addition, and a number-guessing game",
      "Build an interactive calculator with division-by-zero handling",
      "Explore comprehensions, factorials, character counts, slicing, and simple patterns"
    ],
    "technologies": [
      "Python",
      "Jupyter Notebook"
    ],
    "id": "depi-python-assignments",
    "category": "Research & Coursework",
    "status": "Completed",
    "tier": "archive",
    "year": "2024",
    "tagline": "A collection of introductory Python exercises and small interactive programs completed during the Digital Egypt Pioneers Initiative.",
    "repository": "Data-Science-Assignments.DEPI",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Data-Science-Assignments.DEPI"
  },
  {
    "title": "Twitter Sentiment Analysis",
    "description": "A text analytics and BERT fine-tuning notebook for three-class sentiment classification, with Streamlit and Gradio deployment examples embedded in notebook cells.",
    "highlights": [
      "Explore and clean tweet text and sentiment labels",
      "Tokenize data and fine-tune a BERT sequence classifier",
      "Inspect classification metrics and confusion matrices",
      "Experiment with interactive inference through notebook-based Streamlit and Gradio examples"
    ],
    "technologies": [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "pandas",
      "NLTK"
    ],
    "id": "twitter-sentiment-analysis",
    "category": "NLP & Speech",
    "status": "Research",
    "tier": "archive",
    "year": "2025",
    "tagline": "A text analytics and BERT fine-tuning notebook for three-class sentiment classification, with Streamlit and Gradio deployment examples embedded in notebook cells.",
    "notes": [
      "A ready-to-load fine-tuned classifier checkpoint is not committed."
    ],
    "repository": "twitter-sentiment-analysis",
    "sourceKind": "fork",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/twitter-sentiment-analysis",
    "upstreamUrl": "https://github.com/amr-belal/twitter-sentiment-analysis",
    "role": "Fork owner; upstream authors credited"
  },
  {
    "title": "Calorie Expenditure Submission",
    "description": "A calorie expenditure prediction project distributed as a RAR archive.",
    "highlights": [
      "Provide the project materials in one downloadable archive",
      "Keep the original packaged submission available for extraction and inspection"
    ],
    "technologies": [
      "Archived machine learning project"
    ],
    "id": "calorie-expenditure",
    "category": "Machine Learning",
    "status": "Archived Submission",
    "tier": "archive",
    "year": "2025",
    "tagline": "A calorie expenditure prediction project distributed as a RAR archive.",
    "notes": [
      "The submission is a RAR archive. Its internal model architecture and runnable entry point have not been verified."
    ],
    "repository": "Predict-Calorie-Expenditure",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Predict-Calorie-Expenditure"
  },
  {
    "title": "Elevvo Machine Learning Internship",
    "description": "A collection of machine learning task submissions distributed as ZIP archives.",
    "highlights": [
      "Organize separate submissions for customer segmentation, loan approval, movie recommendation, student performance, and a GTRSB task archive",
      "Keep each task's files in its own downloadable archive"
    ],
    "technologies": [
      "Machine learning project collection",
      "Archived source files"
    ],
    "id": "elevvo-ml-internship",
    "category": "Research & Coursework",
    "status": "Archived Submission",
    "tier": "archive",
    "year": "2025",
    "tagline": "A collection of machine learning task submissions distributed as ZIP archives.",
    "notes": [
      "Submissions are ZIP archives. Individual model architectures, metrics, and dependencies must be checked after extraction."
    ],
    "repository": "Elevvo-ML-Internship",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Elevvo-ML-Internship"
  },
  {
    "title": "Hotel Booking Analysis",
    "description": "A GTC internship notebook exploring hotel booking data, preparing features, and creating a stratified train/test split for cancellation analysis.",
    "highlights": [
      "Inspect booking distributions, missing values, and reservation attributes",
      "Explore patterns across hotel types, guest segments, and booking characteristics",
      "Prepare the dataset and split the cancellation target for subsequent modeling"
    ],
    "technologies": [
      "Python",
      "pandas",
      "Matplotlib",
      "Seaborn",
      "missingno",
      "scikit-learn"
    ],
    "id": "hotel-booking-analysis",
    "category": "Data Science",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "tagline": "A GTC internship notebook exploring hotel booking data, preparing features, and creating a stratified train/test split for cancellation analysis.",
    "notes": [
      "The committed workflow covers exploration and preparation; no trained cancellation classifier is committed."
    ],
    "repository": "gtc-ml-project1-hotel-bookings",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/gtc-ml-project1-hotel-bookings"
  },
  {
    "title": "GTC Diabetes Prediction",
    "description": "A GTC internship classification project with a Streamlit interface using a saved Logistic Regression model and scaler.",
    "highlights": [
      "Enter eight features: pregnancies, glucose, blood pressure, skin thickness, insulin, BMI, diabetes pedigree function, and age",
      "Apply the fitted scaler before Logistic Regression inference",
      "Explore several classifiers with GridSearchCV in the training notebook"
    ],
    "technologies": [
      "Python",
      "scikit-learn",
      "pandas",
      "NumPy",
      "Streamlit"
    ],
    "id": "gtc-diabetes-prediction",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "tagline": "A GTC internship classification project with a Streamlit interface using a saved Logistic Regression model and scaler.",
    "notes": [
      "Educational model output should not be interpreted as a medical diagnosis."
    ],
    "repository": "GTC-ML-Internship-Diabetes-Prediction",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/GTC-ML-Internship-Diabetes-Prediction"
  },
  {
    "title": "GTC Fraud Detection",
    "description": "A structured credit-card fraud detection project with feature engineering, a stacking ensemble, saved inference artifacts, and a Streamlit dashboard.",
    "highlights": [
      "Train a pipeline with median imputation, SMOTE, and a stacking classifier",
      "Combine XGBoost, CatBoost, and LightGBM base learners with Logistic Regression as the final estimator",
      "Load preprocessing artifacts, a saved model pipeline, and an operating threshold for inference",
      "Explore single transactions, batch inputs, and dashboard monitoring; generated sample transactions are demonstrations"
    ],
    "technologies": [
      "Python",
      "XGBoost",
      "LightGBM",
      "CatBoost",
      "imbalanced-learn",
      "Streamlit"
    ],
    "id": "gtc-fraud-detection",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "notable",
    "year": "2025",
    "tagline": "A structured credit-card fraud detection project with feature engineering, a stacking ensemble, saved inference artifacts, and a Streamlit dashboard.",
    "repository": "GTC-Fraud-Detection",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/GTC-Fraud-Detection"
  },
  {
    "title": "Profile README Generator",
    "description": "A fork of Mauro de Souza's profile README generator: a Next.js application for assembling developer profile content and producing a README.",
    "highlights": [
      "Build profile content through reusable fields and canvas components",
      "Render a result page for the assembled README",
      "Provide resource and multilingual blog pages alongside the editor"
    ],
    "technologies": [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS"
    ],
    "id": "profile-readme-generator",
    "category": "Developer Tools",
    "status": "Research",
    "tier": "archive",
    "year": "2025",
    "tagline": "A fork of Mauro de Souza's profile README generator: a Next.js application for assembling developer profile content and producing a README.",
    "repository": "profile-readme-generator",
    "sourceKind": "fork",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/profile-readme-generator",
    "upstreamUrl": "https://github.com/maurodesouza/profile-readme-generator",
    "role": "Fork owner; upstream authors credited"
  },
  {
    "title": "Profile README Templates",
    "description": "A forked collection of community profile README examples and Markdown templates for inspiration and customization.",
    "highlights": [
      "Browse editable templates and multimedia examples",
      "Use the categorized profile index to explore different README styles",
      "Copy an example and replace its personal details, links, images, and widget settings with your own"
    ],
    "technologies": [
      "Markdown",
      "Community examples"
    ],
    "id": "profile-readme-templates",
    "category": "Developer Tools",
    "status": "Research",
    "tier": "archive",
    "year": "2025",
    "tagline": "A forked collection of community profile README examples and Markdown templates for inspiration and customization.",
    "repository": "Profile-README-Templates",
    "sourceKind": "fork",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Profile-README-Templates",
    "upstreamUrl": "https://github.com/A-Hemeda/Profile-Readme-Templates",
    "role": "Fork owner; upstream authors credited"
  },
  {
    "title": "Traffic Severity Classifier",
    "description": "A Streamlit demonstration of accident severity classification from driver, vehicle, road, and environmental categories.",
    "highlights": [
      "Collect 14 categorical accident attributes",
      "Use the saved label encoders to prepare model inputs",
      "Run an XGBoost classifier stored in JSON and display a severity label"
    ],
    "technologies": [
      "Python",
      "XGBoost",
      "pandas",
      "Streamlit"
    ],
    "id": "traffic-severity-app",
    "category": "Machine Learning",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "tagline": "A Streamlit demonstration of accident severity classification from driver, vehicle, road, and environmental categories.",
    "repository": "traffic",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/traffic"
  },
  {
    "title": "Ibrahim Abdelsattar Portfolio",
    "description": "A React portfolio presenting AI and data science projects, professional background, certifications, and contact information, with a separate conversational assistant backend.",
    "highlights": [
      "Navigate home, about, project catalog, project details, certifications, and contact pages",
      "Display project cards and supporting portfolio assets",
      "Provide an interactive chatbot UI connected to the separate FastAPI service",
      "Include archived datasets and notebooks from selected portfolio projects"
    ],
    "technologies": [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "FastAPI"
    ],
    "id": "ibrahim-portfolio",
    "category": "Full-Stack Systems",
    "status": "Active Development",
    "tier": "notable",
    "year": "2025",
    "tagline": "A React portfolio presenting AI and data science projects, professional background, certifications, and contact information, with a separate conversational assistant backend.",
    "repository": "Ibrahim-Portfolio",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/Ibrahim-Portfolio"
  },
  {
    "title": "Mini RAG Scaffold",
    "description": "A starter repository for a small retrieval-augmented generation project.",
    "highlights": [
      "Provide a README, Git ignore rules, and editor settings as a starting point"
    ],
    "technologies": [
      "Project scaffold"
    ],
    "id": "mini-rag",
    "category": "Generative AI & Agents",
    "status": "Scaffold",
    "tier": "archive",
    "year": "2026",
    "tagline": "A starter repository for a small retrieval-augmented generation project.",
    "notes": [
      "Only documentation, ignore rules, and editor settings are committed. No RAG application is implemented."
    ],
    "repository": "mini-rag",
    "sourceKind": "project",
    "sourcePrivate": true
  },
  {
    "title": "Teacher Knowledge Assistant",
    "description": "A Streamlit interface designed for document-based educational question answering, summaries, quiz generation, and retrieval evaluation.",
    "highlights": [
      "Provide document upload and question-answering screens",
      "Expose document summary and quiz-generation controls",
      "Show retrieval settings, pipeline metadata, and evaluation visualizations"
    ],
    "technologies": [
      "Python",
      "Streamlit",
      "Transformers",
      "LangChain/LlamaIndex dependencies"
    ],
    "id": "teacher-knowledge-assistant",
    "category": "Generative AI & Agents",
    "status": "Prototype",
    "tier": "archive",
    "year": "2026",
    "tagline": "A Streamlit interface designed for document-based educational question answering, summaries, quiz generation, and retrieval evaluation.",
    "notes": [
      "The Streamlit app imports a src package that is absent from this checkout."
    ],
    "repository": "RAG-Powered-Knowledge-Assistantf-for-Teachers",
    "sourceKind": "fork",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers",
    "upstreamUrl": "https://github.com/Dr-GirijaKaretla/RAG-Knowledge-Assistant-For-Teachers",
    "role": "Fork owner; upstream authors credited"
  },
  {
    "title": "ALIENS Venture",
    "description": "A talent and recruiting platform with separate candidate and recruiter experiences, career tools, onboarding flows, and an Express authentication service.",
    "highlights": [
      "Provide separate talent and hunter onboarding and workspace routes",
      "Expose career-board, CV, interview-practice, mentor, portfolio, and recruiter interfaces",
      "Use a Supabase-backed data layer and server-side authentication routes",
      "Provide an Express health endpoint at /health and authentication endpoints under /api/auth"
    ],
    "technologies": [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express",
      "Supabase"
    ],
    "id": "aliens-venture",
    "category": "AI Products",
    "status": "Prototype",
    "tier": "notable",
    "year": "2026",
    "tagline": "A talent and recruiting platform with separate candidate and recruiter experiences, career tools, onboarding flows, and an Express authentication service.",
    "repository": "alien-ai-venture-main",
    "sourceKind": "project",
    "sourcePrivate": true
  },
  {
    "title": "BodyIQ",
    "description": "A fitness tracking web application with a FastAPI backend, a plain HTML/CSS/JavaScript frontend, and AI-assisted chat and recommendations.",
    "highlights": [
      "Support signup, signin, profile editing, and password-reset flows",
      "Record weight history, daily logs, and user settings",
      "Provide fitness calculator, progress, dashboard, and recommendation pages",
      "Call OpenRouter for fitness chat and recommendation generation"
    ],
    "technologies": [
      "Python",
      "FastAPI",
      "HTML/CSS/JavaScript",
      "JSON storage",
      "OpenRouter"
    ],
    "id": "bodyiq",
    "category": "AI Products",
    "status": "Prototype",
    "tier": "notable",
    "year": "2026",
    "tagline": "A fitness tracking web application with a FastAPI backend, a plain HTML/CSS/JavaScript frontend, and AI-assisted chat and recommendations.",
    "repository": "bodyiq-mti-main",
    "sourceKind": "project",
    "sourcePrivate": true
  },
  {
    "title": "NumeriX AI Tutor Labs",
    "description": "A numerical learning prototype with a streaming AI tutor and an existing TypeScript numerical engine.",
    "highlights": [
      "Provide tutor, solver-explanation, debugging, and viva conversation modes",
      "Stream replies from a Supabase chat function backed by the Lovable AI gateway",
      "Store conversation history in browser localStorage",
      "Include root-finding and linear-system routines for further interface development"
    ],
    "technologies": [
      "React 18",
      "TypeScript",
      "Vite",
      "Supabase Edge Functions",
      "AI gateway"
    ],
    "id": "numerix-ai-tutor",
    "category": "Generative AI & Agents",
    "status": "Prototype",
    "tier": "notable",
    "year": "2026",
    "tagline": "A numerical learning prototype with a streaming AI tutor and an existing TypeScript numerical engine.",
    "notes": [
      "The tutor is implemented; solver, learning, comparison, lab, and quiz routes currently show placeholders."
    ],
    "repository": "numerix-labs",
    "sourceKind": "project",
    "sourcePrivate": true
  },
  {
    "title": "Numerical Analysis Desktop Lab",
    "description": "A Tkinter application for experimenting with root-finding algorithms and small linear systems, with iteration tracking and convergence plots.",
    "highlights": [
      "Solve roots with Bisection, False Position, Newton-Raphson, Secant, and Fixed Point iteration",
      "Solve linear systems through Gaussian elimination, Gauss-Jordan, LU decomposition, or Cramer's rule",
      "Inspect convergence steps and visualize the iteration path in the desktop interface"
    ],
    "technologies": [
      "Python",
      "Tkinter",
      "NumPy",
      "Matplotlib"
    ],
    "id": "numerical-desktop-lab",
    "category": "Research & Coursework",
    "status": "Completed",
    "tier": "archive",
    "year": "2026",
    "tagline": "A Tkinter application for experimenting with root-finding algorithms and small linear systems, with iteration tracking and convergence plots.",
    "repository": "numerical",
    "sourceKind": "project",
    "sourcePrivate": true
  },
  {
    "title": "Numerical Methods Web Lab",
    "description": "A browser-based numerical methods interface for root finding and linear systems, implemented with a local TypeScript calculation engine.",
    "highlights": [
      "Navigate the landing page and solver route",
      "Choose among five root-finding methods and four linear-system methods",
      "Enter problem parameters and inspect calculated roots or linear solutions",
      "Keep calculation routines separate from the solver page"
    ],
    "technologies": [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Recharts"
    ],
    "id": "numerical-web-lab",
    "category": "Research & Coursework",
    "status": "Prototype",
    "tier": "archive",
    "year": "2026",
    "tagline": "A browser-based numerical methods interface for root finding and linear systems, implemented with a local TypeScript calculation engine.",
    "repository": "numerical-g2",
    "sourceKind": "project",
    "sourcePrivate": true
  },
  {
    "title": "Trio Learn Hub UI Prototype",
    "description": "A React prototype of a corporate learning hub with employee course views and an administrator workspace.",
    "highlights": [
      "Display employee dashboards, course listings, course details, and certificates",
      "Provide administrator views for employees, categories, courses, and analytics",
      "Use shared layouts, route guards, animation, and mock learning records"
    ],
    "technologies": [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Three.js"
    ],
    "id": "trio-ui-prototype",
    "category": "Full-Stack Systems",
    "status": "Prototype",
    "tier": "archive",
    "year": "2026",
    "tagline": "A React prototype of a corporate learning hub with employee course views and an administrator workspace.",
    "notes": [
      "Users, authentication, and learning records are mocked in the browser. This is separate from the API-backed Trio Academy repository."
    ],
    "repository": "trio-learn-hub",
    "sourceKind": "project",
    "sourcePrivate": true
  },
  {
    "description": "A native Android e-learning client for the TeaTec platform, built with Kotlin and Jetpack Compose and connected to ASP.NET Core REST APIs.",
    "highlights": [
      "Browse courses and learning content on Android",
      "Use quizzes, certificates, and student account screens",
      "Organize the client with MVVM, Hilt, and a REST data layer",
      "Support Arabic and right-to-left layouts"
    ],
    "technologies": [
      "Kotlin",
      "Jetpack Compose",
      "Android",
      "Hilt",
      "Retrofit",
      "REST API"
    ],
    "architecture": {
      "frontend": [
        "Kotlin",
        "Jetpack Compose"
      ],
      "backend": [
        "ASP.NET Core API integration"
      ],
      "infrastructure": [
        "MVVM",
        "Hilt"
      ]
    },
    "id": "teatec-android",
    "title": "TeaTec Android",
    "category": "Full-Stack Systems",
    "status": "Active Development",
    "tier": "notable",
    "year": "2026",
    "tagline": "A native Android e-learning client for the TeaTec platform, built with Kotlin and Jetpack Compose and connected to ASP.NET Core REST APIs.",
    "repository": "TeaTec-Android",
    "sourceKind": "project",
    "sourcePrivate": true
  },
  {
    "title": "Codex Skills Catalog",
    "description": "A fork of OpenAI's skills catalog containing task instructions, references, assets, and helper scripts for Codex workflows.",
    "highlights": [
      "Organize task skills under the committed catalog directories",
      "Provide each skill's SKILL.md instructions alongside references and optional scripts/assets",
      "Include workflows spanning development, design, documents, research, and other tasks"
    ],
    "technologies": [
      "Markdown skills",
      "Reference material",
      "Task-specific scripts"
    ],
    "id": "codex-skills",
    "category": "Developer Tools",
    "status": "Research",
    "tier": "archive",
    "year": "2026",
    "tagline": "A fork of OpenAI's skills catalog containing task instructions, references, assets, and helper scripts for Codex workflows.",
    "repository": "skills",
    "sourceKind": "fork",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/skills",
    "upstreamUrl": "https://github.com/openai/skills",
    "role": "Fork owner; upstream authors credited"
  },
  {
    "description": "A corporate website presenting Soliman Group and its businesses, including EFS, Proc, and SSC. Next.js routes provide company and service pages, with a static-export deployment workflow.",
    "highlights": [
      "Company hierarchy and business-specific pages",
      "Contact and legal pages",
      "Content separated from page components",
      "Static Next.js export with route, accessibility, and SEO checks"
    ],
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "Three.js"
    ],
    "architecture": {
      "frontend": [
        "Next.js",
        "React",
        "Three.js"
      ],
      "infrastructure": [
        "Static export",
        "HostGator deployment scripts"
      ]
    },
    "id": "soliman-group",
    "title": "Soliman Group Website",
    "category": "Full-Stack Systems",
    "status": "Active Development",
    "tier": "notable",
    "year": "2026",
    "tagline": "A corporate website presenting Soliman Group and its businesses, including EFS, Proc, and SSC.",
    "repository": "soliman-group",
    "sourceKind": "project",
    "sourcePrivate": true
  },
  {
    "title": "SearXNG Metasearch",
    "description": "A fork of SearXNG, the open-source metasearch engine that combines results from multiple search services.",
    "highlights": [
      "Query configured search engines through a unified interface",
      "Provide search categories, preferences, and optional output formats",
      "Offer a configurable self-hosted search service"
    ],
    "technologies": [
      "Python",
      "Flask",
      "Search engine integrations",
      "Browser frontend"
    ],
    "id": "searxng",
    "category": "Developer Tools",
    "status": "Research",
    "tier": "archive",
    "year": "2026",
    "tagline": "A fork of SearXNG, the open-source metasearch engine that combines results from multiple search services.",
    "repository": "searxng",
    "sourceKind": "fork",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/searxng",
    "upstreamUrl": "https://github.com/searxng/searxng",
    "role": "Fork owner; upstream authors credited"
  },
  {
    "description": "A fork of Nous Research's Hermes Agent, an AI assistant with an interactive CLI, tool execution, a messaging gateway, and scheduled-task commands. Upstream authorship belongs to Nous Research and its contributors.",
    "highlights": [
      "Interactive agent CLI",
      "Gateway and scheduled-task commands",
      "Tool and skill-based assistant workflows"
    ],
    "technologies": [
      "Python",
      "LLMs",
      "Agent Tools"
    ],
    "id": "hermes-agent",
    "title": "Hermes Agent",
    "category": "Generative AI & Agents",
    "status": "Research",
    "tier": "archive",
    "year": "2026",
    "tagline": "A fork of Nous Research's Hermes Agent, an AI assistant with an interactive CLI, tool execution, a messaging gateway, and scheduled-task commands.",
    "repository": "hermes-agent",
    "sourceKind": "fork",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/hermes-agent",
    "upstreamUrl": "https://github.com/NousResearch/hermes-agent",
    "role": "Fork owner; upstream authors credited"
  },
  {
    "description": "A fork of the OmniRoute AI gateway. It provides a common endpoint for model-provider routing, fallback policies, and dashboard-based configuration. Upstream authorship belongs to the original project and its contributors.",
    "highlights": [
      "Unified model-provider gateway",
      "Provider routing and fallback configuration",
      "Administrative dashboard"
    ],
    "technologies": [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "AI Gateway"
    ],
    "id": "omniroute",
    "title": "OmniRoute AI Gateway",
    "category": "Generative AI & Agents",
    "status": "Research",
    "tier": "archive",
    "year": "2026",
    "tagline": "A fork of the OmniRoute AI gateway.",
    "repository": "OmniRoute",
    "sourceKind": "fork",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/OmniRoute",
    "upstreamUrl": "https://github.com/diegosouzapw/OmniRoute",
    "role": "Fork owner; upstream authors credited"
  },
  {
    "description": "A fork of OpenClaw, an open-source personal AI assistant with a gateway, messaging integrations, and native clients. The original assistant is developed by the OpenClaw project and its contributors.",
    "highlights": [
      "Personal or shared assistant gateway",
      "Messaging-channel integrations",
      "Configurable model and agent providers",
      "Native companion applications"
    ],
    "technologies": [
      "TypeScript",
      "Node.js",
      "LLMs",
      "Messaging Integrations"
    ],
    "id": "openclaw",
    "title": "OpenClaw Assistant",
    "category": "Generative AI & Agents",
    "status": "Research",
    "tier": "archive",
    "year": "2026",
    "tagline": "A fork of OpenClaw, an open-source personal AI assistant with a gateway, messaging integrations, and native clients.",
    "repository": "openclaw",
    "sourceKind": "fork",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/openclaw",
    "upstreamUrl": "https://github.com/openclaw/openclaw",
    "role": "Fork owner; upstream authors credited"
  },
  {
    "description": "The profile repository behind the GitHub account overview, presenting selected projects, technical interests, and links to the portfolio.",
    "highlights": [
      "Profile introduction and technology overview",
      "Featured repository links",
      "Portfolio and professional contact links"
    ],
    "technologies": [
      "Markdown",
      "HTML",
      "GitHub"
    ],
    "id": "github-profile",
    "title": "GitHub Profile README",
    "category": "Developer Tools",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "tagline": "The profile repository behind the GitHub account overview, presenting selected projects, technical interests, and links to the portfolio.",
    "repository": "IbrahimAbdelsattar",
    "sourceKind": "project",
    "sourcePrivate": false,
    "githubUrl": "https://github.com/IbrahimAbdelsattar/IbrahimAbdelsattar"
  },
  {
    "title": "Personal Memory Website",
    "description": "A small static website for a personal dedication and a media-based memories gallery.",
    "highlights": [
      "Provide a landing page, dedication page, and memories gallery",
      "Display local photos, videos, and audio included with the site",
      "Use custom page styling without a build framework"
    ],
    "technologies": [
      "HTML",
      "CSS",
      "JavaScript",
      "Static media"
    ],
    "id": "personal-memory-website",
    "category": "Full-Stack Systems",
    "status": "Completed",
    "tier": "archive",
    "year": "2025",
    "tagline": "A small static website for a personal dedication and a media-based memories gallery.",
    "repository": "love",
    "sourceKind": "project",
    "sourcePrivate": true
  }
];

export const featuredProjects = projects.filter((project) => project.tier === "flagship");

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.id === slug);

export const allTechnologies = Array.from(
  new Set(projects.filter((project) => project.sourceKind === "project").flatMap((project) => project.technologies)),
).sort((a, b) => a.localeCompare(b));

export const projectStats = {
  total: projects.length,
  featured: featuredProjects.length,
  publicRepos: projects.filter((project) => project.githubUrl).length,
  forks: projects.filter((project) => project.sourceKind === "fork").length,
  technologies: allTechnologies.length,
  categories: new Set(projects.map((project) => project.category)).size,
};
