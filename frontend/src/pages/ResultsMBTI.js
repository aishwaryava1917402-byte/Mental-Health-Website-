import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Home, Instagram, RefreshCcw, Heart } from "lucide-react";

const ResultsMBTI = () => {
  const { assessmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!location.state || !location.state.answers) {
      navigate("/");
      return;
    }

    const { answers, assessment } = location.state;
    
    // Calculate MBTI type
    const dimensions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    assessment.questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        dimensions[answer]++;
      }
    });

    const type = 
      (dimensions.E >= dimensions.I ? 'E' : 'I') +
      (dimensions.S >= dimensions.N ? 'S' : 'N') +
      (dimensions.T >= dimensions.F ? 'T' : 'F') +
      (dimensions.J >= dimensions.P ? 'J' : 'P');

    const typeData = assessment.types[type];
    
    setResult({ type, typeData, assessmentName: assessment.name });
  }, [location, navigate]);

  if (!result) {
    return (
      <div className=\"min-h-screen flex items-center justify-center\">
        <div className=\"text-center\">
          <div className=\"w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4\"></div>
          <p className=\"text-muted-foreground font-body\">Calculating your personality type...</p>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: \"easeOut\" }
  };

  return (
    <div className=\"min-h-screen py-12 px-6\">
      <div className=\"max-w-4xl mx-auto\">
        {/* Header */}
        <motion.div
          initial=\"initial\"
          animate=\"animate\"
          variants={fadeInUp}
          className=\"text-center mb-12\"
        >
          <div className=\"inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6\">
            <Heart className=\"w-10 h-10 text-primary\" strokeWidth={1.5} />
          </div>
          <h1 className=\"text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3\">
            Your Personality Type
          </h1>
          <p className=\"text-muted-foreground font-body\">{result.assessmentName}</p>
        </motion.div>

        {/* Type Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className=\"bg-card rounded-3xl p-8 sm:p-12 shadow-xl mb-8\"
          data-testid=\"results-card\"
        >
          <div className=\"text-center mb-8\">
            <div
              className=\"inline-flex items-center justify-center mb-6\"
            >
              <h2 className=\"text-6xl font-heading font-bold text-primary tracking-wider\"
                  data-testid=\"personality-type\">
                {result.type}
              </h2>
            </div>
            <h3 className=\"text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2\">
              {result.typeData.name}
            </h3>
          </div>

          <div className=\"space-y-6\">
            <div>
              <h4 className=\"text-lg font-heading font-bold text-foreground mb-3\">
                About Your Type
              </h4>
              <p className=\"text-muted-foreground font-body leading-relaxed\" data-testid=\"type-description\">
                {result.typeData.description}
              </p>
            </div>

            <div className=\"border-t border-border pt-6\">
              <h4 className=\"text-lg font-heading font-bold text-foreground mb-3\">
                Key Strengths
              </h4>
              <p className=\"text-muted-foreground font-body leading-relaxed\">
                {result.typeData.strengths}
              </p>
            </div>

            <div className=\"border-t border-border pt-6\">
              <h4 className=\"text-lg font-heading font-bold text-foreground mb-3\">
                Understanding MBTI Dimensions
              </h4>
              <ul className=\"space-y-2 text-muted-foreground font-body\">
                <li className=\"flex items-start gap-2\">
                  <span className=\"text-primary mt-1\">•</span>
                  <span><strong>{result.type[0]}:</strong> {result.type[0] === 'E' ? 'Extraversion - Energized by social interaction' : 'Introversion - Energized by solitude'}</span>
                </li>
                <li className=\"flex items-start gap-2\">
                  <span className=\"text-primary mt-1\">•</span>
                  <span><strong>{result.type[1]}:</strong> {result.type[1] === 'S' ? 'Sensing - Focus on facts and details' : 'Intuition - Focus on patterns and possibilities'}</span>
                </li>
                <li className=\"flex items-start gap-2\">
                  <span className=\"text-primary mt-1\">•</span>
                  <span><strong>{result.type[2]}:</strong> {result.type[2] === 'T' ? 'Thinking - Make decisions based on logic' : 'Feeling - Make decisions based on values'}</span>
                </li>
                <li className=\"flex items-start gap-2\">
                  <span className=\"text-primary mt-1\">•</span>
                  <span><strong>{result.type[3]}:</strong> {result.type[3] === 'J' ? 'Judging - Prefer structure and planning' : 'Perceiving - Prefer flexibility and spontaneity'}</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className=\"flex flex-col sm:flex-row gap-4\"
        >
          <button
            onClick={() => navigate(\"/\")}
            className=\"flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all\"
            data-testid=\"home-button\"
          >
            <Home className=\"w-5 h-5\" strokeWidth={1.5} />
            Back to Home
          </button>
          
          <button
            onClick={() => navigate(`/assessment/${assessmentId}`)}
            className=\"flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-card border-2 border-border text-foreground rounded-full font-body font-semibold hover:border-primary hover:bg-primary/5 transition-all\"
            data-testid=\"retake-button\"
          >
            <RefreshCcw className=\"w-5 h-5\" strokeWidth={1.5} />
            Retake Test
          </button>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className=\"mt-12 text-center\"
        >
          <p className=\"text-muted-foreground font-body mb-4\">
            Follow us for more mental health insights and support
          </p>
          <a
            href=\"https://www.instagram.com/onethoughtformentalhealth?igsh=bzRnd3podWZiMnpj\"
            target=\"_blank\"
            rel=\"noopener noreferrer\"
            className=\"inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all\"
            data-testid=\"instagram-cta-button\"
          >
            <Instagram className=\"w-5 h-5\" strokeWidth={1.5} />
            Follow @onethoughtformentalhealth
          </a>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className=\"mt-12 bg-muted/30 rounded-2xl p-6 text-center\"
        >
          <p className=\"text-sm text-muted-foreground font-body\">
            This is a simplified MBTI assessment for self-discovery and entertainment purposes. 
            For a comprehensive personality analysis, consider taking the official MBTI test with a certified practitioner.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsMBTI;
