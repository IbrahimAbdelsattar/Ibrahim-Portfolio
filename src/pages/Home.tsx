
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { projects } from "@/data";
import profileImg from "@/assets/profile-main.jpg";

const Home = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Subtle hero parallax (background drifts slower than scroll)
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const heroFade = useTransform(heroProgress, [0, 0.85], [1, reduceMotion ? 1 : 0.25]);

  // Filter 3 featured projects (prioritizing pinned flagship projects)
  const featuredProjects = projects.filter((p) => p.isPinned).slice(0, 3);
  if (featuredProjects.length < 3) {
    const others = projects.filter((p) => !featuredProjects.includes(p)).slice(0, 3 - featuredProjects.length);
    featuredProjects.push(...others);
  }

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
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
      <section ref={heroRef} className="relative min-h-[92dvh] sm:min-h-[90vh] flex items-center pt-24 pb-10 sm:pt-20 sm:pb-0 overflow-x-clip">
        <motion.div style={{ y: heroBgY }} className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div style={{ opacity: heroFade }} className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Mobile profile image — compact, shown first on small screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:hidden flex justify-center order-first"
            >
              <div className="relative w-40 h-40 sm:w-52 sm:h-52">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full blur-[40px]" />
                <img
                  src={profileImg}
                  alt="Ibrahim Abdelsattar"
                  loading="eager"
                  decoding="async"
                  className="relative z-10 w-full h-full object-cover rounded-full border-2 border-primary/30 shadow-2xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-primary mb-3 sm:mb-4">
                Hi, I'm Ibrahim Abdelsattar
              </h2>
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium mb-4 sm:mb-6 text-sm sm:text-base">
                  AI & Data Scientist
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-[1.15] sm:leading-tight text-balance">
                Turning Data into <br className="hidden sm:block" />
                <span className="gradient-text">Intelligent Solutions</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                I build advanced AI systems, from predictive models to LLM-powered applications, helping businesses unlock the true potential of their data.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/projects" className="w-full sm:w-auto">
                  <Button size="lg" className="rounded-full h-12 px-8 text-base w-full sm:w-auto min-h-[48px]">
                    View Work <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a href="/Ibrahim Abdelsattar Data Scientist resume.pdf" download="Ibrahim Abdelsattar Data Scientist resume" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base w-full sm:w-auto min-h-[48px]">
                    Download CV <Download className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>

              {/* Social actions — visible on mobile too, centered */}
              <div className="flex gap-2 mt-8 justify-center lg:justify-start lg:mt-12 opacity-80 hover:opacity-100 transition-opacity">
                  <a href="https://github.com/IbrahimAbdelsattar" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-primary/10 rounded-full transition-colors">
                     <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/ibrahim-abdelsattar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-primary/10 rounded-full transition-colors">
                     <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="mailto:ibrahimabdelsattar042@gmail.com" aria-label="Email" className="p-3 min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-primary/10 rounded-full transition-colors">
                     <Mail className="w-6 h-6" />
                  </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:flex justify-center"
            >
              <div className="relative w-full max-w-[420px] mx-auto">
                <TiltCard3D maxTilt={16} scale={1.03} glare={false} className="w-full">
                  <div className="relative w-full aspect-square preserve-3d">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full blur-[80px] animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-bl from-primary/30 to-secondary/30 rounded-full blur-[100px] animate-pulse delay-75" />
                    <div className="absolute -inset-4 bg-primary/20 rounded-full blur-[60px] animate-pulse [animation-duration:3000ms]" />
                    <img 
                      src={profileImg} 
                      alt="Ibrahim Abdelsattar" 
                      loading="eager"
                      decoding="async"
                      className="relative z-10 w-full aspect-square object-cover rounded-full border-2 border-primary/30 shadow-2xl translate-z-20"
                    />
                    
                    {/* Floating Achievement Cards with true 3D spatial depth */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -left-8 top-20 glass-card p-4 rounded-2xl z-30 translate-z-40 shadow-2xl"
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
                        className="absolute -right-8 bottom-32 glass-card p-4 rounded-2xl z-30 translate-z-50 shadow-2xl"
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
                </TiltCard3D>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Strip (Marquee) */}
      <section className="py-8 sm:py-10 border-y border-white/10 dark:border-white/10 bg-card/20 backdrop-blur-xl overflow-x-clip">
         <div className="flex overflow-hidden relative w-full">
             <motion.div 
                className="flex gap-10 sm:gap-16 items-center whitespace-nowrap will-change-transform"
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
                        <img src={tech.logo} alt={tech.name} loading="lazy" decoding="async" className="h-8 sm:h-12 w-auto object-contain" />
                    </div>
                ))}
             </motion.div>
         </div>
      </section>

      {/* About Preview */}
      <section className="py-12 sm:py-20 bg-background relative">
          <div className="container mx-auto px-4 lg:px-8">
              <Reveal className="max-w-3xl mx-auto text-center">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Who I Am</h2>
                  <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                      I am a passionate <span className="text-primary font-semibold">AI & Data Science Engineer</span> dedicated to bridging the gap between complex data and actionable insights. With a strong foundation in machine learning, deep learning, and NLP, I create scalable solutions that solve real-world problems. My experience spans across finance, healthcare, and retail analytics, where I've helped organizations optimize their operations through intelligent automation.
                  </p>
                  <Link to="/about">
                      <Button variant="secondary" className="rounded-full">
                          Read More About Me <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                  </Link>
              </Reveal>
          </div>
      </section>

      {/* Skills Snapshot */}
      <section className="py-12 sm:py-20 bg-secondary/5 overflow-x-clip">
        <div className="container mx-auto px-4 lg:px-8">
          <Reveal className="text-center mb-10 sm:mb-16">
             <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">My <span className="gradient-text">Expertise</span></h2>
             <p className="text-sm sm:text-base text-muted-foreground">Core technical skills and areas of specialization</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                >
                    <TiltCard3D maxTilt={14} scale={1.03} className="h-full rounded-2xl">
                      <div className="p-5 sm:p-6 h-full rounded-2xl glass-card hover-glow transition-all group flex flex-col justify-between preserve-3d">
                        <div>
                          <div className="mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300 translate-z-30">
                              {skill.icon}
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2 translate-z-20">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground translate-z-10">{skill.desc}</p>
                        </div>
                      </div>
                    </TiltCard3D>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 sm:py-20 bg-background overflow-x-clip">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 sm:mb-12">
                <Reveal>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-4">Featured <span className="gradient-text">Projects</span></h2>
                    <p className="text-sm sm:text-base text-muted-foreground">A selection of my recent AI and Data Science work</p>
                </Reveal>
                <Link to="/projects" className="hidden md:block shrink-0">
                    <Button variant="ghost" className="group min-h-[44px]">
                        View All Projects <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                {featuredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.title}
                        {...project}
                        index={index}
                        onLiveClick={() => handleProjectClick(project)}
                    />
                ))}
            </div>

            <div className="mt-8 sm:mt-12 text-center md:hidden">
                <Link to="/projects" className="block">
                    <Button variant="outline" className="w-full min-h-[48px]">View All Projects</Button>
                </Link>
            </div>
        </div>
      </section>

      {/* Achievements / Impact */}
      <section className="py-12 sm:py-20 border-y border-white/10 dark:border-white/10 bg-card/30 backdrop-blur-xl">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:divide-x divide-primary/20 divide-y sm:divide-y-0">
                  {stats.map((stat, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="py-4 sm:py-6 md:py-0 first:pt-0 last:pb-0 sm:py-0"
                      >
                          <div className="text-4xl sm:text-5xl font-bold gradient-text mb-1.5 sm:mb-2">{stat.value}</div>
                          <div className="text-base sm:text-lg text-muted-foreground font-medium">{stat.label}</div>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 bg-background overflow-x-clip">
          <div className="container mx-auto px-4 lg:px-8">
              <Reveal className="text-center mb-10 sm:mb-16">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What People Say</h2>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
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
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="h-full"
                    >
                      <TiltCard3D maxTilt={10} scale={1.02} className="h-full rounded-3xl">
                        <div className="p-6 sm:p-8 h-full rounded-3xl glass-card hover-glow relative flex flex-col justify-between preserve-3d">
                          <div className="text-4xl text-primary/20 absolute top-4 left-4 pointer-events-none">"</div>
                          <p className="text-sm sm:text-base italic mb-6 relative z-10 text-muted-foreground flex-grow translate-z-10 leading-relaxed">
                            "{testimonial.text}"
                          </p>
                          <div className="flex items-center gap-4 mt-auto translate-z-20">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold shrink-0 shadow-md`}>
                              {testimonial.initials}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{testimonial.name}</p>
                              <p className="text-xs text-muted-foreground line-clamp-1" title={testimonial.role}>{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </TiltCard3D>
                    </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-20 overflow-x-clip">
          <div className="container mx-auto px-4 lg:px-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="card-premium rounded-3xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden border border-white/15 dark:border-white/15"
              >
                  <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,white,transparent)]" />
                  <div className="relative z-10">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-balance">Ready to bring your ideas to life?</h2>
                      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                          Whether you need a custom AI model, data analysis, or a full-stack automated solution, I'm here to help.
                      </p>
                      <Link to="/contact" className="inline-block w-full sm:w-auto">
                          <Button size="lg" className="rounded-full px-8 sm:px-12 h-12 sm:h-14 text-base sm:text-lg w-full sm:w-auto min-h-[48px] shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow">
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
