
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Brain, 
  Cpu, 
  BarChart, 
  Bot,
  LineChart,
  MessageSquareText
} from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projects } from "@/data";
import profileImg from "@/assets/profile-main.jpg";

const Home = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter 3 featured projects
  const featuredProjects = projects.filter(p => 
    p.title.includes("Job Recommendation") || 
    p.title.includes("Arabic Egyptian Sentiment Analysis") || 
    p.title.includes("MR NLP Robust RAG Chatbot")
  ).slice(0, 3);
  
  // If we don't have enough specific ones, fill with others (fallback)
  if (featuredProjects.length < 3) {
      const others = projects.filter(p => !featuredProjects.includes(p)).slice(0, 3 - featuredProjects.length);
      featuredProjects.push(...others);
  }

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stats = [
    { label: "AI Projects", value: "25+" },
    { label: "Industries", value: "5+" },
    { label: "Deployment", value: "100%" },
  ];

  const skills = [
    { name: "Data Analysis", icon: <BarChart className="w-8 h-8 text-green-400" />, desc: "Insights & Visualization" },
    { name: "Data Science", icon: <LineChart className="w-8 h-8 text-blue-400" />, desc: "Statistical Analysis & Mining" },
    { name: "Machine Learning", icon: <Brain className="w-8 h-8 text-primary" />, desc: "Predictive Models & Algorithms" },
    { name: "Deep Learning", icon: <Cpu className="w-8 h-8 text-secondary" />, desc: "Neural Networks & TF/PyTorch" },
    { name: "NLP", icon: <MessageSquareText className="w-8 h-8 text-accent" />, desc: "Text Analysis & LLMs" },
    { name: "AI System", icon: <Bot className="w-8 h-8 text-purple-400" />, desc: "End-to-End AI Solutions" },
  ];

  const techStack = [
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
    { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "NumPy", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "Matplotlib", logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg" },
    { name: "Seaborn", logo: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg" },
    { name: "Scikit-Learn", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
    { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Streamlit", logo: "https://streamlit.io/images/brand/streamlit-mark-color.png" },
    { name: "Hugging Face", logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
    { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-medium text-primary mb-4">
                Hi, I'm Ibrahim Abdelsattar
              </h2>
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium mb-6">
                 AI & Data Scientist
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Turning Data into <br />
                <span className="gradient-text">Intelligent Solutions</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                I build advanced AI systems, from predictive models to LLM-powered applications, helping businesses unlock the true potential of their data.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/projects">
                  <Button size="lg" className="rounded-full h-12 px-8 text-base">
                    View Work <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a href="/Ibrahim Abdelsattar Data Scientist resume.pdf" download="Ibrahim Abdelsattar Data Scientist resume">
                  <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base">
                    Download CV <Download className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>

              {/* Floating Quick Actions (Desktop) */}
              <div className="hidden lg:flex gap-4 mt-12 opacity-70 hover:opacity-100 transition-opacity">
                 <a href="https://github.com/IbrahimAbdelsattar" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <Github className="w-6 h-6" />
                 </a>
                 <a href="https://linkedin.com/in/ibrahim-abdelsattar" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <Linkedin className="w-6 h-6" />
                 </a>
                 <a href="mailto:ibrahimabdelsattar042@gmail.com" className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <Mail className="w-6 h-6" />
                 </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block flex justify-center"
            >
              <div className="relative w-full max-w-[400px] mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full blur-[80px] animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-bl from-primary/30 to-secondary/30 rounded-full blur-[100px] animate-pulse delay-75" />
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-[60px] animate-pulse [animation-duration:3000ms]" />
                <img 
                  src={profileImg} 
                  alt="Ibrahim Abdelsattar" 
                  className="relative z-10 w-full aspect-square object-cover rounded-full border-2 border-primary/20 shadow-2xl"
                />
                
                {/* Floating Achievement Cards */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -left-8 top-20 glass-card p-4 rounded-2xl z-20"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/15 border border-primary/25 rounded-xl text-primary backdrop-blur-md">
                            <Brain className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">AI Solutions</p>
                            <p className="text-xs text-muted-foreground">Certified Expert</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -right-8 bottom-32 glass-card p-4 rounded-2xl z-20"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-secondary/20 border border-secondary/30 rounded-xl text-secondary backdrop-blur-md">
                            <BarChart className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Data Driven</p>
                            <p className="text-xs text-muted-foreground">Detailed Analysis</p>
                        </div>
                    </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Strip (Marquee) */}
      <section className="py-10 border-y border-white/10 dark:border-white/10 bg-card/20 backdrop-blur-xl overflow-hidden">
         <div className="flex overflow-hidden relative w-full">
             <motion.div 
                className="flex gap-16 items-center whitespace-nowrap will-change-transform"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: 30 
                }}
             >
                {[...techStack, ...techStack].map((tech, index) => (
                    <div 
                        key={`${tech.name}-${index}`} 
                        className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 shrink-0"
                        title={tech.name}
                    >
                        <img src={tech.logo} alt={tech.name} className="h-12 w-auto object-contain" />
                    </div>
                ))}
             </motion.div>
         </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-background relative">
          <div className="container mx-auto px-4 lg:px-8">
              <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6">Who I Am</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      I am a passionate <span className="text-primary font-semibold">AI & Data Science Engineer</span> dedicated to bridging the gap between complex data and actionable insights. With a strong foundation in machine learning, deep learning, and NLP, I create scalable solutions that solve real-world problems. My experience spans across finance, healthcare, and retail analytics, where I've helped organizations optimize their operations through intelligent automation.
                  </p>
                  <Link to="/about">
                      <Button variant="secondary" className="rounded-full">
                          Read More About Me <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                  </Link>
              </motion.div>
          </div>
      </section>

      {/* Skills Snapshot */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-4">My <span className="gradient-text">Expertise</span></h2>
             <p className="text-muted-foreground">Core technical skills and areas of specialization</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl glass-card hover-glow transition-all group"
                >
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground">{skill.desc}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex justify-between items-end mb-12">
                <motion.div {...fadeInUp}>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="gradient-text">Projects</span></h2>
                    <p className="text-muted-foreground">A selection of my recent AI and Data Science work</p>
                </motion.div>
                <Link to="/projects" className="hidden md:block">
                    <Button variant="ghost" className="group">
                        View All Projects <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        {...project}
                        index={index}
                        onLiveClick={() => handleProjectClick(project)}
                    />
                ))}
            </div>

            <div className="mt-12 text-center md:hidden">
                <Link to="/projects">
                    <Button variant="outline" className="w-full">View All Projects</Button>
                </Link>
            </div>
        </div>
      </section>

      {/* Achievements / Impact */}
      <section className="py-20 border-y border-white/10 dark:border-white/10 bg-card/30 backdrop-blur-xl">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary/20">
                  {stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="py-6 md:py-0"
                      >
                          <div className="text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                          <div className="text-lg text-muted-foreground font-medium">{stat.label}</div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
              <motion.div {...fadeInUp} className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">What People Say</h2>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      name: "Abdullah Wagih",
                      role: "Data Scientist",
                      text: "Ibrahim was a student in my AI and Machine Learning course, and his dedication and passion for the subject were evident from the start. He consistently went above and beyond the course requirements, demonstrating a strong grasp of complex concepts. Ibrahim's final project was a great example of his skills... I'm confident that his talent and work ethic will make him a valuable asset to any team.",
                      initials: "AW",
                      color: "from-blue-400 to-blue-600"
                    },
                    {
                      name: "Mohamed Osama",
                      role: "Co-Founder & CTO | PoC Solutions",
                      text: "I had the privilege of being Ibrahim’s instructor during the NLP scholarship. He showed excellent knowledge of NLP, strong commitment, and great teamwork skills. Ibrahim was always reliable, proactive, and added real value to the project. I highly recommend him for any opportunity in AI and NLP.",
                      initials: "MO",
                      color: "from-purple-400 to-purple-600"
                    },
                    {
                      name: "Ali Ehab",
                      role: "Data Scientist | ML Engineer",
                      text: "I spent the better part of a year working with Ibrahim Abdelsattar on various Projects, starting from Data Analysis to LLMs projects. A hardworking Data scientist who seeks innovation and always eager to learn and adapt to new techniques of AI.",
                      initials: "AE",
                      color: "from-green-400 to-green-600"
                    }
                  ].map((testimonial, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-8 rounded-3xl glass-card hover-glow relative flex flex-col"
                    >
                        <div className="text-4xl text-primary/20 absolute top-4 left-4">"</div>
                        <p className="text-base italic mb-6 relative z-10 text-muted-foreground flex-grow">
                            "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold shrink-0`}>
                              {testimonial.initials}
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{testimonial.name}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1" title={testimonial.role}>{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="card-premium rounded-3xl p-12 text-center relative overflow-hidden border border-white/15 dark:border-white/15"
              >
                  <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,white,transparent)]" />
                  <div className="relative z-10">
                      <h2 className="text-4xl font-bold mb-6">Ready to bring your ideas to life?</h2>
                      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                          Whether you need a custom AI model, data analysis, or a full-stack automated solution, I'm here to help.
                      </p>
                      <Link to="/contact">
                          <Button size="lg" className="rounded-full px-12 h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                              Let's Work Together <Mail className="ml-2 w-5 h-5" />
                          </Button>
                      </Link>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* Floating Quick Actions (Mobile) -> Usually handled by floating buttons or footer in mobile layout. 
          The user requested "Floating Quick-Action Buttons". 
          I already added them in the Hero for desktop. 
          For mobile, they might want a fixed floating bar? 
          Or just ensuring they are accessible. 
          I have added them to Hero for now.
      */}
      
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </Layout>
  );
};

export default Home;
