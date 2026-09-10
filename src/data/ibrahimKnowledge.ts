export interface IbrahimInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  education: {
    university: string;
    degree: string;
    gpa: string;
    period: string;
  };
  skills: {
    languages: string[];
    genAiAndNlp: string[];
    mlAndDl: string[];
    toolsAndOps: string[];
  };
  experiences: {
    role: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  featuredProjects: {
    name: string;
    category: string;
    desc: string;
    url: string;
    tech: string[];
  }[];
}

export const ibrahimData: IbrahimInfo = {
  name: "Ibrahim Abdelsattar",
  title: "Data Scientist & AI Specialist",
  location: "Cairo, Egypt",
  email: "ibrahimabdelsattar042@gmail.com",
  github: "https://github.com/IbrahimAbdelsattar",
  linkedin: "https://linkedin.com/in/ibrahim-abdelsattar",
  education: {
    university: "MTI University",
    degree: "Bachelor of Computer Science & Artificial Intelligence",
    gpa: "3.5 / 4.0",
    period: "Oct 2023 - Expected 2027",
  },
  skills: {
    languages: ["Python", "SQL", "TypeScript", "JavaScript", "C++", "Java", "R"],
    genAiAndNlp: ["Generative AI", "LLMs", "RAG Architecture", "LangChain", "Vector DBs (FAISS, ChromaDB)", "Hugging Face Transformers", "BERT", "Librosa Audio AI"],
    mlAndDl: ["Deep Learning", "Machine Learning", "PyTorch", "TensorFlow", "Scikit-Learn", "XGBoost", "LightGBM", "Computer Vision", "OpenCV"],
    toolsAndOps: ["Pandas", "NumPy", "Power BI", "Docker", "Dokploy", "FastAPI", "Flask", "Streamlit", "Git & GitHub", "PostgreSQL"],
  },
  experiences: [
    {
      role: "Machine Learning Instructor",
      company: "Minders",
      period: "Nov 2025 - Present",
      highlights: [
        "Instructing university students and developers in Machine Learning, Deep Learning, and Neural Networks.",
        "Guiding hands-on projects in model training, fine-tuning, and deployment."
      ]
    },
    {
      role: "AI Engineer Intern",
      company: "HAMS.AI",
      period: "Sep 2025 - Nov 2025",
      highlights: [
        "Trained and optimized ML/DL models for production scalability.",
        "Monitored model accuracy and automated retraining pipelines."
      ]
    },
    {
      role: "AI Engineer Trainee",
      company: "Digital Egypt Pioneers Initiative (DEPI)",
      period: "Nov 2024 - May 2025",
      highlights: [
        "Specialized in advanced AI, Data Science, and Machine Learning methodologies.",
        "Developed end-to-end ML applications with interactive dashboards and MLOps principles."
      ]
    },
    {
      role: "Freelance Data Scientist & AI Consultant",
      company: "Self-Employed",
      period: "Jun 2024 - Present",
      highlights: [
        "Architecting Generative AI, custom RAG chatbots, dialectal Egyptian Arabic sentiment analysis engines, and predictive analytics models."
      ]
    },
    {
      role: "AI Instructor",
      company: "4Mind",
      period: "Feb 2025 – Jul 2025",
      highlights: [
        "Taught machine learning algorithms and computer science principles."
      ]
    }
  ],
  featuredProjects: [
    {
      name: "SupplyMind AI",
      category: "GenAI & Supply Chain",
      desc: "AI-powered supply chain intelligence and predictive inventory demand forecasting.",
      url: "https://github.com/IbrahimAbdelsattar/SupplyMindAI",
      tech: ["Python", "Generative AI", "Predictive Analytics", "Streamlit", "Docker"]
    },
    {
      name: "MR-NLP Robust RAG Chatbot",
      category: "GenAI & NLP",
      desc: "Context-aware RAG system connecting vector stores with LLMs for hallucination-free document QA.",
      url: "https://github.com/IbrahimAbdelsattar/MR-NLP-Robust-RAG-Chatbot",
      tech: ["Python", "RAG", "LangChain", "Vector DB", "LLM"]
    },
    {
      name: "Arabic Egyptian Dialect Sentiment Analysis",
      category: "NLP & Dialectal AI",
      desc: "Deep learning model trained specifically to classify informal Egyptian Arabic slang sentiment.",
      url: "https://github.com/IbrahimAbdelsattar/Arabic-Sentiment-Analysis",
      tech: ["Python", "Deep Learning", "TensorFlow", "NLP"]
    },
    {
      name: "RAG Knowledge Assistant for Teachers",
      category: "GenAI & Education",
      desc: "RAG system for educators to search curriculum materials and generate lesson plans automatically.",
      url: "https://github.com/IbrahimAbdelsattar/RAG-Powered-Knowledge-Assistantf-for-Teachers",
      tech: ["Python", "RAG", "LLMs", "LangChain"]
    },
    {
      name: "Audio Model Classification & Gender Detection",
      category: "Audio AI",
      desc: "Acoustic signal classification using Mel-spectrograms, MFCC feature extraction, and CNNs.",
      url: "https://github.com/IbrahimAbdelsattar/Audio-Model-Classification-Gender",
      tech: ["Python", "Librosa", "CNN", "Deep Learning"]
    },
    {
      name: "Content Moderation System",
      category: "NLP & AI Safety",
      desc: "Automated toxic content detector for online communities.",
      url: "https://github.com/IbrahimAbdelsattar/Moderation_System",
      tech: ["Python", "NLP", "Classification"]
    },
    {
      name: "Profile README Generator",
      category: "Full-Stack App",
      desc: "Interactive tool to create personalized GitHub profile READMEs with custom badges and stats.",
      url: "https://github.com/IbrahimAbdelsattar/profile-readme-generator",
      tech: ["TypeScript", "React", "Tailwind CSS"]
    }
  ]
};

// Response Generator Function
export function getAssistantResponse(query: string): string {
  const q = query.toLowerCase().trim();

  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("who are you")) {
    return `👋 Hi there! I'm Ibrahim's AI Assistant. I represent **Ibrahim Abdelsattar** — a Data Scientist & AI Specialist based in Cairo, Egypt. 

I can answer questions about Ibrahim's:
- 🚀 **AI & Machine Learning Projects** (RAG, GenAI, Dialectal Arabic NLP, Audio AI)
- 💼 **Work Experience** (Minders, HAMS.AI, DEPI, 4Mind)
- 🎓 **Education & GPA** (MTI University CS & AI)
- 🛠️ **Tech Stack & Skills** (Python, PyTorch, LangChain, TypeScript, Docker)
- 📩 **Contact & Hiring Details**

How can I help you today?`;
  }

  if (q.includes("project") || q.includes("built") || q.includes("work") || q.includes("github")) {
    return `🚀 **Ibrahim has over 50+ GitHub repositories!** Here are some of his flagship projects:

1. **SupplyMind AI** — AI supply chain demand forecasting & logistics intelligence.
2. **MR-NLP Robust RAG Chatbot** — Hallucination-free document Q&A using RAG & LangChain.
3. **Arabic Egyptian Dialect Sentiment Analysis** — Deep learning model tailored for informal Egyptian slang.
4. **RAG Knowledge Assistant for Teachers** — Curriculum search & automated lesson planner for educators.
5. **Audio Classification & Gender Detection** — CNN signal processing with Librosa Mel-spectrograms.
6. **Profile README Generator** — Full-stack tool built with React & TypeScript.

Check out the **Projects page** for the complete filterable catalog, or visit Ibrahim's GitHub: ${ibrahimData.github}`;
  }

  if (q.includes("rag") || q.includes("llm") || q.includes("genai") || q.includes("gpt") || q.includes("langchain")) {
    return `🧠 **Generative AI & RAG Expertise:**
Ibrahim specializes in building robust **RAG (Retrieval-Augmented Generation)** pipelines using **LangChain**, **Vector DBs (FAISS, ChromaDB)**, and **LLM Fine-Tuning**.

Key GenAI Projects:
- **MR-NLP Robust RAG Chatbot:** Semantic search over complex PDFs and enterprise docs.
- **RAG Knowledge Assistant for Teachers:** Intelligent lesson plan generation grounded in real curricula.
- **Mesdaq AI:** Governance & document intelligence assistant.`;
  }

  if (q.includes("experience") || q.includes("job") || q.includes("company") || q.includes("work") || q.includes("hams") || q.includes("depi") || q.includes("minders")) {
    return `💼 **Ibrahim's Professional Background:**

• **Machine Learning Instructor** @ *Minders* (Nov 2025 – Present)
• **AI Engineer Intern** @ *HAMS.AI* (Sep 2025 – Nov 2025) — ML model fine-tuning & production retraining pipelines.
• **AI Engineer Trainee** @ *DEPI (Digital Egypt Pioneers Initiative)* (Nov 2024 – May 2025) — End-to-end ML & MLOps dashboards.
• **Freelance Data Scientist & AI Consultant** (Jun 2024 – Present) — Custom RAG chatbots, Arabic NLP, and predictive analytics.
• **AI Instructor** @ *4Mind* (Feb 2025 – Jul 2025).`;
  }

  if (q.includes("education") || q.includes("gpa") || q.includes("university") || q.includes("mti") || q.includes("degree")) {
    return `🎓 **Education:**
Ibrahim is studying at **MTI University** for a **Bachelor of Computer Science & Artificial Intelligence** (Oct 2023 – Expected 2027).
- **GPA:** **3.5 / 4.0**
- **Location:** Cairo, Egypt`;
  }

  if (q.includes("skill") || q.includes("python") || q.includes("tech") || q.includes("stack") || q.includes("pytorch") || q.includes("docker")) {
    return `🛠️ **Ibrahim's Technical Stack:**

- **Languages:** Python, SQL, TypeScript, JavaScript, C++, Java, R
- **GenAI & NLP:** Generative AI, RAG Systems, LangChain, Vector DBs (Chroma/FAISS), Hugging Face Transformers, BERT, Librosa
- **ML & Deep Learning:** PyTorch, TensorFlow, Scikit-Learn, XGBoost, LightGBM, Computer Vision, OpenCV
- **Tools & MLOps:** Docker, Dokploy, Power BI, Streamlit, Flask, FastAPI, Git/GitHub, PostgreSQL`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("linkedin")) {
    return `📩 **Get in Touch with Ibrahim:**

- **Email:** [ibrahimabdelsattar042@gmail.com](mailto:ibrahimabdelsattar042@gmail.com)
- **LinkedIn:** [linkedin.com/in/ibrahim-abdelsattar](https://linkedin.com/in/ibrahim-abdelsattar)
- **GitHub:** [github.com/IbrahimAbdelsattar](https://github.com/IbrahimAbdelsattar)
- **Location:** Cairo, Egypt

Feel free to send a message via the **Contact page** or email directly to discuss AI projects, freelance work, or full-time roles!`;
  }

  return `🤖 Ibrahim's AI Assistant here! I can help you learn more about Ibrahim's:
- **Projects:** SupplyMind AI, RAG Chatbot, Dialectal Egyptian Arabic Sentiment, Audio AI, etc.
- **Experience:** Minders, HAMS.AI, DEPI, Freelance Data Science.
- **Skills:** Python, PyTorch, RAG/LLMs, LangChain, Docker, SQL.
- **Contact:** Email & social links.

Feel free to ask any specific question, or try: *"What are Ibrahim's top projects?"* or *"How can I hire Ibrahim?"*`;
}
