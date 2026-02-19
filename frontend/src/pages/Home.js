import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Instagram, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(`${API}/assessments`);
        setAssessments(response.data);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      }
    };
    fetchAssessments();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/268020/pexels-photo-268020.jpeg"
            alt="Balanced stones representing mental clarity"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart className="w-8 h-8 text-primary" strokeWidth={1.5} />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight">
                One Thought for Therapy
              </h1>
            </div>
            
            <p className="text-lg sm:text-xl text-muted-foreground font-body mb-8 leading-relaxed">
              Take the first step towards understanding your mental wellness.
              Our evidence-based assessments provide insights into your emotional health.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-card px-6 py-4 rounded-full shadow-xl"
            >
              <Instagram className="w-5 h-5 text-secondary" strokeWidth={1.5} />
              <a
                href="https://instagram.com/onethoughtfortherapy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-body font-semibold hover:text-primary transition-colors"
                data-testid="instagram-link"
              >
                @onethoughtfortherapy
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Assessments Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4 tracking-tight">
              Mental Health Screenings
            </h2>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
              Choose from our validated assessment tools. Each takes just a few minutes
              and provides immediate, confidential results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessments.map((assessment, index) => (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/assessment/${assessment.id}`)}
                data-testid={`assessment-card-${assessment.id}`}
              >
                <div className="bg-card rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={assessment.image}
                      alt={assessment.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-6">
                      <span className="text-white/80 text-sm font-body">{assessment.short_name}</span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                      {assessment.name}
                    </h3>
                    <p className="text-muted-foreground font-body mb-4">
                      {assessment.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-body">
                        {assessment.duration}
                      </span>
                      <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                        <span className="font-body font-semibold">Begin</span>
                        <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-muted/50 rounded-2xl p-8 border border-border"
          >
            <h3 className="text-xl font-heading font-bold text-foreground mb-3">
              Important Notice
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              These screenings are for educational purposes only and do not replace professional
              diagnosis or treatment. If you're experiencing a mental health crisis, please contact
              a mental health professional or crisis helpline immediately. Your responses are not
              stored and remain completely confidential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground font-body text-sm">
            © 2024 One Thought for Therapy. Supporting mental wellness, one assessment at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;