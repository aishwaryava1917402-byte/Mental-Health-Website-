import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Home, Instagram, RefreshCcw, Heart } from "lucide-react";

const Results = () => {
  const { assessmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [showFullResults, setShowFullResults] = useState(false);
  const hasProcessedState = useRef(false);

  useEffect(() => {
    // Only process state once to avoid redirect loops
    if (hasProcessedState.current) return;
    
    // Check if state exists (passed from navigation)
    if (location.state && location.state.score !== undefined) {
      hasProcessedState.current = true;
      const { score, assessment } = location.state;
      const interpretation = getInterpretation(score, assessment.interpretation);
      setResult({ score, interpretation, assessmentName: assessment.name });
    } else {
      // Small delay to ensure state is fully propagated before redirecting
      const timer = setTimeout(() => {
        if (!hasProcessedState.current && (!location.state || location.state.score === undefined)) {
          navigate("/");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
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
                  href="https://instagram.com/onethoughtformentalhealth"
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
                <p className="text-muted-foreground font-body leading-relaxed mb-4" data-testid="interpretation-text">
                  {result.interpretation.description}
                </p>
                
                {/* Additional detailed explanation */}
                <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    Your score of <strong>{result.score}</strong> indicates <strong>{result.interpretation.level.toLowerCase()}</strong> levels 
                    based on this standardized assessment. This means you may be experiencing some symptoms, but remember that 
                    this is just a screening tool and not a clinical diagnosis.
                  </p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    Mental health exists on a spectrum, and experiencing symptoms doesn't define you. Many people go through 
                    similar challenges, and there are effective treatments and strategies available. The most important step 
                    is acknowledging how you're feeling and taking action to support your wellbeing.
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  Understanding Your Results
                </h3>
                <div className="space-y-3">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground font-body mb-2">What causes these symptoms?</h4>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      Mental health symptoms can result from various factors including stress, life changes, genetics, 
                      physical health conditions, sleep patterns, or chemical imbalances in the brain. Understanding 
                      that these symptoms have real causes can help reduce self-blame and encourage seeking support.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground font-body mb-2">Is this normal?</h4>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      You're not alone - millions of people experience mental health challenges. In India alone, 
                      1 in 7 people experience mental health issues. Seeking help and taking assessments like this 
                      shows strength and self-awareness, not weakness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  Recommended Next Steps
                </h3>
                <ul className="space-y-3 text-muted-foreground font-body">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-xl">1.</span>
                    <div>
                      <strong className="text-foreground">Share with a professional:</strong> Consider showing these 
                      results to a mental health counselor, therapist, or psychiatrist. They can provide a proper 
                      evaluation and discuss treatment options tailored to your needs.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-xl">2.</span>
                    <div>
                      <strong className="text-foreground">Take other assessments:</strong> Getting a fuller picture 
                      of your mental health by taking multiple assessments can help identify patterns and provide 
                      more comprehensive insights.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-xl">3.</span>
                    <div>
                      <strong className="text-foreground">Practice self-care:</strong> Prioritize sleep, nutrition, 
                      exercise, and activities that bring you joy. These foundational habits significantly impact 
                      mental health.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-xl">4.</span>
                    <div>
                      <strong className="text-foreground">Build a support system:</strong> Reach out to trusted 
                      friends, family, or support groups. You don't have to face this alone - connection and 
                      community are powerful healing tools.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 text-xl">5.</span>
                    <div>
                      <strong className="text-foreground">Monitor your progress:</strong> Consider retaking this 
                      assessment periodically to track how you're feeling over time and evaluate the effectiveness 
                      of any interventions you try.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-t border-border pt-6 bg-primary/5 -mx-8 -mb-8 px-8 pb-8 rounded-b-3xl">
                <p className="text-sm text-center text-muted-foreground font-body">
                  🙏 Thank you for following! Stay tuned for daily mental health insights, coping strategies, 
                  and supportive community on Instagram @onethoughtformentalhealth
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Crisis Support - Only show with full results */}
        {showFullResults && (result.interpretation.level.includes("Severe") || 
          result.interpretation.level.includes("High")) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-secondary/10 border-2 border-secondary rounded-2xl p-6 mb-8"
            data-testid="crisis-support-banner"
          >
            <h3 className="text-lg font-heading font-bold text-foreground mb-3">
              Need Immediate Support?
            </h3>
            <p className="text-muted-foreground font-body mb-4">
              If you're in crisis or having thoughts of self-harm, please reach out immediately:
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground font-body mb-2">🇮🇳 India - Mental Health Helplines:</h4>
                <div className="space-y-1 text-foreground font-body ml-4">
                  <p>• <strong>Tele MANAS:</strong> 14416 or 1800-891-4416 (24/7 mental health support)</p>
                  <p>• <strong>Vandrevala Foundation:</strong> 1860-2662-345 or 1800-2333-330 (24/7)</p>
                  <p>• <strong>iCall:</strong> 9152987821 (Mon-Sat, 8 AM - 10 PM)</p>
                </div>
              </div>
              
              <div className="border-t border-secondary/30 pt-3">
                <h4 className="font-semibold text-foreground font-body mb-2">International:</h4>
                <div className="space-y-1 text-foreground font-body ml-4">
                  <p>• <strong>USA - Crisis Hotline:</strong> 988</p>
                  <p>• <strong>USA - Crisis Text Line:</strong> Text HOME to 741741</p>
                  <p>• <strong>Emergency Services:</strong> 112 (India) or 911 (USA)</p>
                </div>
              </div>
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

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-muted/30 rounded-2xl p-6 text-center"
        >
          <p className="text-sm text-muted-foreground font-body mb-3">
            This screening is not a diagnosis. Results are for educational purposes only.
            Please consult with a qualified mental health professional for proper evaluation and treatment.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            <strong>Crisis Support (India):</strong> Tele MANAS: 14416 | Vandrevala Foundation: 1860-2662-345
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;