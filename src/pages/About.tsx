import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Target, Code2, Sparkles, Cpu, Layers, Terminal } from "lucide-react";
import Layout from "@/components/Layout";
import SkillBadge from "@/components/SkillBadge";
import { TiltCard3D } from "@/components/3d/TiltCard3D";

const skills = {
  programming: ["Python", "SQL", "TypeScript", "JavaScript", "C++", "Java", "R"],
  genAiAndNlp: ["Generative AI", "LLMs", "RAG Systems", "LangChain", "Vector DBs (FAISS/Chroma)", "Hugging Face", "BERT", "Transformers", "Librosa (Audio AI)"],
  machineLearning: ["Deep Learning", "Machine Learning", "PyTorch", "TensorFlow", "Scikit-Learn", "XGBoost", "LightGBM", "Computer Vision", "OpenCV"],
  dataAndOps: ["Pandas", "NumPy", "Power BI", "Matplotlib", "Seaborn", "Docker", "Dokploy", "FastAPI", "Flask", "Streamlit", "Git/GitHub", "PostgreSQL"]
};

const About = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Data Scientist & AI Specialist</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="gradient-text">Ibrahim Abdelsattar</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforming complex data and state-of-the-art AI research into scalable, intelligent production solutions.
            </p>
          </motion.div>

          {/* Overview & Experience */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column: Work Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                Work Experience
              </h2>
              <div className="space-y-6">
                {[
                  {
                    role: "Machine Learning Instructor",
                    company: "Minders",
                    period: "Nov 2025 - Present",
                    description: [
                      "Delivering comprehensive AI coursework covering Machine Learning, Deep Learning, and Neural Networks.",
                      "Mentoring students on hands-on AI projects, model tuning, and deployment best practices."
                    ]
                  },
                  {
                    role: "AI Engineer Intern",
                    company: "HAMS.AI",
                    period: "Sep 2025 - Nov 2025",
                    description: [
                      "Designed, trained, and fine-tuned ML & DL models with optimized dataset preprocessing for production scalability.",
                      "Implemented model monitoring and retraining pipelines to maintain high accuracy in production environments."
                    ]
                  },
                  {
                    role: "AI Engineer Trainee",
                    company: "Digital Egypt Pioneers Initiative (DEPI)",
                    period: "Nov 2024 - May 2025",
                    description: [
                      "Hands-on intensive specialization in Artificial Intelligence, Machine Learning, and Data Engineering.",
                      "Developed end-to-end ML solutions using Python, SQL, and interactive dashboards with MLOps principles."
                    ]
                  },
                  {
                    role: "Freelance Data Scientist & AI Consultant",
                    company: "Self-Employed",
                    period: "Jun 2024 - Present",
                    description: [
                      "Architecting custom Generative AI, RAG chatbots, dialectal Arabic NLP systems, and predictive ML models for international clients.",
                      "Automating business workflows and deploying models to cloud/VPS infrastructure."
                    ]
                  },
                  {
                    role: "AI Instructor",
                    company: "4Mind",
                    period: "Feb 2025 – Jul 2025",
                    description: [
                      "Taught core computer science, machine learning algorithms, and AI fundamentals to emerging tech talent."
                    ]
                  }
                ].map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TiltCard3D maxTilt={6} scale={1.01} className="h-full">
                      <div className="glass-card rounded-xl p-6 hover-glow h-full preserve-3d">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 translate-z-10">
                          <div>
                            <h3 className="font-semibold text-foreground text-lg">{job.role}</h3>
                            <p className="text-primary font-medium">{job.company}</p>
                          </div>
                          <span className="text-xs text-muted-foreground mt-2 md:mt-0 bg-secondary/50 px-3 py-1 rounded-full border border-border">
                            {job.period}
                          </span>
                        </div>
                        <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-muted-foreground mt-3 translate-z-5">
                          {job.description.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </TiltCard3D>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Bio & Core Focus */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Bio / Overview */}
              <TiltCard3D maxTilt={5} scale={1.01}>
                <div className="glass-card rounded-2xl p-8 preserve-3d">
                  <div className="flex items-center gap-4 mb-6 translate-z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Core Competencies</h2>
                      <p className="text-primary text-sm font-medium">Applied AI & Data Science</p>
                    </div>
                  </div>
                  <div className="text-muted-foreground leading-relaxed space-y-4 text-sm md:text-base translate-z-5">
                    <p>
                      I specialize in building intelligent software solutions that combine cutting-edge **Generative AI**, **RAG Architecture**, **Dialectal NLP**, and **Predictive Machine Learning**.
                    </p>
                    
                    <h3 className="text-foreground font-semibold text-base mt-4 mb-2">📊 High-Impact Focus Areas:</h3>
                    <ul className="space-y-2">
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">🔹</span>
                        <div>
                          <strong className="text-foreground">GenAI & Agentic Systems:</strong> Multi-document RAG, custom vector indexing, LLM fine-tuning, and task automation.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">🔹</span>
                        <div>
                          <strong className="text-foreground">Dialectal Arabic & Audio Speech AI:</strong> Sentiment analysis tuned for Egyptian Arabic slang, toxicity moderation, and Mel-spectrogram audio classification.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary font-bold">🔹</span>
                        <div>
                          <strong className="text-foreground">Predictive Analytics & MLOps:</strong> Churn prediction, fraud detection, demand forecasting, containerized Docker deployments, and REST API serving.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </TiltCard3D>

              {/* Why Work With Me */}
              <TiltCard3D maxTilt={5} scale={1.01}>
                <div className="glass-card rounded-xl p-6 hover-glow preserve-3d">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 translate-z-10">
                    <Target className="w-6 h-6 text-primary" />
                    Why Work With Me?
                  </h3>
                  <div className="space-y-3 text-sm translate-z-5">
                    <div className="flex gap-3">
                      <span className="text-primary">✔️</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Production-Ready Code:</strong> Modular, reproducible, and containerized AI pipelines.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary">✔️</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">Business ROI Focus:</strong> Models engineered to directly impact metrics and user experience.</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-primary">✔️</span>
                      <p className="text-muted-foreground"><strong className="text-foreground">End-to-End Delivery:</strong> From raw dataset cleaning to VPS/Cloud deployment and API integration.</p>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          </div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Education
            </h2>
            <TiltCard3D maxTilt={5} scale={1.01} className="max-w-3xl mx-auto">
              <div className="glass-card rounded-2xl p-8 flex items-start gap-6 hover-glow preserve-3d">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 translate-z-10">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="translate-z-5">
                  <h3 className="text-xl font-bold text-foreground">MTI University</h3>
                  <p className="text-primary font-medium">Bachelor of Computer Science & Artificial Intelligence</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 font-semibold text-foreground"><Target className="w-4 h-4 text-primary"/> GPA 3.5 / 4.0</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> Oct 2023 - Expected 2027</span>
                    <span className="flex items-center gap-1">📍 Cairo, Egypt</span>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              Tools & <span className="gradient-text">Technologies</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Programming */}
              <TiltCard3D maxTilt={7} scale={1.02} className="h-full">
                <div className="glass-card rounded-2xl p-6 h-full preserve-3d">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2 translate-z-10">
                    <Code2 className="w-5 h-5 text-primary" />
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2 translate-z-5">
                    {skills.programming.map((skill, index) => (
                      <SkillBadge key={skill} name={skill} index={index} />
                    ))}
                  </div>
                </div>
              </TiltCard3D>

              {/* GenAI & NLP */}
              <TiltCard3D maxTilt={7} scale={1.02} className="h-full">
                <div className="glass-card rounded-2xl p-6 h-full preserve-3d">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2 translate-z-10">
                    <Sparkles className="w-5 h-5 text-primary" />
                    GenAI & NLP
                  </h3>
                  <div className="flex flex-wrap gap-2 translate-z-5">
                    {skills.genAiAndNlp.map((skill, index) => (
                      <SkillBadge key={skill} name={skill} index={index} />
                    ))}
                  </div>
                </div>
              </TiltCard3D>

              {/* ML & DL */}
              <TiltCard3D maxTilt={7} scale={1.02} className="h-full">
                <div className="glass-card rounded-2xl p-6 h-full preserve-3d">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2 translate-z-10">
                    <Layers className="w-5 h-5 text-primary" />
                    Machine Learning
                  </h3>
                  <div className="flex flex-wrap gap-2 translate-z-5">
                    {skills.machineLearning.map((skill, index) => (
                      <SkillBadge key={skill} name={skill} index={index} />
                    ))}
                  </div>
                </div>
              </TiltCard3D>

              {/* Data & Ops */}
              <TiltCard3D maxTilt={7} scale={1.02} className="h-full">
                <div className="glass-card rounded-2xl p-6 h-full preserve-3d">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2 translate-z-10">
                    <Terminal className="w-5 h-5 text-primary" />
                    Data & MLOps
                  </h3>
                  <div className="flex flex-wrap gap-2 translate-z-5">
                    {skills.dataAndOps.map((skill, index) => (
                      <SkillBadge key={skill} name={skill} index={index} />
                    ))}
                  </div>
                </div>
              </TiltCard3D>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
