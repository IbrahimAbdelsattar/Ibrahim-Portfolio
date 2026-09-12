// Complete authoritative knowledge base about Ibrahim Abdelsattar
export interface IbrahimProfile {
  name: string;
  fullName: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  kaggle: string;
  portfolio: string;
  education: {
    institution: string;
    degree: string;
    gpa: string;
    period: string;
    details: string;
  };
  experiences: {
    role: string;
    company: string;
    period: string;
    location: string;
    summary: string;
    achievements: string[];
  }[];
  featuredProjects: {
    title: string;
    category: string;
    description: string;
    githubUrl: string;
    technologies: string[];
    highlights: string[];
  }[];
  skills: {
    languages: string[];
    genAiAndNlp: string[];
    machineLearning: string[];
    dataAndOps: string[];
  };
  certifications: {
    title: string;
    issuer: string;
  }[];
}

export const ibrahimData: IbrahimProfile = {
  name: "Ibrahim Abdelsattar",
  fullName: "Ibrahim Abdelsattar Abdelsattar",
  title: "Data Scientist & AI Specialist",
  subtitle: "Specializing in Generative AI, RAG Systems, Dialectal Arabic NLP, Audio AI, and Production MLOps",
  location: "Cairo, Egypt",
  email: "ibrahimabdelsattar042@gmail.com",
  github: "https://github.com/IbrahimAbdelsattar",
  linkedin: "https://www.linkedin.com/in/ibrahim-abdelsattar/",
  kaggle: "https://www.kaggle.com/ibrahimabdelsattar10",
  portfolio: "https://sites.google.com/view/ibrahimabdelsattar",
  education: {
    institution: "MTI University (Modern University for Technology and Information)",
    degree: "Bachelor of Computer Science & Artificial Intelligence",
    gpa: "3.5 / 4.0",
    period: "Oct 2023 - Expected 2027",
    details: "Specialized in Artificial Intelligence, Deep Learning, Algorithms, and Data Engineering."
  },
  experiences: [
    {
      role: "Machine Learning Instructor",
      company: "Minders",
      period: "Nov 2025 - Present",
      location: "Cairo, Egypt",
      summary: "Instructing emerging developers and university students in advanced AI, Machine Learning, and Deep Learning.",
      achievements: [
        "Delivering comprehensive curricula on Neural Networks, CNNs, RNNs, and Transformers.",
        "Mentoring students on real-world model deployment, hyperparameter optimization, and cloud serving.",
        "Conducting practical code labs in Python, PyTorch, Scikit-Learn, and FastAPI."
      ]
    },
    {
      role: "AI Engineer Intern",
      company: "HAMS.AI",
      period: "Sep 2025 - Nov 2025",
      location: "Cairo, Egypt",
      summary: "Trained, fine-tuned, and deployed production machine learning and deep learning models for high-scale enterprise applications.",
      achievements: [
        "Architected and optimized data preprocessing pipelines for high-throughput model inference.",
        "Implemented model monitoring and automated retraining triggers to combat data drift.",
        "Containerized AI pipelines with Docker, reducing deployment cycle times."
      ]
    },
    {
      role: "AI Engineer Trainee",
      company: "Digital Egypt Pioneers Initiative (DEPI) - MCIT",
      period: "Nov 2024 - May 2025",
      location: "Cairo, Egypt",
      summary: "Completed rigorous national specialization in Artificial Intelligence, Machine Learning, and Big Data Engineering.",
      achievements: [
        "Developed end-to-end predictive models with integrated MLOps pipelines and Docker.",
        "Built interactive analytics dashboards with Streamlit and Power BI for stakeholder reporting.",
        "Mastered state-of-the-art architectures in NLP, Computer Vision, and Predictive Analytics."
      ]
    },
    {
      role: "Freelance Data Scientist & AI Consultant",
      company: "Self-Employed",
      period: "Jun 2024 - Present",
      location: "Remote / Worldwide",
      summary: "Delivering bespoke Generative AI systems, RAG document search engines, dialectal NLP, and predictive ML models for international clients.",
      achievements: [
        "Built enterprise multi-document RAG chatbots using LangChain, ChromaDB, and FAISS.",
        "Developed Arabic NLP models specifically adapted to informal Egyptian dialect sentiment.",
        "Containerized and deployed scalable APIs on VPS/Cloud infrastructure using Dokploy and Docker."
      ]
    },
    {
      role: "AI Instructor",
      company: "4Mind",
      period: "Feb 2025 - Jul 2025",
      location: "Cairo, Egypt",
      summary: "Taught core computer science algorithms and machine learning fundamentals."
    }
  ],
  featuredProjects: [
    {
      title: "SupplyMind AI",
      category: "GenAI & Agents",
      description: "Intelligent supply chain & logistics intelligence combining predictive demand forecasting and Generative AI agents to minimize inventory waste and automate procurement.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/SupplyMindAI",
      technologies: ["Python", "Generative AI", "Predictive Analytics", "Scikit-Learn", "Streamlit", "Docker"],
      highlights: [
        "Predictive Demand Forecasting reduces inventory holding costs by up to 25%",
        "LLM Agents for autonomous supply chain anomaly detection and reporting",
        "Interactive real-time logistics analytics dashboard built with Streamlit"
      ]
    },
    {
      title: "MR-NLP Robust RAG Chatbot",
      category: "GenAI & Agents",
      description: "Context-aware enterprise RAG chatbot connecting vector stores and knowledge graphs with LLMs for accurate, hallucination-free document Q&A.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot",
      technologies: ["Python", "RAG", "LangChain", "Vector DB (FAISS/Chroma)", "Hugging Face LLMs", "Knowledge Graphs"],
      highlights: [
        "Indexed 3 NLP textbooks (vector index) + 1 textbook (knowledge graph) across 2,000+ chunks",
        "Achieved 90%+ response relevance with rigorous prompt-injection defense",
        "4 interactive modules: chat, automated quiz, progress tracking, and voice input"
      ]
    },
    {
      title: "Arabic Egyptian Dialect Sentiment Analysis",
      category: "NLP & Speech",
      description: "Deep learning classification model specialized in understanding informal Egyptian Arabic slang, colloquial expressions, and social media text.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis",
      technologies: ["Python", "Deep Learning", "TensorFlow", "NLP", "Pandas", "Seaborn"],
      highlights: [
        "Custom morphological tokenization and normalization for Egyptian Arabic",
        "Accurately detects positive, negative, and neutral sentiment in dialectal text",
        "Trained and evaluated on extensive social media brand opinion datasets"
      ]
    },
    {
      title: "RAG-Powered Knowledge Assistant for Teachers",
      category: "GenAI & Education",
      description: "Curriculum intelligence and automated lesson planner for educators, searching textbook corpuses to generate lesson guides and quizzes.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers",
      technologies: ["Python", "RAG", "LLMs", "LangChain", "FastAPI", "Vector Search"],
      highlights: [
        "Cuts teacher preparation time by over 50%",
        "Grounded generation ensures responses strictly align with approved curriculum textbooks",
        "FastAPI backend serving real-time semantic query results"
      ]
    },
    {
      title: "Audio Model Classification & Gender Detection",
      category: "Audio AI & Deep Learning",
      description: "Acoustic signal classification analyzing audio waves and Mel-spectrograms using 2D Convolutional Neural Networks.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender",
      technologies: ["Python", "Librosa", "CNN", "Deep Learning", "TensorFlow"],
      highlights: [
        "Feature extraction utilizing MFCCs, Chroma, and Mel-spectrograms",
        "CNN architecture tuned for 2D acoustic matrix inputs",
        "High precision on voice gender identification and audio event tagging"
      ]
    },
    {
      title: "Mesdaq AI",
      category: "GenAI & Governance",
      description: "Document governance assistant providing semantic search, automated summaries, and verification over legal and technical documents.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/Mesdaq_AI",
      technologies: ["TypeScript", "Python", "Generative AI", "React", "Tailwind CSS"],
      highlights: [
        "High-accuracy semantic search and instant document synthesis",
        "Modern glassmorphic interface with full-stack TypeScript integration"
      ]
    },
    {
      title: "Content Moderation System",
      category: "NLP & AI Safety",
      description: "Automated multi-class toxicity detector designed to identify abusive, toxic, or threatening comments in online communities.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/Moderation_System",
      technologies: ["Python", "NLP", "Text Classification", "Scikit-Learn", "AI Safety"],
      highlights: [
        "Multi-label classification of toxic content in real time",
        "Tuned to catch subtle offensive nuances and obfuscated words"
      ]
    },
    {
      title: "Credit Card & Financial Fraud Detection",
      category: "Machine Learning & Analytics",
      description: "Real-time financial anomaly detector built on heavily imbalanced transactions using SMOTE and ensemble classifiers.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection",
      technologies: ["Python", "Machine Learning", "SMOTE", "XGBoost", "Scikit-Learn", "Imbalanced-Learn"],
      highlights: [
        "Overcomes severe 0.17% class imbalance using SMOTE oversampling",
        "Optimized for Precision-Recall AUC to eliminate costly false negatives"
      ]
    },
    {
      title: "Employee Attrition & Performance Rating Prediction",
      category: "Machine Learning & Analytics",
      description: "Predictive HR analytics platform forecasting employee turnover and identifying key retention drivers.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/Employee-Performance-Rating-Prediction",
      technologies: ["Python", "Machine Learning", "XGBoost", "Random Forest", "Power BI"],
      highlights: [
        "Ensemble ML identifying top turnover signals (compensation, overtime, commute)",
        "Interactive Power BI dashboard for organizational talent insights"
      ]
    },
    {
      title: "Profile README Generator",
      category: "Full-Stack & Tools",
      description: "Web application empowering developers to design customized, visually engaging GitHub profile READMEs.",
      githubUrl: "https://github.com/IbrahimAbdelsattar/profile-readme-generator",
      technologies: ["TypeScript", "React", "Tailwind CSS"],
      highlights: [
        "Real-time live markdown preview with badge customizers",
        "Popular open-source tool for personal developer branding"
      ]
    }
  ],
  skills: {
    languages: ["Python (Expert)", "SQL", "TypeScript", "JavaScript", "C++", "Java", "R"],
    genAiAndNlp: [
      "Generative AI", "RAG Systems", "Large Language Models (LLMs)", "LangChain", 
      "Vector DBs (FAISS, ChromaDB)", "Hugging Face Transformers", "BERT", 
      "Prompt Engineering", "Librosa Audio AI", "Knowledge Graphs"
    ],
    machineLearning: [
      "Deep Learning", "Machine Learning", "PyTorch", "TensorFlow", "Scikit-Learn", 
      "XGBoost", "LightGBM", "Computer Vision", "OpenCV", "SMOTE (Imbalanced Data)", 
      "Clustering (K-Means)", "Time Series Forecasting"
    ],
    dataAndOps: [
      "Pandas", "NumPy", "Power BI", "Docker", "Dokploy", "FastAPI", "Flask", 
      "Streamlit", "Git & GitHub", "PostgreSQL", "Linux / VPS Deployment", "MLOps"
    ]
  },
  certifications: [
    { title: "HCIA-AI", issuer: "Huawei ICT Academy" },
    { title: "AI & Data Science Specialist", issuer: "Digital Egypt Pioneers Initiative (DEPI) - MCIT" },
    { title: "Natural Language Processing (NLP)", issuer: "ITIDA & NTI" },
    { title: "Machine Learning Engineer", issuer: "Elevoo Labs" },
    { title: "Machine Learning & Deep Learning", issuer: "IBM SkillsBuild" },
    { title: "NLP & Computer Vision", issuer: "IBM SkillsBuild" },
    { title: "Artificial Intelligence Fundamentals", issuer: "IBM" },
    { title: "AI Career Essentials", issuer: "ALX" },
    { title: "AI & Machine Learning Foundations", issuer: "Sprints" },
    { title: "Python Programming", issuer: "Sprints" },
    { title: "Artificial Intelligence", issuer: "IEEE - Benha" },
    { title: "Quantum Machine Learning", issuer: "Shabab Mobtakeron" },
    { title: "Developing AI in Egypt", issuer: "Ministry of Communications and Information Technology (MCIT)" },
    { title: "Business English", issuer: "OTO Courses & DEPI" }
  ]
};

// Comprehensive System Prompt for LLMs (OmniRoute / OpenAI / FastAPI)
export const IBRAHIM_SYSTEM_PROMPT = `You are Ibrahim Abdelsattar's AI Persona and Official Portfolio Assistant.
You represent Ibrahim Abdelsattar—a passionate Data Scientist & AI Specialist based in Cairo, Egypt.
Your purpose is to answer questions from recruiters, clients, engineers, and visitors accurately, warmly, professionally, and engagingly.

### Identity & Core Profile
- Full Name: Ibrahim Abdelsattar
- Title: Data Scientist & AI Specialist
- Location: Cairo, Egypt
- Education: MTI University (Bachelor of Computer Science & Artificial Intelligence, Oct 2023 - Expected 2027, Cumulative GPA: 3.5 / 4.0)
- Email: ibrahimabdelsattar042@gmail.com
- LinkedIn: https://www.linkedin.com/in/ibrahim-abdelsattar/
- GitHub: https://github.com/IbrahimAbdelsattar
- Kaggle: https://www.kaggle.com/ibrahimabdelsattar10
- Availability: Open to full-time AI/Data Science roles, freelance contracts, and collaborative AI projects worldwide (remote or on-site).

### Professional Work Experience
1. **Machine Learning Instructor at Minders** (Nov 2025 - Present, Cairo, Egypt):
   - Teaches Machine Learning, Deep Learning, and Neural Networks to university students and developers.
   - Mentors hands-on projects covering data preprocessing, model tuning, evaluation metrics, and API serving.
2. **AI Engineer Intern at HAMS.AI** (Sep 2025 - Nov 2025, Cairo, Egypt):
   - Designed, trained, and fine-tuned ML and DL models with optimized dataset preprocessing for production scalability.
   - Built model monitoring and automated retraining pipelines to combat data drift.
3. **AI Engineer Trainee at Digital Egypt Pioneers Initiative (DEPI)** (Nov 2024 - May 2025, Cairo, Egypt):
   - Intensive national initiative in advanced AI, Data Science, and Machine Learning.
   - Built end-to-end ML solutions using Python, SQL, interactive dashboards, and Docker MLOps.
4. **Freelance Data Scientist & AI Consultant** (Jun 2024 - Present):
   - Architected custom Generative AI, RAG chatbots, dialectal Egyptian Arabic sentiment analysis engines, and predictive ML models.
   - Deployed models to cloud/VPS infrastructure using Dokploy and Docker.
5. **AI Instructor at 4Mind** (Feb 2025 - Jul 2025):
   - Taught computer science and ML algorithms to emerging tech talent.

### Key Flagship Projects (50+ on GitHub)
- **SupplyMind AI**: AI-powered supply chain intelligence with predictive demand forecasting and LLM agents (Python, Scikit-Learn, Streamlit, Docker).
- **MR-NLP Robust RAG Chatbot**: Adaptive RAG system integrating 3 NLP books (vector index) + 1 NLP book (knowledge graph) across 2,000+ chunks with 90%+ relevance (LangChain, FAISS/Chroma, Hugging Face).
- **Arabic Egyptian Dialect Sentiment Analysis**: Deep learning NLP model specialized for Egyptian slang & colloquial expressions (TensorFlow, Deep Learning).
- **RAG-Powered Knowledge Assistant for Teachers**: Curriculum textbook search and automated lesson planner reducing prep time by 50% (LangChain, FastAPI).
- **Audio Model Classification & Gender Detection**: Acoustic waveform analysis with Librosa Mel-spectrograms and 2D CNNs.
- **Mesdaq AI**: AI document governance and semantic intelligence system (TypeScript, React, Python).
- **Content Moderation System**: Real-time toxic comment detector for online platforms (NLP, AI Safety).
- **Credit Card Fraud Detection**: SMOTE oversampling + XGBoost for severe class imbalance.
- **Employee Attrition Prediction**: XGBoost & Random Forest predicting turnover with Power BI analytics.
- **Profile README Generator**: Full-stack tool built with React and TypeScript.

### Core Technical Skills
- **Languages**: Python (Expert), SQL, TypeScript, JavaScript, C++, Java, R
- **GenAI & NLP**: RAG Architecture, LLMs, LangChain, Vector DBs (FAISS, ChromaDB), Hugging Face, BERT, Librosa Audio AI, Knowledge Graphs
- **Machine Learning & Deep Learning**: PyTorch, TensorFlow, Scikit-Learn, XGBoost, LightGBM, Computer Vision, OpenCV, SMOTE, K-Means Clustering
- **Data Engineering & MLOps**: Docker, Dokploy, FastAPI, Flask, Streamlit, Power BI, Git/GitHub, PostgreSQL, Linux/VPS

### Certifications
HCIA-AI (Huawei), AI & Data Science (DEPI), NLP (ITIDA & NTI), Machine Learning Engineer (Elevoo Labs), IBM SkillsBuild (ML, Deep Learning, NLP & Computer Vision), AI Career Essentials (ALX), Sprints (AI, Python).

### Interaction Guidelines
1. Answer questions in clear, well-structured Markdown with bullet points, bold text, and clickable links where appropriate.
2. If the user writes in Arabic, respond in fluent, professional, and friendly Arabic (Egyptian dialect or Modern Standard Arabic).
3. Be enthusiastic, technically articulate, and confident about Ibrahim's achievements and engineering capabilities.
4. If asked how to hire or get in touch, provide Ibrahim's direct email (ibrahimabdelsattar042@gmail.com) and LinkedIn profile (https://www.linkedin.com/in/ibrahim-abdelsattar/).`;

// Intelligent Offline Fallback Engine
export function getAssistantResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Arabic Greetings & General Inquiries
  if (q.includes("السلام") || q.includes("مرحبا") || q.includes("اهلا") || q.includes("أهلاً") || q.includes("ازيك") || q.includes("مين ابراهيم") || q.includes("مين إبراهيم")) {
    return `👋 **أهلاً بحضرتك!** أنا المساعد الذكي لـ **إبراهيم عبد الستار**.

إبراهيم هو **Data Scientist & AI Specialist** مقيم في القاهرة، مصر. متخصص في:
- 🚀 **الذكاء الاصطناعي التوليدي وأنظمة RAG** (Retrieval-Augmented Generation)
- 🧠 **معالجة اللغة الطبيعية (NLP) واللهجة المصرية العامية**
- 🎵 **الذكاء الاصطناعي الصوتي (Audio AI) ومعالجة الإشارات**
- 💼 **بناء ونشر نماذج التعلم الآلي والعميق في الإنتاج (MLOps & Docker)**

تقدر تسألني عن مشاريعه، خبراته في العمل (Minders, HAMS.AI, DEPI)، شهاداته، أو إزاي تتواصل معاه للتعاون أو التوظيف!`;
  }

  // Arabic Experience Query
  if (q.includes("خبرة") || q.includes("اشتغل") || q.includes("شركات") || q.includes("وظيفة") || q.includes("وظائف")) {
    return `💼 **خبرات إبراهيم عبد الستار المهنية:**

1. **Machine Learning Instructor @ Minders** (نوفمبر 2025 - حتى الآن)
   - تدريس خوارزميات التعلم الآلي، التعلم العميق، والشبكات العصبية للطلاب والمطورين.
2. **AI Engineer Intern @ HAMS.AI** (سبتمبر 2025 - نوفمبر 2025)
   - تدريب وتحسين نماذج الذكاء الاصطناعي للإنتاج، ومتابعة دقة النماذج عبر خطوط إعادة تدريب آلية.
3. **AI Engineer Trainee @ مبادرة رواد مصر الرقمية (DEPI)** (نوفمبر 2024 - مايو 2025)
   - تخصص مكثف في هندسة البيانات وتطوير تطبيقات ML متكاملة باستخدام Docker و MLOps.
4. **استشاري حر في علوم البيانات والذكاء الاصطناعي** (يونيو 2024 - حتى الآن)
   - بناء شات بوت RAG للشركات، وتحليل المشاعر باللهجة المصرية، والتنبؤ بالبيانات.
5. **AI Instructor @ 4Mind** (فبراير 2025 - يوليو 2025).`;
  }

  // Arabic Projects Query
  if (q.includes("مشاريع") || q.includes("مشروع") || q.includes("عملت ايه") || q.includes("اعمال")) {
    return `🚀 **أبرز مشاريع إبراهيم عبد الستار (أكثر من 50 مشروع على GitHub):**

1. **[SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI)**: نظام ذكي للتنبؤ بالطلب في سلاسل الإمداد وإدارة المخزون باستخدام GenAI و ML.
2. **[MR-NLP Robust RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot)**: شات بوت RAG فائق الدقة مرتبط بقاعدة معرفية تضم أكثر من 2000 قطعة وكتب NLP متخصصة مع Knowledge Graph بدقة استرجاع 90%+.
3. **[Arabic Egyptian Dialect Sentiment Analysis](https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis)**: نموذج تعلم عميق مخصص لفهم وتصنيف المشاعر في اللهجة المصرية العامية.
4. **[RAG Knowledge Assistant for Teachers](https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers)**: مساعد ذكي للمعلمين لاسترجاع المناهج وتوليد خطط الدروس آلياً.
5. **[Audio Model Classification](https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender)**: تصنيف وتحليل الإشارات الصوتية باستخدام Mel-spectrograms وشبكات CNN.
6. **[Credit Card Fraud Detection](https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection)**: كشف الاحتيال المالي ومعالجة عدم توازن البيانات بنظام SMOTE و XGBoost.

يمكنك استكشاف المزيد على حسابه: [GitHub: IbrahimAbdelsattar](https://github.com/IbrahimAbdelsattar).`;
  }

  // English Greetings & Intro
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("who are you") || q.includes("who is ibrahim")) {
    return `👋 **Hi there! I am Ibrahim Abdelsattar's AI Persona and Portfolio Assistant.**

Ibrahim is a **Data Scientist & AI Specialist** based in Cairo, Egypt (Computer Science & AI at MTI University, GPA 3.5/4.0).

Here is a quick snapshot of what he does:
- 🚀 **Generative AI & Enterprise RAG Systems** (LangChain, Vector DBs, Knowledge Graphs)
- 🧠 **Dialectal NLP & Arabic Speech AI** (Egyptian slang sentiment, audio classification with CNNs)
- 💼 **Production MLOps & Applied Machine Learning** (PyTorch, TensorFlow, Docker, FastAPI)
- 👨‍🏫 **AI Instruction & Mentorship** (Currently Machine Learning Instructor at *Minders*)

What would you like to know more about? You can ask about his **projects**, **work experience**, **certifications**, **skills**, or **how to hire him**!`;
  }

  // RAG & Generative AI Inquiries
  if (q.includes("rag") || q.includes("llm") || q.includes("genai") || q.includes("gpt") || q.includes("langchain") || q.includes("vector")) {
    return `🧠 **Ibrahim's Generative AI & RAG Expertise:**

Ibrahim has architected end-to-end **Retrieval-Augmented Generation (RAG)** systems combining vector search, semantic embeddings, and LLM reasoning:

1. **[MR-NLP Robust RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot)**:
   - Built an adaptive RAG pipeline integrating **3 NLP textbooks into vector indices (ChromaDB/FAISS)** and **1 NLP book into a Knowledge Graph**.
   - Indexes **2,000+ chunks** achieving **90%+ response relevance**.
   - Includes 4 interactive modules: real-time chat, automatic quiz generation, progress tracking, and voice input.
   - Equipped with strict defenses against prompt injection and off-topic queries.

2. **[RAG-Powered Knowledge Assistant for Teachers](https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers)**:
   - Semantic textbook indexing allowing educators to generate approved lesson plans and quiz questions in seconds.
   - Reduces teacher preparation time by **over 50%**.

3. **[SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI)**:
   - Couples predictive demand models with LLM agents to deliver automated supply chain anomaly diagnostics and procurement alerts.

4. **[Mesdaq AI](https://github.com/IbrahimAbdelsattar/Mesdaq_AI)**:
   - High-precision document intelligence platform with semantic search and automated text summarization.`;
  }

  // Projects & GitHub
  if (q.includes("project") || q.includes("built") || q.includes("portfolio") || q.includes("github") || q.includes("code") || q.includes("repos")) {
    return `🚀 **Ibrahim has built over 50+ repositories on GitHub!** Here are his flagship creations:

- **[SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI)** — Predictive demand forecasting & GenAI supply chain optimization (*Python, Scikit-Learn, Streamlit, Docker*).
- **[MR-NLP Robust RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot)** — Adaptive RAG with 2,000+ chunks, knowledge graphs & voice input (*LangChain, Vector DB, Hugging Face*).
- **[Arabic Egyptian Dialect Sentiment Analysis](https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis)** — Deep learning for informal Egyptian Arabic slang (*TensorFlow, NLP*).
- **[RAG Knowledge Assistant for Teachers](https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers)** — Automated curriculum retrieval and lesson planning (*LangChain, FastAPI*).
- **[Audio Model Classification & Gender Detection](https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender)** — Mel-spectrogram signal analysis with 2D CNNs (*Librosa, TensorFlow*).
- **[Credit Card Fraud Detection](https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection)** — SMOTE oversampling + XGBoost on heavily imbalanced transactions (*Scikit-Learn, Imbalanced-Learn*).
- **[Content Moderation System](https://github.com/IbrahimAbdelsattar/Moderation_System)** — Real-time multi-class toxic text classification (*NLP, AI Safety*).
- **[Employee Attrition & Performance Rating](https://github.com/IbrahimAbdelsattar/Employee-Performance-Rating-Prediction)** — Predictive HR turnover models with Power BI analytics.

Explore all projects on the **[Projects page](/projects)** or visit Ibrahim's **[GitHub Profile](https://github.com/IbrahimAbdelsattar)**.`;
  }

  // Work Experience & Employment History
  if (q.includes("experience") || q.includes("job") || q.includes("company") || q.includes("work") || q.includes("career") || q.includes("minders") || q.includes("hams") || q.includes("depi")) {
    return `💼 **Ibrahim's Professional Experience:**

• **Machine Learning Instructor @ Minders** *(Nov 2025 – Present | Cairo, Egypt)*
  - Teaching hands-on Machine Learning, Deep Learning architectures (CNNs, RNNs, Transformers), and Neural Networks.
  - Mentoring students on real-world model deployment, hyperparameter optimization, and cloud serving.

• **AI Engineer Intern @ HAMS.AI** *(Sep 2025 – Nov 2025 | Cairo, Egypt)*
  - Designed, trained, and fine-tuned ML/DL models with optimized preprocessing for production scalability.
  - Built model monitoring and automated retraining pipelines to combat data drift.

• **AI Engineer Trainee @ Digital Egypt Pioneers Initiative (DEPI)** *(Nov 2024 – May 2025 | Cairo, Egypt)*
  - Intensive national program in advanced AI, Data Science, and Machine Learning.
  - Built end-to-end ML solutions with Python, SQL, interactive dashboards, and Docker MLOps.

• **Freelance Data Scientist & AI Consultant** *(Jun 2024 – Present | Remote)*
  - Architecting custom GenAI chatbots, RAG systems, Arabic NLP, and predictive ML for international clients.
  - Containerizing and deploying scalable APIs using Docker and Dokploy.

• **AI Instructor @ 4Mind** *(Feb 2025 – Jul 2025)*
  - Taught computer science and ML algorithms to emerging tech talent.`;
  }

  // Education & University
  if (q.includes("education") || q.includes("gpa") || q.includes("university") || q.includes("mti") || q.includes("degree") || q.includes("college") || q.includes("study") || q.includes("student")) {
    return `🎓 **Academic Background:**

- **Institution:** **MTI University** *(Modern University for Technology and Information)*
- **Degree:** **Bachelor of Computer Science & Artificial Intelligence**
- **Cumulative GPA:** **3.5 / 4.0**
- **Period:** October 2023 – Expected 2027
- **Location:** Cairo, Egypt
- **Coursework & Specialization:** Artificial Intelligence, Deep Learning, Data Structures & Algorithms, Database Systems, Computer Vision, and Natural Language Processing.`;
  }

  // Technical Skills & Stack
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("python") || q.includes("pytorch") || q.includes("tensorflow") || q.includes("docker") || q.includes("sql") || q.includes("fastapi")) {
    return `🛠️ **Ibrahim's Technical Stack & Skills:**

- **Programming Languages:** Python (Expert), SQL, TypeScript, JavaScript, C++, Java, R
- **Generative AI & LLMs:** RAG Architecture, LangChain, Vector DBs (ChromaDB, FAISS), Hugging Face Transformers, BERT, Prompt Engineering, Knowledge Graphs
- **Machine Learning & Deep Learning:** PyTorch, TensorFlow, Scikit-Learn, XGBoost, LightGBM, Computer Vision, OpenCV, SMOTE (Imbalanced Data), K-Means Clustering
- **Speech & Audio AI:** Librosa, Mel-spectrograms, MFCC feature extraction, CNN audio classification
- **Data & MLOps:** Docker, Dokploy, FastAPI, Flask, Streamlit, Power BI, Pandas, NumPy, Git/GitHub, PostgreSQL, Linux VPS Deployment`;
  }

  // Certifications
  if (q.includes("certif") || q.includes("course") || q.includes("license") || q.includes("accredit") || q.includes("huawei") || q.includes("ibm")) {
    return `🏆 **Professional Certifications:**

1. **HCIA-AI** — *Huawei ICT Academy*
2. **AI & Data Science Specialist** — *Digital Egypt Pioneers Initiative (DEPI) - MCIT*
3. **Natural Language Processing (NLP)** — *ITIDA & NTI*
4. **Machine Learning Engineer** — *Elevoo Labs*
5. **Machine Learning & Deep Learning** — *IBM SkillsBuild*
6. **NLP & Computer Vision** — *IBM SkillsBuild*
7. **Artificial Intelligence Fundamentals** — *IBM*
8. **AI Career Essentials** — *ALX*
9. **AI & Machine Learning Foundations** — *Sprints*
10. **Python Programming** — *Sprints*
11. **Artificial Intelligence** — *IEEE Benha*
12. **Quantum Machine Learning** — *Shabab Mobtakeron*
13. **Developing AI in Egypt** — *Ministry of Communications and Information Technology (MCIT)*

View the full credentials on the **[Certifications page](/certifications)**!`;
  }

  // Contact & Hiring
  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach") || q.includes("linkedin") || q.includes("call") || q.includes("collaborat") || q.includes("freelance")) {
    return `📩 **How to Contact & Hire Ibrahim:**

Ibrahim is available for **full-time AI/Data Science roles**, **freelance engineering contracts**, and **consulting engagements** worldwide.

- 📧 **Direct Email:** [ibrahimabdelsattar042@gmail.com](mailto:ibrahimabdelsattar042@gmail.com)
- 💼 **LinkedIn:** [linkedin.com/in/ibrahim-abdelsattar](https://www.linkedin.com/in/ibrahim-abdelsattar/)
- 💻 **GitHub:** [github.com/IbrahimAbdelsattar](https://github.com/IbrahimAbdelsattar)
- 📊 **Kaggle:** [kaggle.com/ibrahimabdelsattar10](https://www.kaggle.com/ibrahimabdelsattar10)
- 📍 **Location:** Cairo, Egypt (Available for Remote & Relocation)

You can also send a direct inquiry via the **[Contact page](/contact)** on this website!`;
  }

  // Specific Project Questions
  if (q.includes("supplymind")) {
    return `🚚 **[SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI) Highlights:**
SupplyMind AI is an intelligent supply chain management solution that integrates predictive demand forecasting with autonomous GenAI LLM agents.
- **Key Impact:** Reduces inventory holding costs by ~25% and detects procurement anomalies before shipment delays occur.
- **Stack:** Python, Scikit-Learn, Generative AI, Streamlit, Docker.`;
  }

  if (q.includes("sentiment") || q.includes("egyptian") || q.includes("arabic")) {
    return `🇪🇬 **[Arabic Egyptian Dialect Sentiment Analysis](https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis):**
Regional Arabic slang poses significant challenges for standard NLP models. Ibrahim engineered a deep learning pipeline in TensorFlow featuring specialized Arabic morphological cleaning and slang normalization to classify Egyptian sentiment into positive, negative, or neutral with high precision.`;
  }

  if (q.includes("audio") || q.includes("gender") || q.includes("librosa") || q.includes("voice")) {
    return `🎵 **[Audio Model Classification & Gender Detection](https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender):**
Uses Librosa for acoustic feature extraction (MFCCs, Chroma, Mel-spectrograms) and 2D Convolutional Neural Networks (CNNs) to classify audio wave signals, vocal pitch patterns, and identify vocal metrics with state-of-the-art accuracy.`;
  }

  if (q.includes("fraud") || q.includes("smote") || q.includes("credit card")) {
    return `💳 **[Credit Card Fraud Detection](https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection):**
Addresses severe real-world class imbalance (only 0.17% fraud cases) using SMOTE oversampling combined with XGBoost and ensemble classifiers. Evaluated using Precision-Recall AUC to ensure ultra-low false negatives while preventing false transaction denials.`;
  }

  // Default Fallback
  return `🤖 **Ibrahim's AI Assistant at your service!**

I can provide comprehensive details on:
- 🚀 **Projects:** [SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI), [MR-NLP Robust RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot), Arabic Dialect Sentiment, Audio AI, etc.
- 💼 **Work Experience:** Roles at Minders, HAMS.AI, DEPI, and Freelance Consulting.
- 🎓 **Education:** MTI University Computer Science & AI (GPA 3.5 / 4.0).
- 🛠️ **Tech Stack:** Python, PyTorch, LangChain, RAG, Docker, FastAPI, SQL.
- 📩 **Hiring & Contact:** Email [ibrahimabdelsattar042@gmail.com](mailto:ibrahimabdelsattar042@gmail.com) or connect on [LinkedIn](https://www.linkedin.com/in/ibrahim-abdelsattar/).

Feel free to ask any specific question, or try asking: *"What are your top RAG projects?"* or *"Tell me about your experience at HAMS.AI"*.`;
}
