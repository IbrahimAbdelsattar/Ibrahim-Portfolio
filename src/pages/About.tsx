import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Target, Code2 } from "lucide-react";
import Layout from "@/components/Layout";
import SkillBadge from "@/components/SkillBadge";

const skills = {
  programming: ["Python", "R", "SQL", "C++", "Java"],
  dataScience: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Generative AI", "LLMs", "RAG", "Statistical Modeling"],
  libraries: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Hugging Face", "OpenCV", "Matplotlib", "Seaborn"],
  tools: ["Git", "GitHub", "Docker", "Azure", "Jupyter", "VS Code", "Power BI", "Streamlit", "Flask"]
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock the Power of Data with a Proven Expert!
            </p>
          </motion.div>

          {/* Overview & Why Work With Me Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Left Column: Work Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
               <h2 className="text-2xl font-bold text-foreground mb-6">Work Experience</h2>
               <div className="space-y-6">
                 {[
                   {
                     role: "Machine Learning Instructor",
                     company: "Minders",
                     period: "Nov 2025 - Present",
                     description: [
                       "Explain AI concepts, including machine learning and deep learning, while assigning practical tasks to enhance hands-on learning.",
                       "Review and provide feedback on students' work, ensuring their understanding and skill development in AI applications."
                     ]
                   },
                   {
                     role: "AI Engineer Intern",
                     company: "HAMS.AI",
                     period: "Sep 2025 - Nov 2025",
                     description: [
                       "Designed, trained, and fine-tuned ML/DL models, including dataset preprocessing, optimization for scalability, and deployment in production environments.",
                       "Conducted continuous monitoring and retraining to improve model accuracy, ensuring efficient and reliable AI solutions."
                     ]
                   },
                   {
                     role: "AI Engineer Intern",
                     company: "Digital Egypt Pioneers Initiative (DEPI)",
                     period: "Nov 2024 - Present (Expected May 2025)",
                     description: [
                        "Engaged in comprehensive hands-on training in Data Science, Artificial Intelligence, and Machine Learning methodologies.",
                        "Led the development of end-to-end machine learning projects using Python, SQL, and advanced data visualization tools.",
                        "Applied machine learning algorithms to address complex real-world problems, presenting insights through interactive dashboards.",
                        "Gained proficiency in prompt engineering for AI models, while exploring deployment techniques utilizing MLOps tools."
                     ]
                   },
                   {
                     role: "Freelance Data Scientist",
                     company: "Self-Employed",
                     period: "Jun 2024 - Present",
                     description: [
                        "Developed and deployed machine learning models to extract actionable business insights.",
                        "Conducted data analysis, cleaning, and visualization to support decision-making.",
                        "Automated workflows and optimized processes for efficiency.",
                        "Collaborated with clients to tailor AI solutions to their business needs."
                     ]
                   },
                   {
                     role: "AI Instructor",
                     company: "4Mind",
                     period: "Feb 2025 – Jul 2025",
                     description: [
                       "Explain AI concepts, including machine learning and deep learning, while assigning practical tasks to enhance hands-on learning.",
                       "Review and provide feedback on students' work, ensuring their understanding and skill development in AI applications."
                     ]
                   }
                 ].map((job, index) => (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: index * 0.1 }}
                     className="glass-card rounded-xl p-6 hover-glow"
                   >
                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <div>
                           <h3 className="font-semibold text-foreground text-lg">{job.role}</h3>
                           <p className="text-primary">{job.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground mt-2 md:mt-0 bg-secondary/50 px-3 py-1 rounded-full border border-border">{job.period}</span>
                     </div>
                     <ul className="list-disc list-outside pl-5 space-y-1 text-sm text-muted-foreground mt-3">
                        {job.description.map((point, i) => (
                           <li key={i}>{point}</li>
                        ))}
                     </ul>
                   </motion.div>
                 ))}
               </div>
            </motion.div>

            {/* Right Column: Bio & Why Work With Me */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Bio / Overview */}
              <div className="glass-card rounded-2xl p-8">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                   <Briefcase className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                   <h2 className="text-xl font-semibold text-foreground">Ibrahim Abdelsattar</h2>
                   <p className="text-primary">Data Scientist & AI Specialist</p>
                 </div>
               </div>
               <div className="text-muted-foreground leading-relaxed space-y-4">
                 <p>
                   Hi there! I’m Ibrahim Abdelsattar, a Data Scientist & AI Specialist passionate about transforming raw data into actionable insights that drive business success. Whether you need predictive analytics, machine learning models, or automated solutions, I’m here to help you make data-driven decisions with confidence.
                 </p>
                 
                 <h3 className="text-foreground font-semibold text-lg mt-6 mb-2">📊 My Expertise:</h3>
                 <ul className="space-y-3">
                   <li>
                     <strong className="text-primary">🔹 GenAI & NLP Solutions</strong>
                     <ul className="list-disc list-inside pl-4 mt-1 text-sm">
                        <li>Building RAG pipelines & Chatbots (LLMs, LangChain)</li>
                        <li>Sentiment Analysis & Text Classification (BERT, Transformers)</li>
                        <li>Speech-to-Text & Audio Processing Systems</li>
                     </ul>
                   </li>
                   <li>
                     <strong className="text-primary">🔹 Advanced Machine Learning & Computer Vision</strong>
                     <ul className="list-disc list-inside pl-4 mt-1 text-sm">
                        <li>Predictive Modeling & Recommendation Systems</li>
                        <li>Image Classification & Object Detection</li>
                        <li>End-to-end Model Training, Tuning & Evaluation</li>
                     </ul>
                   </li>
                   <li>
                     <strong className="text-primary">🔹 Data Strategy & MLOps</strong>
                     <ul className="list-disc list-inside pl-4 mt-1 text-sm">
                        <li>Data Cleaning, EDA & Visualization (Power BI, Plotly)</li>
                        <li>Model Deployment & serving (Flask, Streamlit, Cloud)</li>
                        <li>Scalable Pipeline Design & Workflow Automation</li>
                     </ul>
                   </li>
                 </ul>
               </div>
               
             </div>

              {/* Why Work With Me */}
              <div className="glass-card rounded-xl p-6 hover-glow mb-8">
                 <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    Why Work With Me?
                 </h3>
                 <div className="space-y-3">
                    <div className="flex gap-3">
                       <span className="text-primary mt-1">✔️</span>
                       <p className="text-muted-foreground"><strong className="text-foreground">Precision & Accuracy</strong> – Your data will be handled with the utmost expertise</p>
                    </div>
                    <div className="flex gap-3">
                       <span className="text-primary mt-1">✔️</span>
                       <p className="text-muted-foreground"><strong className="text-foreground">Business-Driven Approach</strong> – My models don’t just work; they drive real results</p>
                    </div>
                    <div className="flex gap-3">
                       <span className="text-primary mt-1">✔️</span>
                       <p className="text-muted-foreground"><strong className="text-foreground">Clear Communication</strong> – Regular updates to keep your project on track</p>
                    </div>
                    <div className="flex gap-3">
                       <span className="text-primary mt-1">✔️</span>
                       <p className="text-muted-foreground"><strong className="text-foreground">Fast & Reliable</strong> – Delivering quality insights with quick turnaround times</p>
                    </div>
                 </div>
               <div className="mt-8 border-t border-border pt-6">
                  <p className="text-foreground font-medium mb-4">Let’s harness the power of your data and take your business to the next level! 🚀</p>
                  <a href="/contact" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-semibold">
                     Send me a message today <Target className="w-4 h-4 ml-2"/>
                  </a>
               </div>
              </div>
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
            <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto flex items-start gap-6 hover-glow">
               <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-8 h-8 text-primary" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-foreground">MTI University</h3>
                  <p className="text-primary font-medium">Bachelor Computer and Artificial Intelligence</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                     <span className="flex items-center gap-1"><Target className="w-4 h-4"/> GPA 3.5</span>
                     <span className="flex items-center gap-1"><Briefcase className="w-4 h-4"/> Oct 2023 - Expected 2027</span>
                     <span className="flex items-center gap-1">📍 Cairo, El Moqattam</span>
                  </div>
               </div>
            </div>
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
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Programming
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.programming.map((skill, index) => (
                    <SkillBadge key={skill} name={skill} index={index} />
                  ))}
                </div>
              </div>

               {/* Data Science */}
               <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Data Science
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.dataScience.map((skill, index) => (
                    <SkillBadge key={skill} name={skill} index={index} />
                  ))}
                </div>
              </div>

              {/* Libraries */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Libraries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.libraries.map((skill, index) => (
                    <SkillBadge key={skill} name={skill} index={index} />
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Business Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.tools.map((skill, index) => (
                    <SkillBadge key={skill} name={skill} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
