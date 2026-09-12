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
export const IBRAHIM_SYSTEM_PROMPT = `CRITICAL IDENTITY & PERSONA INSTRUCTIONS:
1. You ARE Ibrahim Abdelsattar himself speaking directly to the visitor. You are NOT an AI assistant, bot, or representative.
2. NEVER say "I am Ibrahim's assistant" or "أنا مساعد إبراهيم" or refer to Ibrahim in the third person. ALWAYS talk as Ibrahim in the FIRST PERSON ("I", "me", "my", "أنا", "شغلي", "مشاريعي", "خبرتي").
3. LANGUAGE BEHAVIOR:
   When the user speaks in ARABIC: You MUST speak in natural, friendly, smart EGYPTIAN ARABIC (اللهجة المصرية العامية). Speak like a talented Egyptian engineer chatting with a client, colleague, or friend. Use Egyptian phrases like: "أهلاً بيك يا غالي!", "منور يا باشا!", "أنا إبراهيم عبد الستار، شغال Data Scientist و AI Specialist في القاهرة", "عملت أكتر من 50 مشروع على GitHub", "اشتغلت في Minders و HAMS.AI و DEPI", "لو حابب نشتغل سوا أو عندك فكرة مشروع، كلمني وأنا معاك في أي وقت!".
   When the user speaks in ENGLISH: Speak directly as Ibrahim in fluent, confident, friendly first-person English ("Hi! I'm Ibrahim Abdelsattar, a Data Scientist and AI Specialist based in Cairo, Egypt...").
   Match the user's language automatically.

CRITICAL FORMATTING RULES (STRICTLY ENFORCED):
1. NEVER output asterisks (*) or (**) anywhere in your response. Do not use bold asterisks or italic asterisks.
2. NEVER output dashes (-) or en-dashes (–) or em-dashes (—) anywhere in your response. Do not use dashes for bullet points or lists.
3. NEVER output hashtags (#) or headings (##, ###).
4. Use normal, clean, readable plain text. For lists or grouping, use numbers (1. 2. 3.) or emojis (🚀, 💡, 💼, 🎓, 📩) or simple paragraph line breaks.
5. Standard punctuation marks like commas, periods, colons, question marks, and exclamation marks are welcomed and encouraged.
6. The user may send you messages with various punctuation marks (e.g. ? or ؟ or ! or quotes). Always accept, understand, and respond warmly.

My Profile:
Full Name: Ibrahim Abdelsattar
Role: Data Scientist and AI Specialist based in Cairo, Egypt
Education: MTI University (Bachelor of Computer Science and Artificial Intelligence, GPA 3.5 / 4.0, Oct 2023 to Expected 2027)
Email: ibrahimabdelsattar042@gmail.com
LinkedIn: https://www.linkedin.com/in/ibrahim-abdelsattar/
GitHub: https://github.com/IbrahimAbdelsattar
Kaggle: https://www.kaggle.com/ibrahimabdelsattar10
Availability: Open to full-time AI/Data Science roles, freelance contracts, and remote consulting worldwide.

My Professional Work Experience:
1. Machine Learning Instructor at Minders (Nov 2025 to Present, Cairo, Egypt):
   I teach Machine Learning, Deep Learning, and Neural Networks to developers and students, mentoring them through end-to-end model training, evaluation, and deployment.
2. AI Engineer Intern at HAMS.AI (Sep 2025 to Nov 2025, Cairo, Egypt):
   I designed, trained, and fine-tuned ML and DL models with optimized preprocessing pipelines for production scalability and automated retraining.
3. AI Engineer Trainee at Digital Egypt Pioneers Initiative DEPI (Nov 2024 to May 2025, Cairo, Egypt):
   Completed intensive AI and Data Science training, building end-to-end ML applications and MLOps pipelines with Docker.
4. Freelance Data Scientist and AI Consultant (Jun 2024 to Present):
   I architect custom Generative AI, RAG chatbots, dialectal Arabic sentiment models, and predictive ML systems for clients worldwide.
5. AI Instructor at 4Mind (Feb 2025 to Jul 2025):
   Taught computer science algorithms and ML fundamentals.

My Key Projects (50+ on GitHub):
1. SupplyMind AI: I built an AI supply chain platform combining predictive demand forecasting with autonomous GenAI LLM agents.
2. MR-NLP Robust RAG Chatbot: I created an adaptive RAG system indexing 2,000+ chunks from 3 NLP books (vector index) plus 1 book (knowledge graph) with 90%+ relevance and voice input.
3. Arabic Egyptian Dialect Sentiment Analysis: I developed a deep learning NLP model specialized in informal Egyptian slang and colloquial expressions.
4. RAG-Powered Knowledge Assistant for Teachers: I built an automated curriculum search and lesson planner reducing teacher prep time by 50%.
5. Audio Model Classification and Gender Detection: I analyzed acoustic signals with Librosa Mel-spectrograms and 2D CNNs.
6. Content Moderation System: Real-time toxic text detection for digital platforms.
7. Credit Card Fraud Detection: SMOTE oversampling plus XGBoost solving severe financial class imbalance.
8. Employee Attrition Prediction: XGBoost and Random Forest predicting turnover with Power BI analytics.
9. Profile README Generator: Interactive web tool built with React and TypeScript.

My Technical Skills:
Languages: Python (Expert), SQL, TypeScript, JavaScript, C++, Java, R
GenAI and NLP: RAG Systems, LLMs, LangChain, Vector DBs (FAISS, ChromaDB), Hugging Face, BERT, Librosa Audio AI, Knowledge Graphs
ML and Deep Learning: PyTorch, TensorFlow, Scikit-Learn, XGBoost, LightGBM, Computer Vision, OpenCV, SMOTE, K-Means Clustering
Tools and MLOps: Docker, Dokploy, FastAPI, Flask, Streamlit, Power BI, Git/GitHub, PostgreSQL, Linux/VPS

Tone: Personal, confident, warm, and authentic. Clean text without dashes, asterisks, or hashtags.`;

// Intelligent Offline Fallback Engine (First Person & Egyptian Arabic, No *, -, #)
export function getAssistantResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Normalize query for flexible matching while accepting all punctuation
  const normalized = q
    .replace(/[?؟!,،.:;؛"'\(\)\[\]\{\}\-_#*~`/\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Arabic Greetings & "Who are you" (من أنت / انت مين)
  if (
    normalized.includes("انت مين") ||
    normalized.includes("إنت مين") ||
    normalized.includes("مين انت") ||
    normalized.includes("مين إنت") ||
    normalized.includes("من انت") ||
    normalized.includes("من أنت") ||
    normalized.includes("مين معايا") ||
    normalized.includes("عرفني بنفسك") ||
    normalized.includes("السلام") ||
    normalized.includes("مرحبا") ||
    normalized.includes("اهلا") ||
    normalized.includes("أهلاً") ||
    normalized.includes("ازيك") ||
    normalized.includes("عامل ايه") ||
    normalized.includes("إزيك")
  ) {
    return `👋 أهلاً بيك يا غالي! منورني.

أنا إبراهيم عبد الستار، شغال Data Scientist و AI Specialist ومقيم في القاهرة.

بشتغل بشكل أساسي في:
🚀 الذكاء الاصطناعي التوليدي وأنظمة RAG مع LLMs و Vector DBs
🧠 معالجة اللغات الطبيعية NLP وتحليل اللهجة المصرية العامية
🎵 الذكاء الاصطناعي الصوتي Audio AI وتحليل الإشارات
💼 بناء ونشر نماذج التعلم الآلي والعميق في بيئات الإنتاج MLOps و Docker

وحالياً شغال Machine Learning Instructor في Minders وبدرس علوم حاسب وذكاء اصطناعي في جامعة MTI بتقدير 3.5 من 4.0.

تحب تسألني عن إيه في شغلي، مشاريعي، أو حابب نشتغل سوا في مشروع جديد؟`;
  }

  // Arabic Experience Query
  if (
    normalized.includes("خبرتك") ||
    normalized.includes("خبراتك") ||
    normalized.includes("اشتغلت فين") ||
    normalized.includes("شغال فين") ||
    normalized.includes("شركات") ||
    normalized.includes("وظيفة") ||
    normalized.includes("وظيفتك") ||
    normalized.includes("شغلك")
  ) {
    return `💼 دي خبراتي المهنية اللي اشتغلت فيها:

1. Machine Learning Instructor في Minders (نوفمبر 2025 حتى الآن في القاهرة)
بدرس كورسات متقدمة في التعلم الآلي والتعلم العميق والشبكات العصبية، وبشرف على مشاريع عملية لتجهيز وتدريب ونشر النماذج.

2. AI Engineer Intern في HAMS.AI (سبتمبر 2025 إلى نوفمبر 2025 في القاهرة)
دربت وحسنت نماذج للإنتاج، وبنيت خطوط إعادة تدريب آلية لمواجهة تغير البيانات.

3. AI Engineer Trainee في مبادرة رواد مصر الرقمية DEPI (نوفمبر 2024 إلى مايو 2025 في القاهرة)
تدريب مكثف في هندسة البيانات وبناء حلول ذكاء اصطناعي متكاملة باستخدام Python و SQL و Docker و MLOps.

4. استشاري حر في الذكاء الاصطناعي وعلوم البيانات Freelance (يونيو 2024 حتى الآن)
بنفذ مشاريع RAG متقدمة للشركات، وتحليل المشاعر، وأنظمة التنبؤ، وبنشرها على سيرفرات VPS باستخدام Dokploy و Docker.

5. AI Instructor في 4Mind (فبراير 2025 إلى يوليو 2025).

حابب تعرف تفاصيل أكتر عن أي تجربة منهم؟`;
  }

  // Arabic Projects Query
  if (
    normalized.includes("مشاريعك") ||
    normalized.includes("مشروع") ||
    normalized.includes("عملت ايه") ||
    normalized.includes("شغلك في البرمجة") ||
    normalized.includes("جيت هاب") ||
    normalized.includes("github")
  ) {
    return `🚀 أنا عملت أكتر من 50 مشروع على GitHub، ودي أبرز مشاريعي اللي بفتخر بيها:

1. [SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI): نظام ذكي للتنبؤ بالطلب في سلاسل الإمداد وإدارة المخزون بيجمع بين الـ Predictive ML و GenAI Agents عشان يقلل الهدر وتكاليف التخزين بنسبة 25%.

2. [MR-NLP Robust RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot): شات بوت RAG فائق الدقة بيعتمد على 3 كتب NLP مفهرسة كـ Vector Index وكتاب مفهرس كـ Knowledge Graph على أكتر من 2000 قطعة بيانات، وحقق دقة استرجاع 90%+ مع موديول أوامر صوتية.

3. [Arabic Egyptian Dialect Sentiment Analysis](https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis): نموذج Deep Learning بنيته بتنسرفلو مخصص لفهم الكلمات والمصطلحات الدارجة في اللهجة المصرية العامية وتصنيف مشاعر العملاء.

4. [RAG Knowledge Assistant for Teachers](https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers): مساعد ذكي للمدرسين بيبحث في المناهج والكتب المدرسية وبيولد خطط الدروس والأسئلة آلياً، وفر 50% من وقت التحضير.

5. [Audio Model Classification](https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender): تصنيف وتحليل الإشارات الصوتية باستخدام Mel-spectrograms ومكتبة Librosa مع شبكات 2D CNNs.

6. [Credit Card Fraud Detection](https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection): كشف الاحتيال المالي ومعالجة عدم توازن البيانات بنظام SMOTE مع XGBoost.

تقدر تشوف كل الأكواد والمشاريع على حسابي: [GitHub: IbrahimAbdelsattar](https://github.com/IbrahimAbdelsattar).`;
  }

  // Arabic Contact & Hire Query
  if (
    normalized.includes("اتواصل معاك") ||
    normalized.includes("تواصل") ||
    normalized.includes("ايميلك") ||
    normalized.includes("رقمك") ||
    normalized.includes("نشتغل سوا") ||
    normalized.includes("اوظفك") ||
    normalized.includes("شغل") ||
    normalized.includes("وظفني") ||
    normalized.includes("لينكد ان") ||
    normalized.includes("linkedin")
  ) {
    return `📩 تسعدني جداً معرفتك وتواصلك معايا!

أنا متاح للشغل في وظائف بدوام كامل (Full-time)، أو مشاريع فريلانس واستشارات AI سواء عن بُعد أو في القاهرة.

📧 إيميلي المباشر: [ibrahimabdelsattar042@gmail.com](mailto:ibrahimabdelsattar042@gmail.com)
💼 لينكد إن: [linkedin.com/in/ibrahim-abdelsattar](https://www.linkedin.com/in/ibrahim-abdelsattar/)
💻 جيت هاب: [github.com/IbrahimAbdelsattar](https://github.com/IbrahimAbdelsattar)
📊 كاجل: [kaggle.com/ibrahimabdelsattar10](https://www.kaggle.com/ibrahimabdelsattar10)

ابعتلي في أي وقت وهرد عليك على طول!`;
  }

  // English "Who are you" & Greetings
  if (
    normalized.includes("who are you") ||
    normalized.includes("who is ibrahim") ||
    normalized.includes("what do you do") ||
    normalized.includes("hi") ||
    normalized.includes("hello") ||
    normalized.includes("hey")
  ) {
    return `👋 Hi! I'm Ibrahim Abdelsattar.

I am a Data Scientist and AI Specialist based in Cairo, Egypt. I study Computer Science and Artificial Intelligence at MTI University with a 3.5 / 4.0 GPA.

Here is a quick snapshot of what I do:
🚀 Generative AI and Enterprise RAG Systems (LangChain, Vector DBs, Knowledge Graphs)
🧠 Dialectal NLP and Speech AI (Egyptian slang sentiment, Librosa audio classification with CNNs)
💼 Production Machine Learning and MLOps (PyTorch, TensorFlow, Docker, FastAPI)
👨‍🏫 AI Instruction and Mentorship (Currently Machine Learning Instructor at Minders)

What would you like to know more about? You can ask about my projects, work experience, certifications, skills, or how we can collaborate!`;
  }

  // English RAG & GenAI Inquiries
  if (
    normalized.includes("rag") ||
    normalized.includes("llm") ||
    normalized.includes("genai") ||
    normalized.includes("gpt") ||
    normalized.includes("langchain") ||
    normalized.includes("vector")
  ) {
    return `🧠 My Generative AI and RAG Expertise:

I specialize in building production-ready Retrieval-Augmented Generation (RAG) systems combining semantic vector search with LLM reasoning:

1. [MR-NLP Robust RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot):
Built an adaptive RAG pipeline integrating 3 NLP textbooks into vector indices (ChromaDB/FAISS) and 1 NLP book into a Knowledge Graph. Indexed 2,000+ chunks achieving 90%+ response relevance with voice input.

2. [RAG-Powered Knowledge Assistant for Teachers](https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers):
Semantic curriculum search generating approved lesson plans and quizzes, cutting preparation time by over 50%.

3. [SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI):
Integrates predictive demand forecasting models with autonomous LLM agents to deliver real-time supply chain anomaly detection.

4. [Mesdaq AI](https://github.com/IbrahimAbdelsattar/Mesdaq_AI):
Document intelligence platform with semantic search and automated text summarization.`;
  }

  // English Projects & GitHub
  if (
    normalized.includes("project") ||
    normalized.includes("built") ||
    normalized.includes("portfolio") ||
    normalized.includes("github") ||
    normalized.includes("code") ||
    normalized.includes("repos")
  ) {
    return `🚀 I have built over 50+ repositories on GitHub! Here are some of my flagship projects:

1. [SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI), predictive demand forecasting and GenAI supply chain optimization (Python, Scikit-Learn, Streamlit, Docker).

2. [MR-NLP Robust RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot), adaptive RAG with 2,000+ chunks, knowledge graphs and voice input (LangChain, Vector DB, Hugging Face).

3. [Arabic Egyptian Dialect Sentiment Analysis](https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis), deep learning for informal Egyptian Arabic slang (TensorFlow, NLP).

4. [RAG Knowledge Assistant for Teachers](https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers), automated curriculum retrieval and lesson planning (LangChain, FastAPI).

5. [Audio Model Classification and Gender Detection](https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender), Mel-spectrogram signal analysis with 2D CNNs (Librosa, TensorFlow).

6. [Credit Card Fraud Detection](https://github.com/IbrahimAbdelsattar/Credit-card-Fraud-Detection), SMOTE oversampling with XGBoost on heavily imbalanced transactions (Scikit-Learn).

7. [Content Moderation System](https://github.com/IbrahimAbdelsattar/Moderation_System), real-time multi-class toxic text classification (NLP, AI Safety).

8. [Employee Attrition and Performance Rating](https://github.com/IbrahimAbdelsattar/Employee-Performance-Rating-Prediction), predictive HR turnover models with Power BI analytics.

Explore all my projects on the Projects page or check my [GitHub Profile](https://github.com/IbrahimAbdelsattar).`;
  }

  // English Work Experience
  if (
    normalized.includes("experience") ||
    normalized.includes("job") ||
    normalized.includes("company") ||
    normalized.includes("work") ||
    normalized.includes("career") ||
    normalized.includes("minders") ||
    normalized.includes("hams") ||
    normalized.includes("depi")
  ) {
    return `💼 My Professional Experience:

1. Machine Learning Instructor at Minders (Nov 2025 to Present in Cairo, Egypt)
Teaching hands-on Machine Learning, Deep Learning (CNNs, RNNs, Transformers), and Neural Networks, mentoring students on end-to-end model deployment.

2. AI Engineer Intern at HAMS.AI (Sep 2025 to Nov 2025 in Cairo, Egypt)
Designed, trained, and fine-tuned ML and DL models with optimized preprocessing for production scalability, creating automated retraining pipelines.

3. AI Engineer Trainee at Digital Egypt Pioneers Initiative DEPI (Nov 2024 to May 2025 in Cairo, Egypt)
Intensive national program in advanced AI, Data Science, and Machine Learning with Docker MLOps.

4. Freelance Data Scientist and AI Consultant (Jun 2024 to Present)
Building custom GenAI chatbots, RAG systems, Arabic NLP, and predictive ML for international clients.

5. AI Instructor at 4Mind (Feb 2025 to Jul 2025)
Taught computer science and ML algorithms to emerging tech talent.`;
  }

  // English Education
  if (
    normalized.includes("education") ||
    normalized.includes("gpa") ||
    normalized.includes("university") ||
    normalized.includes("mti") ||
    normalized.includes("degree") ||
    normalized.includes("college") ||
    normalized.includes("study") ||
    normalized.includes("student")
  ) {
    return `🎓 My Academic Background:

University: MTI University (Modern University for Technology and Information)
Degree: Bachelor of Computer Science and Artificial Intelligence
Cumulative GPA: 3.5 / 4.0
Period: October 2023 to Expected 2027
Location: Cairo, Egypt
Specialization: Artificial Intelligence, Deep Learning, Data Structures and Algorithms, Database Systems, Computer Vision, and Natural Language Processing.`;
  }

  // English Skills & Tech Stack
  if (
    normalized.includes("skill") ||
    normalized.includes("tech") ||
    normalized.includes("stack") ||
    normalized.includes("python") ||
    normalized.includes("pytorch") ||
    normalized.includes("tensorflow") ||
    normalized.includes("docker") ||
    normalized.includes("sql") ||
    normalized.includes("fastapi")
  ) {
    return `🛠️ My Technical Stack and Skills:

Programming Languages: Python (Expert), SQL, TypeScript, JavaScript, C++, Java, R
Generative AI and LLMs: RAG Architecture, LangChain, Vector DBs (ChromaDB, FAISS), Hugging Face Transformers, BERT, Prompt Engineering, Knowledge Graphs
Machine Learning and Deep Learning: PyTorch, TensorFlow, Scikit-Learn, XGBoost, LightGBM, Computer Vision, OpenCV, SMOTE, K-Means Clustering
Speech and Audio AI: Librosa, Mel-spectrograms, MFCC feature extraction, CNN audio classification
Data and MLOps: Docker, Dokploy, FastAPI, Flask, Streamlit, Power BI, Pandas, NumPy, Git/GitHub, PostgreSQL, Linux VPS Deployment`;
  }

  // English Certifications
  if (
    normalized.includes("certif") ||
    normalized.includes("course") ||
    normalized.includes("license") ||
    normalized.includes("accredit") ||
    normalized.includes("huawei") ||
    normalized.includes("ibm")
  ) {
    return `🏆 My Professional Certifications:

1. HCIA-AI by Huawei ICT Academy
2. AI and Data Science Specialist by Digital Egypt Pioneers Initiative (DEPI) - MCIT
3. Natural Language Processing (NLP) by ITIDA and NTI
4. Machine Learning Engineer by Elevoo Labs
5. Machine Learning and Deep Learning by IBM SkillsBuild
6. NLP and Computer Vision by IBM SkillsBuild
7. Artificial Intelligence Fundamentals by IBM
8. AI Career Essentials by ALX
9. AI and Machine Learning Foundations by Sprints
10. Python Programming by Sprints
11. Artificial Intelligence by IEEE Benha
12. Quantum Machine Learning by Shabab Mobtakeron
13. Developing AI in Egypt by Ministry of Communications and Information Technology (MCIT)

View the full credentials on my Certifications page!`;
  }

  // English Contact & Hiring
  if (
    normalized.includes("contact") ||
    normalized.includes("hire") ||
    normalized.includes("email") ||
    normalized.includes("reach") ||
    normalized.includes("linkedin") ||
    normalized.includes("call") ||
    normalized.includes("collaborat") ||
    normalized.includes("freelance")
  ) {
    return `📩 How to Contact and Hire Me:

I am actively available for full-time AI/Data Science roles, freelance contracts, and consulting engagements worldwide.

📧 Direct Email: [ibrahimabdelsattar042@gmail.com](mailto:ibrahimabdelsattar042@gmail.com)
💼 LinkedIn: [linkedin.com/in/ibrahim-abdelsattar](https://www.linkedin.com/in/ibrahim-abdelsattar/)
💻 GitHub: [github.com/IbrahimAbdelsattar](https://github.com/IbrahimAbdelsattar)
📊 Kaggle: [kaggle.com/ibrahimabdelsattar10](https://www.kaggle.com/ibrahimabdelsattar10)
📍 Location: Cairo, Egypt (Available for Remote and Relocation)

You can also send a direct inquiry through the Contact page on this website!`;
  }

  // Default Fallback
  return `👋 Hi! I'm Ibrahim Abdelsattar.

Feel free to ask me anything about:
🚀 My Projects: [SupplyMind AI](https://github.com/IbrahimAbdelsattar/SupplyMindAI), [MR-NLP Robust RAG Chatbot](https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot), Arabic Dialect Sentiment, Audio AI, etc.
💼 My Experience: Roles at Minders, HAMS.AI, DEPI, and Freelance Consulting.
🎓 My Education: MTI University Computer Science and AI (GPA 3.5 / 4.0).
🛠️ My Tech Stack: Python, PyTorch, LangChain, RAG, Docker, FastAPI, SQL.
📩 Hiring and Contact: Email me at [ibrahimabdelsattar042@gmail.com](mailto:ibrahimabdelsattar042@gmail.com) or connect on [LinkedIn](https://www.linkedin.com/in/ibrahim-abdelsattar/).

لو بتكلم عربي، اتفضل اسألني باللهجة المصرية عن أي مشروع أو خبرة وهرد عليك على طول!`;
}
