import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Home, Instagram, RefreshCcw, Heart } from "lucide-react";

const Results = () => {
  const { assessmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [showFullResults, setShowFullResults] = useState(false);

  useEffect(() => {
    if (!location.state || !location.state.score) {
      navigate("/");
      return;
    }

    const { score, assessment } = location.state;
    const interpretation = getInterpretation(score, assessment.interpretation);
    setResult({ score, interpretation, assessmentName: assessment.name });
  }, [location, navigate]);

  const getInterpretation = (score, interpretationData) => {
    for (const [range, data] of Object.entries(interpretationData)) {
      const [min, max] = range.split("-").map(Number);
      if (score >= min && score <= max) {
        return data;
      }
    }
    return interpretationData[Object.keys(interpretationData)[0]];
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-body">Calculating results...</p>
        </div>
      </div>
    );
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
            Your Results
          </h1>
          <p className="text-muted-foreground font-body">{result.assessmentName}</p>
        </motion.div>

        {/* Score Card - Step 1: Basic Results */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card rounded-3xl p-8 sm:p-12 shadow-xl mb-8"
          data-testid="results-card"
        >
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-6"
              style={{ backgroundColor: `${result.interpretation.color}20` }}
            >
              <span
                className="text-5xl font-heading font-bold"
                style={{ color: result.interpretation.color }}
                data-testid="score-value"
              >
                {result.score}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-heading font-bold mb-2"
              style={{ color: result.interpretation.color }}
              data-testid="severity-level"
            >
              {result.interpretation.level}
            </h2>
          </div>

          {!showFullResults ? (
            /* Instagram Follow Gate */
            <div className="text-center space-y-6 py-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                  <Instagram className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                  Want Your Detailed Analysis?
                </h3>
                <p className="text-muted-foreground font-body max-w-md mx-auto leading-relaxed">
                  Follow us on Instagram for daily mental health tips and support, then unlock your complete results with personalized recommendations!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/onethoughtformentalhealth?igsh=bzRnd3podWZiMnpj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-body font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <Instagram className="w-5 h-5" strokeWidth={1.5} />
                  Follow @onethoughtformentalhealth
                </a>

                <div className="pt-4">
                  <button
                    onClick={() => setShowFullResults(true)}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                  >
                    I've Followed - Show Full Results
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground font-body mt-6">
                By clicking above, you confirm you've followed our Instagram page
              </p>
            </div>
          ) : (
            /* Full Detailed Results */
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  What This Means
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed" data-testid="interpretation-text">
                  {result.interpretation.description}
                </p>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  Next Steps
                </h3>
                <ul className="space-y-2 text-muted-foreground font-body">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Share these results with a mental health professional if needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Consider taking other assessments to get a fuller picture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Reach out for support - you don't have to face this alone</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-border pt-6 bg-primary/5 -mx-8 -mb-8 px-8 pb-8 rounded-b-3xl">
                <p className="text-sm text-center text-muted-foreground font-body">
                  🙏 Thank you for following! Stay tuned for daily mental health insights on Instagram
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Crisis Support */}
        {(result.interpretation.level.includes("Severe") || 
          result.interpretation.level.includes("High")) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary/10 border-2 border-secondary rounded-2xl p-6 mb-8"
            data-testid="crisis-support-banner"
          >
            <h3 className="text-lg font-heading font-bold text-foreground mb-2">
              Need Immediate Support?
            </h3>
            <p className="text-muted-foreground font-body mb-3">
              If you're in crisis or having thoughts of self-harm, please reach out immediately:
            </p>
            <div className="space-y-1 text-foreground font-body">
              <p>• National Crisis Hotline: 988</p>
              <p>• Crisis Text Line: Text HOME to 741741</p>
              <p>• Emergency Services: 911</p>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            data-testid="home-button"
          >
            <Home className="w-5 h-5" strokeWidth={1.5} />
            Back to Home
          </button>
          
          <button
            onClick={() => navigate(`/assessment/${assessmentId}`)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-card border-2 border-border text-foreground rounded-full font-body font-semibold hover:border-primary hover:bg-primary/5 transition-all"
            data-testid="retake-button"
          >
            <RefreshCcw className="w-5 h-5" strokeWidth={1.5} />
            Retake Assessment
          </button>
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground font-body mb-4">
            Follow us for daily mental health insights and support
          </p>
          <a
            href="https://www.instagram.com/onethoughtformentalhealth?igsh=bzRnd3podWZiMnpj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            data-testid="instagram-cta-button"
          >
            <Instagram className="w-5 h-5" strokeWidth={1.5} />
            Follow @onethoughtformentalhealth
          </a>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-muted/30 rounded-2xl p-6 text-center"
        >
          <p className="text-sm text-muted-foreground font-body">
            This screening is not a diagnosis. Results are for educational purposes only.
            Please consult with a qualified mental health professional for proper evaluation and treatment.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;