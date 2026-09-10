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
}

export const projects: Project[] = [
  {
    title: "SupplyMind AI",
    category: "GenAI & Agents",
    description: `🚚 Intelligent Supply Chain & Logistics Management Powered by AI! 📦
SupplyMind AI combines predictive machine learning and generative AI to optimize inventory levels, forecast demand fluctuations, and automate supply chain decision-making.

Project Highlights:
	✅ Developed Predictive Demand Forecasting models to reduce inventory holding costs
	✅ Integrated LLM Agents for automated supply chain anomaly detection and reporting
	✅ Visualized Real-time Logistics Dashboards for operational transparency
	✅ Built Automated Risk Alerts for vendor performance and shipment delays

Why This Matters:
	✅ Minimize Waste – Optimize inventory turnover and avoid overstocking
	✅ Real-Time Visibility – Track supply chain metrics with instant AI insights
	✅ Data-Driven Procurement – Make strategic purchasing decisions automatically`,
    technologies: ["Python", "Generative AI", "Predictive Analytics", "Pandas", "Scikit-Learn", "Streamlit", "Docker"],
    image: "/project-images/rag-chatbot.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/SupplyMindAI",
    featured: true,
  },
  {
    title: "MR NLP Robust RAG Chatbot",
    category: "GenAI & Agents",
    description: `🤖 Next-Gen Conversations: Context-Aware RAG Chatbot! 🗣️
Standard chatbots hallucinate; RAG (Retrieval-Augmented Generation) chatbots know the facts. This system combines the power of LLMs with a reliable vector knowledge base to provide accurate, context-rich answers.

Project Highlights:
	✅ Implemented RAG Architecture retrieving data from custom vector stores (ChromaDB/FAISS)
	✅ Integrated Large Language Models (LLMs) for natural, human-like reasoning
	✅ Built Semantic Search pipelines for precise information retrieval
	✅ Ensured Robustness against prompt injection and irrelevant queries
	✅ Designed for Specific Domains (medical, legal, technical support)

Why This Matters:
	✅ Trustworthy AI – Answers are strictly grounded in actual documents
	✅ 24/7 Knowledge Access – Unlock information trapped inside enterprise PDFs and docs
	✅ Scalable Intelligence – Handles thousands of concurrent queries effortlessly`,
    technologies: ["Python", "NLP", "RAG", "LLM", "LangChain", "Vector DB", "Deep Learning"],
    image: "/project-images/rag-chatbot.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot",
    featured: true,
  },
  {
    title: "RAG-Powered Knowledge Assistant for Teachers",
    category: "GenAI & Agents",
    description: `🎓 Empowering Educators with Smart AI Assistance! 📚
A specialized Retrieval-Augmented Generation system designed for teachers to generate lesson plans, answer complex pedagogical questions, and search curriculum documents seamlessly.

Project Highlights:
	✅ Built Document Parsing Pipelines for educational textbooks and syllabi
	✅ Fine-Tuned Vector Indexing for instant curriculum retrieval
	✅ Integrated Custom Prompt Templates tailored for classroom and quiz creation
	✅ Streamlined Teacher Workflow, reducing prep time by over 50%

Why This Matters:
	✅ Saves Teacher Time – Automate administrative and planning overhead
	✅ Accurate Curriculum Insights – Grounded responses matching approved standards`,
    technologies: ["Python", "RAG", "LLMs", "LangChain", "FastAPI", "Vector Search"],
    image: "/project-images/job-recommendation-system.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers",
    featured: true,
  },
  {
    title: "Mesdaq AI",
    category: "GenAI & Agents",
    description: `🏛️ AI-Powered Knowledge & Governance Assistant! 💡
Mesdaq AI is an intelligent platform designed for high-accuracy document intelligence, semantic searching, and automated workflow assistance in professional domains.

Project Highlights:
	✅ High-precision semantic text retrieval and document indexing
	✅ Custom AI agent logic for automated text summaries and insights
	✅ Built with modern full-stack web technologies for seamless user experience`,
    technologies: ["TypeScript", "Python", "Generative AI", "React", "Tailwind CSS"],
    image: "/project-images/content-moderation.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Mesdaq_AI",
    featured: true,
  },
  {
    title: "AI-Based Job Recommendation System",
    category: "GenAI & Agents",
    description: `🎯 Finding the Perfect Job Match? Simplify Recruitment with AI! 🚀
This intelligent job recommendation engine leverages NLP and collaborative filtering to connect candidates with their ideal roles—streamlining recruitment.

Project Highlights:
	✅ Implemented NLP Pipelines to process resumes and job descriptions efficiently
	✅ Utilized Collaborative Filtering for personalized job suggestions
	✅ Built Interactive UI with Streamlit & Flask for a seamless experience
	✅ Optimized Matching Algorithms using Scikit-learn for high accuracy

Why This Matters:
	✅ Reduce Hiring Time – Automate resume screening significantly
	✅ Improve Candidate Quality – Data-driven matching ensures high compatibility`,
    technologies: ["Python", "NLP", "Scikit-learn", "Streamlit", "Flask", "SQL", "Git"],
    image: "/project-images/job-recommendation-system.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Neuronix-Job-Recommendation",
    featured: true,
  },
  {
    title: "Arabic Egyptian Dialect Sentiment Analysis",
    category: "NLP & Speech",
    description: `🌍 Unlocking the Voice of Egypt: Advanced Sentiment Analysis for Dialectal Arabic! 🇪🇬
Text analysis often struggles with regional dialects. This deep learning model detects positive, negative, and neutral sentiments in informal Egyptian Arabic using state-of-the-art NLP techniques.

Project Highlights:
	✅ Trained Deep Learning Models with TensorFlow for dialectal text prediction
	✅ Preprocessed Dialectal Text using specialized Arabic NLP cleaning routines
	✅ Analyzed Social Media Datasets to extract brand perception and market sentiment
	✅ Optimized Performance for local slang and cultural context

Why This Matters:
	✅ Understand Local Markets – Gain true insights into Egyptian consumer sentiment
	✅ Monitor Brand Reputation – Real-time tracking of public opinion in dialect`,
    technologies: ["Python", "Deep Learning", "NLP", "TensorFlow", "Pandas", "Matplotlib", "Seaborn"],
    image: "/project-images/arabic-sentiment.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis",
    featured: true,
  },
  {
    title: "Audio Model Classification & Gender Detection",
    category: "NLP & Speech",
    description: `🎵 Advanced Audio Signal Classification & Feature Extraction! 🔊
Sound carries crucial data. This project analyzes audio signals using deep learning to classify environmental sound and detect vocal metrics with high precision.

Project Highlights:
	✅ Extracted Audio Features (MFCCs, Chroma, Mel Spectrograms) using Librosa
	✅ Designed CNN Architectures specifically tuned for audio signal matrix input
	✅ Achieved High Accuracy in sound wave and vocal pitch pattern recognition
	✅ Visualized Spectral Data for acoustic waveform analysis`,
    technologies: ["Python", "Deep Learning", "CNN", "Librosa", "Audio Processing", "TensorFlow"],
    image: "/project-images/audio-classification.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender",
    featured: true,
  },
  {
    title: "Content Moderation System",
    category: "NLP & Speech",
    description: `🛡️ Creating Safer Online Communities with Automated AI Moderation! 🚫
An NLP-powered content moderation system that automatically detects toxic, harmful, or inappropriate comments to protect digital communities.

Project Highlights:
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
    description: `📊 Real-Time Customer Emotion Analysis via Twitter Data! 🧠
Analyzes English social media text to determine sentiment trends using advanced LSTM & BERT models.

Project Highlights:
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
  {
    title: "Employee Attrition & Performance Analytics",
    category: "Machine Learning & Analytics",
    description: `👥 Retention Revolution: Predicting Employee Turnover & Performance! 🚪
Predictive machine learning models helping HR teams identify employees at risk of leaving, enabling proactive retention strategies and performance optimization.

Project Highlights:
	✅ Built Predictive Models using Ensemble methods (Random Forest, XGBoost)
	✅ Identified Key Drivers of attrition (salary, work-life balance, commute)
	✅ Created Actionable HR Analytics Dashboards in Power BI`,
    technologies: ["Python", "Machine Learning", "XGBoost", "Random Forest", "Power BI", "Scikit-Learn"],
    image: "/project-images/employee-attrition.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Employee-Performance-Rating-Prediction",
    featured: true,
  },
  {
    title: "Road & Traffic Accident Severity Prediction",
    category: "Machine Learning & Analytics",
    description: `🚦 AI for Road Safety: Predicting Traffic Accident Severity! 🛣️
Leverages environmental, weather, and road conditions to predict accident severity levels and assist emergency response planning.

Project Highlights:
	✅ Processed Complex Spatial & Environmental Incident Records
	✅ Trained Classification Models (Random Forest, LightGBM)
	✅ Generated Feature Importance maps for urban traffic planners`,
    technologies: ["Python", "Machine Learning", "Scikit-Learn", "LightGBM", "Pandas", "Seaborn"],
    image: "/project-images/road-accident.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Road-Accident-Severity-Prediction",
  },
  {
    title: "Credit Card & Financial Fraud Detection",
    category: "Machine Learning & Analytics",
    description: `💳 Safeguarding Transactions with Highly Accurate Fraud Detection! 🔐
Detects anomalous transactions in heavily imbalanced financial datasets using SMOTE and advanced ensemble classifiers.

Project Highlights:
	✅ Implemented SMOTE for handling severe class imbalance
	✅ Evaluated Models using Precision-Recall AUC to minimize false negatives
	✅ Optimized Real-time Inference latency for rapid transaction scoring`,
    technologies: ["Python", "Machine Learning", "SMOTE", "XGBoost", "Scikit-Learn", "Imbalanced-Learn"],
    image: "/project-images/credit-card-fraud.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection",
  },
  {
    title: "Mall Customer Segmentation",
    category: "Machine Learning & Analytics",
    description: `🛍️ Unsupervised Clustering for Retail Customer Insights! 🎯
Groups retail customers into distinct personas based on spending score and annual income using K-Means and Hierarchical Clustering.

Project Highlights:
	✅ Applied K-Means Clustering & Elbow Method for optimal cluster determination
	✅ Visualized 3D Customer Personas for targeted marketing campaigns`,
    technologies: ["Python", "Clustering", "K-Means", "Scikit-Learn", "Matplotlib", "Seaborn"],
    image: "/project-images/mall-segmentation.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Mall-Customer-Segmentation-",
  },
  {
    title: "Diabetes Risk Prediction & EDA",
    category: "Machine Learning & Analytics",
    description: `🩺 Early Health Intervention with Predictive ML! 💉
Predicts diabetes risk using medical indicators such as glucose level, BMI, age, and blood pressure.

Project Highlights:
	✅ Extensive Exploratory Data Analysis (EDA) on clinical health datasets
	✅ Trained Logistic Regression, SVM, and Random Forest Classifiers
	✅ Achieved high sensitivity to ensure early risk warnings`,
    technologies: ["Python", "Machine Learning", "EDA", "Scikit-Learn", "Seaborn", "Pandas"],
    image: "/project-images/diabetes-detection.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/diabetes",
  },
  {
    title: "Profile README Generator",
    category: "Full-Stack & Systems",
    description: `🎨 Interactive GitHub Profile README Builder! 🚀
A modern web tool allowing developers to design personalized, visually stunning GitHub profile READMEs in minutes.

Project Highlights:
	✅ Rich Interactive Form UI built with TypeScript & React
	✅ Markdown Generator with live preview rendering
	✅ Custom Badges, Shields, and Theme customization options`,
    technologies: ["TypeScript", "React", "Tailwind CSS", "Vite", "Markdown Parser"],
    image: "/project-images/content-moderation.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/profile-readme-generator",
    featured: true,
  },
  {
    title: "Dawrly Platform",
    category: "Full-Stack & Systems",
    description: `🔍 Smart Service & Discovery Engine Platform! ⚡
A full-stack application built for local discovery, intelligent search, and service interaction.

Project Highlights:
	✅ Modern modular architecture with backend API integration
	✅ Designed for scalability and rapid database search queries`,
    technologies: ["Python", "TypeScript", "Docker", "PostgreSQL", "REST API"],
    image: "/project-images/job-recommendation-system.jpg",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Dawrly",
  },
  {
    title: "Trio LMS & Learn Hub",
    category: "Full-Stack & Systems",
    description: `🏫 Next-Gen Learning Management System! 🎓
A feature-packed LMS platform designed for structured course management, student progress tracking, and interactive quizzes.

Project Highlights:
	✅ Clean user dashboard for students and instructors
	✅ Progress tracking analytics and automated grading tools`,
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS", "PostgreSQL"],
    image: "/project-images/student-grade.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/trio-lms",
  },
  {
    title: "Numerix AI & Math Platform",
    category: "Full-Stack & Systems",
    description: `🧮 Interactive Numerical Computing & Educational Suite! 🔢
An interactive platform solving complex numerical methods, linear algebra equations, and mathematical visualizer models.

Project Highlights:
	✅ Implemented numerical analysis algorithms (Newton-Raphson, Gauss-Elimination)
	✅ Interactive graph visualization for mathematical functions`,
    technologies: ["TypeScript", "Python", "React", "Chart.js", "Math.js"],
    image: "/project-images/flight-reservation.png",
    githubUrl: "https://github.com/IbrahimAbdelsattar/Numerix",
  }
];
