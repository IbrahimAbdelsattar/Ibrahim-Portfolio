import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { TiltCard3D } from "@/components/3d/TiltCard3D";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ----------------------------------------------------------------------
  // 🟢 STEP 1: Replace these with your Google Form details
  // ----------------------------------------------------------------------
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdxhyEHNGsVK5Czr7yWt4QvY6eBjAWR9Y02JM13l3T7vnbLTw/formResponse";
  
  const FORM_ENTRY_IDS = {
    name: "entry.1884265043",    // Name field
    email: "entry.1212348438",   // Email field
    message: "entry.813454657",  // Message field
  };
  // ----------------------------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formBody = new FormData();
      formBody.append(FORM_ENTRY_IDS.name, formData.name);
      formBody.append(FORM_ENTRY_IDS.email, formData.email);
      formBody.append(FORM_ENTRY_IDS.message, formData.message);

      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors", 
        body: formBody,
      });

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ibrahimabdelsattar042@gmail.com",
      href: "mailto:ibrahimabdelsattar042@gmail.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/IbrahimAbdelsattar",
      href: "https://github.com/IbrahimAbdelsattar",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/ibrahim",
      href: "https://www.linkedin.com/in/ibrahim-abdelsattar/",
    }
  ];

  return (
    <Layout>
      <section className="py-12 sm:py-20 overflow-x-clip">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TiltCard3D maxTilt={4} scale={1.01} glare={false}>
                <div className="glass-card rounded-2xl p-5 sm:p-8 preserve-3d">
                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-5 sm:mb-6 translate-z-10">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 translate-z-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="glass-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="glass-input"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="glass-input resize-none"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      variant="hero" 
                      size="lg" 
                      className="w-full min-h-[52px] text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </TiltCard3D>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <TiltCard3D maxTilt={5} scale={1.01}>
                <div className="glass-card rounded-2xl p-5 sm:p-8 preserve-3d">
                  <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-5 sm:mb-6 translate-z-10">Contact Information</h2>
                  <div className="space-y-4 translate-z-5">
                    {contactInfo.map((item, index) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-2xl glass-card hover-glow group min-h-[72px]"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm text-muted-foreground">{item.label}</div>
                          <div className="font-medium text-foreground text-sm sm:text-base truncate">{item.value}</div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </TiltCard3D>

              {/* Location Card */}
              <TiltCard3D maxTilt={5} scale={1.01}>
                <div className="glass-card rounded-2xl p-5 sm:p-8 preserve-3d">
                  <div className="flex items-center gap-4 mb-4 translate-z-10">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-medium text-foreground">Egypt</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm translate-z-5">
                    Available for remote work and collaborations worldwide.
                  </p>
                </div>
              </TiltCard3D>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
