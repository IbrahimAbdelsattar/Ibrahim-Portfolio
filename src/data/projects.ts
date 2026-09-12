export interface Project {
  title: string;
  category: "GenAI & Agents" | "NLP & Speech" | "Machine Learning & Analytics" | "Full-Stack & Systems";
  description: string;
  technologies: string[];
  image: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  isPinned?: boolean;
}

export const projects: Project[] = [
  // ==========================================
  // 📌 7 PINNED FLAGSHIP PROJECTS (Top Priority)
  // ==========================================
  {
    title: "Dawrly",
    category: "GenAI & Agents",
    description: `🔍 Intelligent AI-Powered Search & Discovery Engine! ⚡
Dawrly is a modern local discovery platform designed for discovering nearby businesses, essential services, professional practices, and specialized venues. Featuring intelligent web crawlers, inverted indexing, dynamic geospatial filtering, and an ultra-modern glassmorphic interface.

Key Highlights:
	✅ High-Performance Search – Rapid semantic queries and real-time category filtering
	✅ Intelligent Crawlers – Automated data aggregation and structured content parsing
	✅ Glassmorphic Design System – Custom theme with fluid dark mode and responsive layout
	✅ Scalable Architecture – Dockerized backend with PostgreSQL and caching layers`,
    technologies: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS", "Docker", "PostgreSQL", "Elasticsearch"],
    image: "/project-images/dawrly-platform.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Dawrly",
    liveUrl: "https://dawrly.space",
    isPinned: true,
    featured: true,
  },
  {
    title: "Wajehni AI (Nexus Academy)",
    category: "GenAI & Agents",
    description: `🧭 AI-Powered Academic Discovery & Cognitive Career Mentorship! 🎓
Wajehni is an intelligent guidance platform that evaluates student aptitudes and interests through dynamic cognitive assessments, recommending tailored university majors and personalized career roadmaps.

Key Highlights:
	✅ AI Mentor "Za'atar" – Interactive conversational mentor providing real-time personalized guidance
	✅ Cognitive Radar Profiling – Dynamic 5-dimensional skill breakdown (Logic, Creativity, Architecture, Problem Solving, Tech Readiness)
	✅ Adaptive Curriculum Synthesis – Synthesizes custom learning milestones and curated resources
	✅ Interactive Tech & Career Insights – Rotating market trend forecasts and skill readiness checks`,
    technologies: ["TypeScript", "React", "Node.js", "Generative AI", "Tailwind CSS", "Recharts", "PostgreSQL"],
    image: "/project-images/wajehni-ai.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Nexus_Academy",
    isPinned: true,
    featured: true,
  },
  {
    title: "SupplyMind AI",
    category: "GenAI & Agents",
    description: `🚚 Intelligent Supply Chain & Logistics Management Powered by AI! 📦
SupplyMind AI combines predictive machine learning and generative AI to optimize inventory levels, forecast demand fluctuations, and automate supply chain decision-making.

Key Highlights:
	✅ Predictive Demand Forecasting models reducing inventory holding costs by up to 25%
	✅ Integrated LLM Agents for automated supply chain anomaly detection and reporting
	✅ Visualized Real-time Logistics Dashboards for operational transparency
	✅ Built Automated Risk Alerts for vendor performance and shipment delays`,
    technologies: ["Python", "Generative AI", "Predictive Analytics", "Pandas", "Scikit-Learn", "Streamlit", "Docker"],
    image: "/project-images/supplymind-ai.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/SupplyMindAI",
    isPinned: true,
    featured: true,
  },
  {
    title: "TeaTec (Web & Android)",
    category: "Full-Stack & Systems",
    description: `🍵 Modern Multi-Platform Technology & E-Learning Ecosystem! 📱
TeaTec bridges educational gaps through an integrated web and native Android platform delivering interactive technology courses, real-time code challenges, and structured student progress tracking.

Key Highlights:
	✅ Native Android Application developed in Kotlin with modern Material & fluid UI
	✅ Responsive Web Client offering seamless video lectures and interactive quizzes
	✅ Instructor & Student Portals for tracking course completions and grading
	✅ Cloud-Synced Architecture with offline lesson caching capabilities`,
    technologies: ["Kotlin", "Android SDK", "TypeScript", "React", "Tailwind CSS", "Firebase", "REST API"],
    image: "/project-images/teatec-platform.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/tea-tec",
    isPinned: true,
    featured: true,
  },
  {
    title: "Trio-LMS (Trio Learn Hub)",
    category: "Full-Stack & Systems",
    description: `🏫 Next-Gen Enterprise Learning Management System! 🎓
Trio-LMS is a full-featured educational platform designed for colleges and academies to manage courses, track student performance, automate evaluations, and facilitate real-time virtual classrooms.

Key Highlights:
	✅ Comprehensive Course Administration – Modular syllabus creation with multimedia support
	✅ Student Analytics Dashboard – Visualized grade distributions, attendance, and progress metrics
	✅ Automated Assessment Engine – Instant grading for quizzes, coding tasks, and written submissions
	✅ Secure Multi-Role Authentication – Tailored permissions for Admins, Teachers, and Students`,
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "PostgreSQL", "Prisma", "Docker"],
    image: "/project-images/trio-lms.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/trio-lms",
    isPinned: true,
    featured: true,
  },
  {
    title: "Eva-AI",
    category: "GenAI & Agents",
    description: `🤖 Autonomous Conversational AI Assistant & Workflow Agent! 🧠
Eva-AI is an intelligent multi-agent assistant equipped with persistent contextual memory, external tool usage, and prompt-reasoning chains to automate complex developer and enterprise workflows.

Key Highlights:
	✅ Advanced Agentic Reasoning – Deconstructs multi-step user prompts into actionable tool executions
	✅ Long-Term Context Retention – Persistent conversational memory using vector embeddings
	✅ High-Speed Streaming API – Real-time token streaming with sub-second response latency
	✅ Extensible Tool Integrations – Supports search APIs, code interpreters, and file analyzers`,
    technologies: ["Python", "Generative AI", "LangChain", "LLMs", "FastAPI", "Vector DB", "ChromaDB"],
    image: "/project-images/eva-ai.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Eva-AI",
    isPinned: true,
    featured: true,
  },
  {
    title: "Mesdaq AI",
    category: "GenAI & Agents",
    description: `🏛️ Enterprise Document Intelligence & Semantic Governance Platform! 💡
Mesdaq AI empowers organizations with automated document intelligence, regulatory compliance auditing, and precise semantic information retrieval across thousands of technical and legal documents.

Key Highlights:
	✅ Precise Citation-Backed Answers – Zero-hallucination semantic retrieval with direct source references
	✅ Automated Document Summarization – Synthesizes executive summaries from dense reports
	✅ Compliance & Risk Flagging – Scans organizational documentation for regulatory adherence
	✅ Modern Glassmorphic Web App – Built with React, TypeScript, and high-security API endpoints`,
    technologies: ["TypeScript", "Python", "Generative AI", "React", "Tailwind CSS", "FastAPI", "Vector Search"],
    image: "/project-images/mesdaq-ai.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Mesdaq_AI",
    isPinned: true,
    featured: true,
  },

  // ==========================================
  // 🤖 GENERATIVE AI, RAG & LLM AGENTS
  // ==========================================
  {
    title: "MR NLP Robust RAG Chatbot",
    category: "GenAI & Agents",
    description: `🤖 Next-Gen Conversations: Context-Aware RAG Chatbot! 🗣️
Standard chatbots hallucinate; RAG (Retrieval-Augmented Generation) chatbots know the facts. This system combines the power of LLMs with a reliable vector knowledge base to provide accurate, context-rich answers.

Key Highlights:
	✅ Implemented RAG Architecture retrieving data from custom vector stores (ChromaDB/FAISS)
	✅ Integrated Large Language Models (LLMs) for natural, human-like reasoning
	✅ Built Semantic Search pipelines for precise information retrieval
	✅ Ensured Robustness against prompt injection and irrelevant queries`,
    technologies: ["Python", "NLP", "RAG", "LLM", "LangChain", "Vector DB", "ChromaDB"],
    image: "/project-images/rag-chatbot.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot",
    featured: true,
  },
  {
    title: "RAG-Powered Knowledge Assistant for Teachers",
    category: "GenAI & Agents",
    description: `🎓 Empowering Educators with Smart AI Assistance! 📚
A specialized Retrieval-Augmented Generation system designed for teachers to generate lesson plans, answer complex pedagogical questions, and search curriculum documents seamlessly.

Key Highlights:
	✅ Built Document Parsing Pipelines for educational textbooks and syllabi
	✅ Fine-Tuned Vector Indexing for instant curriculum retrieval
	✅ Integrated Custom Prompt Templates tailored for classroom and quiz creation
	✅ Streamlined Teacher Workflow, reducing prep time by over 50%`,
    technologies: ["Python", "RAG", "LLMs", "LangChain", "FastAPI", "Vector Search"],
    image: "/project-images/job-recommendation-system.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers",
    featured: true,
  },
  {
    title: "Hermes Agent",
    category: "GenAI & Agents",
    description: `🦅 The Autonomous AI Agent That Grows With You! ⚡
An advanced conversational and task-oriented agent platform capable of continuous learning, tool synthesis, and dynamic execution across coding and research workflows.

Key Highlights:
	✅ Self-improving prompt loops and reflexive task planning
	✅ Multi-tool orchestration for terminal execution, web browsing, and code analysis
	✅ High-concurrency async runtime with memory persistence`,
    technologies: ["Python", "LLMs", "Autonomous Agents", "Tool Calling", "Prompt Engineering"],
    image: "/project-images/hermes-agent.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/hermes-agent",
    liveUrl: "https://hermes-agent.nousresearch.com",
  },
  {
    title: "Mini RAG Engine",
    category: "GenAI & Agents",
    description: `⚡ Minimalist High-Speed Retrieval-Augmented Generation! 🔍
A lean, dependency-light implementation of RAG engineered for rapid semantic document query execution and local embedding processing.

Key Highlights:
	✅ Clean chunking and tokenization algorithms
	✅ Local vector similarity using cosine distance
	✅ Easy integration with OpenAI, Claude, and local open-source LLMs`,
    technologies: ["Python", "RAG", "Sentence Transformers", "Vector Search", "FastAPI"],
    image: "/project-images/mini-rag.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/mini-rag",
  },
  {
    title: "AI Chatbot Neural Engine",
    category: "GenAI & Agents",
    description: `💬 Context-Aware Neural Dialogue System! 🧠
A sequence-based conversational model built to handle conversational context, slot filling, and intent classification with natural conversational fluency.

Key Highlights:
	✅ Deep neural architecture for dialogue state tracking
	✅ Fast inference with optimized token embeddings
	✅ Flexible API ready for web and messaging integration`,
    technologies: ["Python", "Jupyter Notebook", "TensorFlow", "NLP", "NLTK"],
    image: "/project-images/content-moderation.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/chatbot",
  },
  {
    title: "Neuronix Job Recommendation System",
    category: "GenAI & Agents",
    description: `🎯 Finding the Perfect Job Match? Simplify Recruitment with AI! 🚀
This intelligent job recommendation engine leverages NLP and collaborative filtering to connect candidates with their ideal roles—streamlining recruitment.

Key Highlights:
	✅ Implemented NLP Pipelines to process resumes and job descriptions efficiently
	✅ Utilized Collaborative Filtering for personalized job suggestions
	✅ Built Interactive UI with Streamlit & Flask for a seamless experience`,
    technologies: ["Python", "NLP", "Scikit-learn", "Streamlit", "Flask", "SQL"],
    image: "/project-images/job-recommendation-system.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Neuronix-Job-Recommendation",
  },
  {
    title: "AI Agent Skills Catalog",
    category: "GenAI & Agents",
    description: `🛠️ Curated Capabilities & Execution Protocols for AI Agents! 📚
A modular collection of executable skills and structured prompts enabling autonomous LLM agents to perform specialized multi-step technical workflows.

Key Highlights:
	✅ Domain-specific action schemas for web, data analysis, and automation
	✅ Standardized interface for prompt chaining and deterministic tool calling`,
    technologies: ["Python", "LLMs", "Agent Skills", "Automation", "JSON Schema"],
    image: "/project-images/content-moderation.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/skills",
  },
  {
    title: "Jarvis Autonomous Assistant",
    category: "GenAI & Agents",
    description: `🎙️ Intelligent Voice & Workflow Orchestration Assistant! ⚡
Voice-activated intelligent agent handling desktop automation, system telemetry queries, natural speech input, and dynamic task scheduling.

Key Highlights:
	✅ Speech recognition and natural voice synthesis integration
	✅ System-level execution hooks for automated task orchestration`,
    technologies: ["Python", "Speech Recognition", "Automation", "PyAudio", "NLP"],
    image: "/project-images/audio-classification.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/jarvis",
  },

  // ==========================================
  // 🗣️ NLP & SPEECH PROCESSING
  // ==========================================
  {
    title: "Arabic Egyptian Dialect Sentiment Analysis",
    category: "NLP & Speech",
    description: `🌍 Unlocking the Voice of Egypt: Advanced Sentiment Analysis for Dialectal Arabic! 🇪🇬
Text analysis often struggles with regional dialects. This deep learning model detects positive, negative, and neutral sentiments in informal Egyptian Arabic using state-of-the-art NLP techniques.

Key Highlights:
	✅ Trained Deep Learning Models with TensorFlow for dialectal text prediction
	✅ Preprocessed Dialectal Text using specialized Arabic NLP cleaning routines
	✅ Analyzed Social Media Datasets to extract brand perception and market sentiment`,
    technologies: ["Python", "Deep Learning", "NLP", "TensorFlow", "Pandas", "Matplotlib"],
    image: "/project-images/arabic-sentiment.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis",
    featured: true,
  },
  {
    title: "Audio Model Classification & Gender Detection",
    category: "NLP & Speech",
    description: `🎵 Advanced Audio Signal Classification & Vocal Feature Extraction! 🔊
Sound carries crucial data. This project analyzes raw audio signals using deep learning to classify environmental acoustics and detect vocal pitch metrics with high precision.

Key Highlights:
	✅ Extracted Audio Features (MFCCs, Chroma, Mel Spectrograms) using Librosa
	✅ Designed CNN Architectures specifically tuned for audio signal matrix input
	✅ Achieved High Accuracy in sound wave and vocal pattern recognition`,
    technologies: ["Python", "Deep Learning", "CNN", "Librosa", "Audio Processing", "TensorFlow"],
    image: "/project-images/audio-classification.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender",
    featured: true,
  },
  {
    title: "Automated Content Moderation System",
    category: "NLP & Speech",
    description: `🛡️ Creating Safer Online Communities with Automated AI Moderation! 🚫
An NLP-powered content moderation system that automatically detects toxic, harmful, or inappropriate comments to protect digital communities.

Key Highlights:
	✅ Developed Multi-Class Toxicity Classification models
	✅ Integrated Context-Aware NLP Processing to catch subtle nuances
	✅ Built Real-Time Filtering mechanisms for immediate threat mitigation`,
    technologies: ["Python", "NLP", "Text Classification", "AI Safety", "Scikit-Learn"],
    image: "/project-images/content-moderation.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Moderation_System",
  },
  {
    title: "English Twitter Sentiment Analysis",
    category: "NLP & Speech",
    description: `📊 Real-Time Customer Emotion Analysis via Social Media Data! 🧠
Analyzes English social media text to determine sentiment trends using advanced LSTM & BERT models.

Key Highlights:
	✅ Implemented LSTM & BERT models for sentiment classification
	✅ Cleaned text data using NLTK & SpaCy
	✅ Visualized Sentiment Trends with WordClouds & Seaborn`,
    technologies: ["Python", "NLP", "BERT", "LSTM", "TensorFlow", "NLTK", "SpaCy"],
    image: "/project-images/english-sentiment.png",
    images: [
      "/project-images/sentiment/1_pnXdH-2lTcV1clV_9FXqaA.jpg",
      "/project-images/sentiment/newplot (2).png",
      "/project-images/sentiment/newplot (3).png",
      "/project-images/sentiment/newplot (4).png"
    ],
    githubUrl: "https://github.com/IbrahimAbdelsattar/twitter-sentiment-analysis",
  },

  // ==========================================
  // 📊 MACHINE LEARNING & PREDICTIVE ANALYTICS
  // ==========================================
  {
    title: "Employee Attrition & Performance Analytics",
    category: "Machine Learning & Analytics",
    description: `👥 Retention Revolution: Predicting Employee Turnover & Performance! 🚪
Predictive machine learning models helping HR teams identify employees at risk of leaving, enabling proactive retention strategies and performance optimization.

Key Highlights:
	✅ Built Predictive Models using Ensemble methods (Random Forest, XGBoost)
	✅ Identified Key Drivers of attrition (salary, work-life balance, commute)
	✅ Created Actionable HR Analytics Dashboards in Power BI`,
    technologies: ["Python", "Machine Learning", "XGBoost", "Random Forest", "Power BI", "Scikit-Learn"],
    image: "/project-images/employee-attrition.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Employee-Performance-Rating-Prediction",
    featured: true,
  },
  {
    title: "Credit Card Financial Fraud Detection",
    category: "Machine Learning & Analytics",
    description: `💳 Safeguarding Transactions with Highly Accurate Fraud Detection! 🔐
Detects anomalous transactions in heavily imbalanced financial datasets using SMOTE and advanced ensemble classifiers.

Key Highlights:
	✅ Implemented SMOTE for handling severe class imbalance
	✅ Evaluated Models using Precision-Recall AUC to minimize false negatives
	✅ Optimized Real-time Inference latency for rapid transaction scoring`,
    technologies: ["Python", "Machine Learning", "SMOTE", "XGBoost", "Scikit-Learn", "Imbalanced-Learn"],
    image: "/project-images/fraud-detection.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection",
  },
  {
    title: "GTC Financial Fraud Detection Pipeline",
    category: "Machine Learning & Analytics",
    description: `🛡️ Enterprise Banking Fraud Prevention & Anomaly Scoring! 💰
Developed during GTC fellowship, this pipeline audits transaction velocities and anomalous spending patterns to shield financial platforms from cyber-fraud.

Key Highlights:
	✅ Feature engineering on high-dimensional transaction telemetry
	✅ Hyperparameter-tuned XGBoost & LightGBM ensemble models`,
    technologies: ["Python", "Machine Learning", "Fraud Prevention", "Scikit-Learn", "EDA"],
    image: "/project-images/fraud-detection.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/GTC-Fraud-Detection",
  },
  {
    title: "Road & Traffic Accident Severity Prediction",
    category: "Machine Learning & Analytics",
    description: `🚦 AI for Road Safety: Predicting Traffic Accident Severity! 🛣️
Leverages environmental, weather, and road conditions to predict accident severity levels and assist emergency response planning.

Key Highlights:
	✅ Processed Complex Spatial & Environmental Incident Records
	✅ Trained Classification Models (Random Forest, LightGBM)
	✅ Generated Feature Importance maps for urban traffic planners`,
    technologies: ["Python", "Machine Learning", "Scikit-Learn", "LightGBM", "Pandas", "Seaborn"],
    image: "/project-images/road-safety.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Road-Accident-Severity-Prediction",
  },
  {
    title: "Urban Traffic Flow & Incident Modeling",
    category: "Machine Learning & Analytics",
    description: `🚗 Intelligent Urban Mobility & Incident Forecasts! 🗺️
Predicts traffic density fluctuations and collision probabilities across congested metropolitan transit corridors.

Key Highlights:
	✅ Spatio-temporal incident clustering and road segment analysis
	✅ Weather and peak-hour feature correlations for traffic dispatchers`,
    technologies: ["Python", "Spatial Analytics", "Machine Learning", "Pandas", "Matplotlib"],
    image: "/project-images/road-safety.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Traffic_Accident_Prediction",
  },
  {
    title: "Mall Customer Segmentation",
    category: "Machine Learning & Analytics",
    description: `🛍️ Unsupervised Clustering for Retail Customer Insights! 🎯
Groups retail customers into distinct personas based on spending score and annual income using K-Means and Hierarchical Clustering.

Key Highlights:
	✅ Applied K-Means Clustering & Elbow Method for optimal cluster determination
	✅ Visualized 3D Customer Personas for targeted marketing campaigns`,
    technologies: ["Python", "Clustering", "K-Means", "Scikit-Learn", "Matplotlib", "Seaborn"],
    image: "/project-images/mall-customers.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Mall-Customer-Segmentation-",
  },
  {
    title: "Retail Sales & Demographics Analysis",
    category: "Machine Learning & Analytics",
    description: `🏪 Omnichannel Retail Analytics & Purchase Demographics! 📈
Comprehensive exploratory data analysis examining purchase frequency, basket composition, and revenue drivers across disparate consumer segments.

Key Highlights:
	✅ Multi-store sales trend decomposition and seasonal seasonality mapping
	✅ Consumer demographic profiling and basket size optimization`,
    technologies: ["Python", "EDA", "Pandas", "NumPy", "Data Visualization", "Seaborn"],
    image: "/project-images/retail-sales.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Retail_Sales_and_Customer_Demographics_Analysis",
  },
  {
    title: "Customer Churn Analysis & Retention",
    category: "Machine Learning & Analytics",
    description: `📉 Proactive Churn Diagnosis & Customer Lifetime Protection! 🔄
Identifies high-risk churn indicators in subscription customer bases, giving customer success teams early warning signals before accounts cancel.

Key Highlights:
	✅ Evaluated Logistic Regression, Decision Trees, and Gradient Boosting
	✅ Calculated customer lifetime value (CLV) risk impact per cohort`,
    technologies: ["Python", "Machine Learning", "Churn Prediction", "Scikit-Learn", "Pandas"],
    image: "/project-images/customer-churn.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Customer-Churn-Analysis",
  },
  {
    title: "Online Shoppers Purchase Intention",
    category: "Machine Learning & Analytics",
    description: `🛒 Session Behavioral Intelligence for E-Commerce Conversion! 🛍️
Predicts whether an active online visitor will convert into a paying buyer based on real-time web session signals like page duration and exit rates.

Key Highlights:
	✅ Handled high-speed session telemetry and multi-page interaction data
	✅ High-precision classification balancing conversion prediction thresholds`,
    technologies: ["Python", "Machine Learning", "Scikit-Learn", "Pandas", "E-Commerce"],
    image: "/project-images/ecommerce-analytics.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Online-Shoppers-Purchase-Intention-Prediction",
  },
  {
    title: "Bank Term Deposit Subscription Prediction",
    category: "Machine Learning & Analytics",
    description: `🏦 Precision Banking: Direct Marketing Campaign Propensity! 📞
Optimizes banking telemarketing resources by predicting which retail clients are most likely to subscribe to long-term deposit certificates.

Key Highlights:
	✅ Processed macroeconomic indicators, contact duration, and client profiles
	✅ Increased marketing conversion efficiency by prioritizing high-propensity leads`,
    technologies: ["Python", "Machine Learning", "Classification", "Scikit-Learn", "Pandas"],
    image: "/project-images/bank-term-deposit.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Bank-Term-Deposit-Prediction-",
  },
  {
    title: "Student Final Grade Prediction",
    category: "Machine Learning & Analytics",
    description: `📚 Educational Analytics: Early Academic Intervention Systems! 🎓
Forecasts student end-of-year grades using demographic, behavioral, and academic milestone metrics to prevent academic probation.

Key Highlights:
	✅ Regression models predicting numerical grade outcomes with high R² accuracy
	✅ Feature ranking determining study time and attendance as top predictors`,
    technologies: ["Python", "Machine Learning", "Regression", "Scikit-Learn", "Data Science"],
    image: "/project-images/student-grade-prediction.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Student-Final-Grade-Prediction",
  },
  {
    title: "Clinical Diabetes Risk Prediction & EDA",
    category: "Machine Learning & Analytics",
    description: `🩺 Early Health Intervention with Predictive Medical ML! 💉
Predicts diabetes onset risk using clinical health diagnostics including glucose levels, insulin, BMI, age, and blood pressure measurements.

Key Highlights:
	✅ Rigorous exploratory data analysis on medical diagnostic parameters
	✅ Trained Logistic Regression, SVM, and Random Forest Classifiers with high recall`,
    technologies: ["Python", "Machine Learning", "Healthcare Analytics", "Scikit-Learn", "Pandas"],
    image: "/project-images/diabetes-detection.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/diabetes",
  },
  {
    title: "GTC Clinical Diabetes ML Model",
    category: "Machine Learning & Analytics",
    description: `🔬 Medical Machine Learning Diagnostic Assessment! 🏥
Engineered during GTC ML Internship, contrasting parametric and non-parametric classifiers for non-invasive early diagnostic screening.

Key Highlights:
	✅ Cross-validated model evaluation with ROC-AUC optimization
	✅ Clinical metric interpretations with SHAP feature explanations`,
    technologies: ["Python", "Machine Learning", "Medical ML", "SVM", "Random Forest"],
    image: "/project-images/diabetes-detection.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/GTC-ML-Internship-Diabetes-Prediction",
  },
  {
    title: "Heart Attack Risk & Cardiovascular Detection",
    category: "Machine Learning & Analytics",
    description: `❤️ Cardiovascular Health AI: Predicting Acute Myocardial Infarction! 💓
Analyzes chest pain types, resting blood pressure, cholesterol levels, and exercise-induced angina to assess cardiovascular risks.

Key Highlights:
	✅ High sensitivity classifier preventing fatal false negatives
	✅ Clean feature transformation for clinical patient triage`,
    technologies: ["Python", "Machine Learning", "Cardiology AI", "Scikit-Learn", "Seaborn"],
    image: "/project-images/heart-attack-risk.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Heart-Attack-Detection",
  },
  {
    title: "California House Price Prediction (GTC ML)",
    category: "Machine Learning & Analytics",
    description: `🏡 Spatial Real Estate Valuation & District Regression Modeling! 📍
Predicts median housing values across California census blocks using geographical coordinates, median income, and room ratios.

Key Highlights:
	✅ Spatial feature engineering utilizing latitude and longitude clustering
	✅ Gradient boosting regression delivering high predictive precision`,
    technologies: ["Python", "Machine Learning", "Spatial ML", "Gradient Boosting", "Scikit-Learn"],
    image: "/project-images/house-price.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/GTC-ML-Internship-California-House-Price-Prediction",
  },
  {
    title: "Hotel Bookings & Cancellation Intelligence",
    category: "Machine Learning & Analytics",
    description: `🏨 Hospitality Analytics: Forecasting Reservation Cancellations! 🛎️
Analyzes customer lead times, deposit structures, and booking channels to forecast hotel booking cancellations and optimize room revenue.

Key Highlights:
	✅ In-depth exploratory data analysis across city and resort hotels
	✅ Machine learning classification modeling cancellation risk`,
    technologies: ["Python", "Machine Learning", "Business Intelligence", "Scikit-Learn", "Pandas"],
    image: "/project-images/hotel-analytics.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/gtc-ml-project1-hotel-bookings",
  },
  {
    title: "Calorie Expenditure Prediction",
    category: "Machine Learning & Analytics",
    description: `🏃 Physical Physiology: Estimating Real-Time Caloric Burn! 🔥
Calculates calories burned during physical exertion using workout duration, heart rate telemetry, body temperature, and athlete biometric markers.

Key Highlights:
	✅ Linear & non-linear regression models evaluating energy burn rates
	✅ Rapid inference suitable for wearable fitness tracker integration`,
    technologies: ["Python", "Regression", "Health Tech", "Scikit-Learn", "Pandas"],
    image: "/project-images/calories-burnt.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Predict-Calorie-Expenditure",
  },
  {
    title: "DEPI Data Science Capstone Projects",
    category: "Machine Learning & Analytics",
    description: `🇪🇬 National AI Fellowship: Comprehensive DEPI Projects Portfolio! 🏆
Collection of advanced data science solutions developed during Egypt's prestigious Digital Egypt Pioneers Initiative (DEPI) by MCIT.

Key Highlights:
	✅ Production-grade data pipelines, feature engineering, and model validation
	✅ Diverse implementations spanning predictive ML, NLP, and computer vision`,
    technologies: ["Python", "Data Science", "Machine Learning", "Deep Learning", "DEPI"],
    image: "/project-images/retail-sales.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Data-Science-Projects-.DEPI",
  },
  {
    title: "DEPI Data Science Labs & Core Assignments",
    category: "Machine Learning & Analytics",
    description: `🔬 Advanced Statistical Modeling & Algorithmic Foundation Labs! 🧪
Rigorous technical assignments demonstrating mastery in probability distributions, hypothesis testing, matrix operations, and classical ML algorithms.

Key Highlights:
	✅ Mathematical derivations of cost functions and gradient descent algorithms
	✅ Comprehensive data wrangling across complex messy datasets`,
    technologies: ["Python", "Jupyter Notebook", "Statistics", "Data Wrangling", "Pandas"],
    image: "/project-images/student-grade.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Data-Science-Assignments.DEPI",
  },
  {
    title: "Elevvo Machine Learning Engineering Portfolio",
    category: "Machine Learning & Analytics",
    description: `🚀 Professional Machine Learning Internship Artifacts! 💻
Enterprise machine learning models and data preprocessing pipelines engineered during the Elevvo ML internship program.

Key Highlights:
	✅ Standardized scikit-learn custom transformers and model pipelines
	✅ Rigorous metric evaluation using stratified k-fold validation`,
    technologies: ["Python", "Machine Learning", "Pipeline Design", "Scikit-Learn"],
    image: "/project-images/employee-attrition.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Elevvo-ML-Internship",
  },

  // ==========================================
  // 🌐 FULL-STACK, SYSTEMS & INTERACTIVE TOOLS
  // ==========================================
  {
    title: "Profile README Generator",
    category: "Full-Stack & Systems",
    description: `🎨 Interactive GitHub Profile README Builder! 🚀
A modern web tool allowing developers to design personalized, visually stunning GitHub profile READMEs in minutes with live markdown preview.

Key Highlights:
	✅ Rich Interactive Form UI built with TypeScript & React
	✅ Markdown Generator with live preview rendering
	✅ Custom Badges, Shields, and Theme customization options`,
    technologies: ["TypeScript", "React", "Tailwind CSS", "Vite", "Markdown Parser"],
    image: "/project-images/readme-builder.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/profile-readme-generator",
    liveUrl: "https://profile-readme-generator.com",
    featured: true,
  },
  {
    title: "Profile README Templates Suite",
    category: "Full-Stack & Systems",
    description: `✨ Curated Collection of High-Impact Developer Portfolios! 📄
Ready-to-use markdown templates and visual components for showcasing projects, technical skills, and GitHub statistics in profile READMEs.

Key Highlights:
	✅ Dynamic SVG stat cards and visitor badges
	✅ Clean responsive markdown layouts for developers of all seniority levels`,
    technologies: ["Markdown", "GitHub Actions", "SVG", "Developer Tools"],
    image: "/project-images/readme-builder.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Profile-README-Templates",
  },
  {
    title: "Numerix (Numerical Computing Platform)",
    category: "Full-Stack & Systems",
    description: `🧮 Interactive Numerical Computing & Educational Suite! 🔢
An interactive platform solving complex numerical methods, linear algebra equations, and mathematical visualizer models.

Key Highlights:
	✅ Implemented numerical analysis algorithms (Newton-Raphson, Gauss-Elimination, Runge-Kutta)
	✅ Interactive graph visualization for mathematical functions in real time`,
    technologies: ["TypeScript", "Python", "React", "Chart.js", "Math.js"],
    image: "/project-images/numerix-platform.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Numerix",
  },
  {
    title: "Flight Reservation Desktop App",
    category: "Full-Stack & Systems",
    description: `✈️ Comprehensive Airline Ticketing & Passenger Booking GUI! 🛫
Desktop management application designed for airport ticketing offices, supporting flight searches, seating seatmaps, and database record keeping.

Key Highlights:
	✅ Clean desktop user interface built with Python GUI frameworks
	✅ Relational SQLite database managing flights, passengers, and booking records`,
    technologies: ["Python", "Tkinter", "SQLite", "GUI Architecture", "Database Design"],
    image: "/project-images/flight-reservation.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Flight-Reservation-Desktop-App",
  },
  {
    title: "SearXNG Custom Metasearch Engine",
    category: "Full-Stack & Systems",
    description: `🔎 Zero-Tracking Privacy-Centric Search Engine Deployment! 🛡️
A customized deployment of SearXNG aggregating results across 70+ search services without logging user queries, cookies, or profiling identities.

Key Highlights:
	✅ Multi-engine asynchronous scraping and result deduplication
	✅ Containerized production stack with Docker and Redis caching`,
    technologies: ["Python", "SearXNG", "Docker", "Redis", "Search Infrastructure"],
    image: "/project-images/searxng-metasearch.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/searxng",
    liveUrl: "https://docs.searxng.org",
  },
  {
    title: "Soliman Group Enterprise Platform",
    category: "Full-Stack & Systems",
    description: `🏢 Corporate Business Operations & Client Portal! 🌐
A modern, responsive digital corporate portal built for business inquiries, service showcasing, and enterprise client communications.

Key Highlights:
	✅ Ultra-fast Next.js architecture with server-side rendering
	✅ Interactive inquiry forms and modern corporate brand presence`,
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vercel"],
    image: "/project-images/hotel-analytics.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/soliman-group",
  },
  {
    title: "C-SAT Customer Satisfaction System",
    category: "Full-Stack & Systems",
    description: `⭐ Real-Time Customer Feedback & NPS Analytics Dashboard! 📊
Interactive customer survey and satisfaction tracking application allowing businesses to collect, analyze, and visualize customer sentiment in real time.

Key Highlights:
	✅ Dynamic questionnaire generation with instant response logging
	✅ Visual Net Promoter Score (NPS) and satisfaction rating charts`,
    technologies: ["TypeScript", "React", "Tailwind CSS", "Recharts", "Vite"],
    image: "/project-images/employee-attrition.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/c-sat",
  },
  {
    title: "Alien AI Venture Web Experience",
    category: "Full-Stack & Systems",
    description: `🛸 Futuristic Interactive AI Venture Landing Platform! 🌌
An avant-garde web experience combining 3D interactive graphics, fluid motion animations, and dark cyberpunk aesthetics to showcase next-gen AI products.

Key Highlights:
	✅ Three.js particle systems and responsive 3D scene rendering
	✅ Fluid micro-interactions powered by Framer Motion`,
    technologies: ["TypeScript", "React", "Three.js", "Framer Motion", "Tailwind CSS"],
    image: "/project-images/alien-ai-venture.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/alien-ai-venture-main",
  },
  {
    title: "BodyIQ Health & Fitness Platform",
    category: "Full-Stack & Systems",
    description: `💪 Body Composition & Health Analytics Web Application! 🥗
Health tracking platform providing interactive BMI, body fat, caloric need calculators, and customized workout recommendation metrics.

Key Highlights:
	✅ Precision metabolic calculation formulas and nutritional breakdown
	✅ Responsive interface with interactive data visualization charts`,
    technologies: ["JavaScript", "HTML5", "CSS3", "Chart.js", "Responsive Design"],
    image: "/project-images/calories-burnt.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/bodyiq-mti-main",
  },
];
