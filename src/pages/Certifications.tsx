import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import CertificationCard from "@/components/CertificationCard";
import CertificationModal from "@/components/CertificationModal";

import { certifications } from "@/data";

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertClick = (cert: typeof certifications[0]) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
              My <span className="gradient-text">Certifications</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and courses that have enhanced my expertise 
              in AI, machine learning, and data science
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard 
                key={cert.title} 
                {...cert} 
                index={index} 
                onClick={() => handleCertClick(cert)}
              />
            ))}
          </div>

          <CertificationModal 
            certification={selectedCert}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Certifications;
