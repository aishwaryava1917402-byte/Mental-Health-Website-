import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Home, Instagram, RefreshCcw, Heart, Copy, Check, Search } from "lucide-react";

const INSTAGRAM_USERNAME = "onethoughtformentalhealth";

const ResultsMBTI = () => {
  const { assessmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [showFullResults, setShowFullResults] = useState(false);
  const hasProcessedState = useRef(false);
  const [copied, setCopied] = useState(false);

  const copyUsername = () => {
    navigator.clipboard.writeText(INSTAGRAM_USERNAME);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Only process state once to avoid redirect loops
    if (hasProcessedState.current) return;
    
    // Check if state exists (passed from navigation)
    if (location.state && location.state.answers) {
      hasProcessedState.current = true;
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
    } else {
      // Small delay to ensure state is fully propagated before redirecting
      const timer = setTimeout(() => {
        if (!hasProcessedState.current && (!location.state || !location.state.answers)) {
          navigate("/");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-body">Calculating your personality type...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-3">
            Your Personality Type
          </h1>
          <p className="text-muted-foreground font-body">{result.assessmentName}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card rounded-3xl p-8 sm:p-12 shadow-xl mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-6xl font-heading font-bold text-primary tracking-wider mb-4">{result.type}</h2>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
              {result.typeData.name}
            </h3>
          </div>

          {!showFullResults ? (
            /* Instagram Follow Gate */
            <div className="text-center space-y-6 py-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                  <Instagram className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
                <h4 className="text-2xl font-heading font-bold text-foreground mb-3">
                  Unlock Your Complete Personality Analysis
                </h4>
                <p className="text-muted-foreground font-body max-w-md mx-auto leading-relaxed">
                  Follow us on Instagram for daily insights on personality types, mental health, and personal growth. Then get your detailed MBTI breakdown!
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
                    I've Followed - Show Full Analysis
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
                <h4 className="text-lg font-heading font-bold text-foreground mb-3">About Your Type</h4>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">{result.typeData.description}</p>
                
                <div className="bg-muted/30 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    As an <strong>{result.type}</strong> personality type, you have a unique way of processing information, 
                    making decisions, and interacting with the world. Understanding your type can help you leverage your 
                    natural strengths, improve communication with others, and find environments where you thrive.
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="text-lg font-heading font-bold text-foreground mb-3">Key Strengths</h4>
                <p className="text-muted-foreground font-body leading-relaxed mb-3">{result.typeData.strengths}</p>
                
                <div className="bg-primary/5 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    These strengths are your natural talents - the things that come easily to you and energize you. 
                    Recognizing and developing these qualities can lead to greater satisfaction in your career, 
                    relationships, and personal growth journey.
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="text-lg font-heading font-bold text-foreground mb-3">Understanding MBTI Dimensions</h4>
                <p className="text-sm text-muted-foreground font-body mb-4">
                  Your personality type is determined by your preferences across four dimensions. Here's what each letter means:
                </p>
                <ul className="space-y-4 text-muted-foreground font-body">
                  <li className="bg-muted/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-heading font-bold text-primary">{result.type[0]}</span>
                      <div>
                        <strong className="text-foreground">
                          {result.type[0] === 'E' ? 'Extraversion (E)' : 'Introversion (I)'}
                        </strong>
                        <p className="text-sm mt-1">
                          {result.type[0] === 'E' 
                            ? 'You gain energy from social interaction and external activities. You tend to think out loud, enjoy being around people, and prefer action-oriented approaches.' 
                            : 'You recharge through solitude and internal reflection. You prefer deep one-on-one conversations, think before speaking, and need quiet time to process.'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="bg-muted/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-heading font-bold text-primary">{result.type[1]}</span>
                      <div>
                        <strong className="text-foreground">
                          {result.type[1] === 'S' ? 'Sensing (S)' : 'Intuition (N)'}
                        </strong>
                        <p className="text-sm mt-1">
                          {result.type[1] === 'S' 
                            ? 'You focus on concrete facts, details, and present realities. You trust what you can see, hear, and touch, and prefer practical, proven methods.' 
                            : 'You focus on patterns, possibilities, and future implications. You trust your insights and hunches, and enjoy exploring abstract ideas and innovative approaches.'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="bg-muted/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-heading font-bold text-primary">{result.type[2]}</span>
                      <div>
                        <strong className="text-foreground">
                          {result.type[2] === 'T' ? 'Thinking (T)' : 'Feeling (F)'}
                        </strong>
                        <p className="text-sm mt-1">
                          {result.type[2] === 'T' 
                            ? 'You make decisions based on logic, objective analysis, and principles. You value fairness, truth, and consistency in your decision-making process.' 
                            : 'You make decisions based on personal values, harmony, and the impact on people. You prioritize empathy, relationships, and what feels right.'}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="bg-muted/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl font-heading font-bold text-primary">{result.type[3]}</span>
                      <div>
                        <strong className="text-foreground">
                          {result.type[3] === 'J' ? 'Judging (J)' : 'Perceiving (P)'}
                        </strong>
                        <p className="text-sm mt-1">
                          {result.type[3] === 'J' 
                            ? 'You prefer structure, organization, and having things decided. You like planning ahead, meeting deadlines early, and having clear goals and schedules.' 
                            : 'You prefer flexibility, spontaneity, and keeping options open. You adapt easily to change, work well under pressure, and enjoy exploring multiple possibilities.'}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="text-lg font-heading font-bold text-foreground mb-3">Using This Knowledge</h4>
                <div className="space-y-3">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h5 className="font-semibold text-foreground font-body mb-2">Personal Growth</h5>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      Use your type insights to understand why certain situations energize or drain you, and make 
                      choices that align with your natural preferences while also developing your less-preferred functions.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h5 className="font-semibold text-foreground font-body mb-2">Relationships</h5>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      Understanding personality differences helps you communicate better, appreciate others' perspectives, 
                      and build stronger connections by recognizing that different doesn't mean wrong.
                    </p>
                  </div>
                  
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h5 className="font-semibold text-foreground font-body mb-2">Career & Work</h5>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">
                      Knowing your type can guide career choices, help you find roles that suit your strengths, 
                      and understand your work style preferences for maximum satisfaction and productivity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 bg-primary/5 -mx-8 -mb-8 px-8 pb-8 rounded-b-3xl">
                <p className="text-sm text-center text-muted-foreground font-body">
                  🙏 Thank you for following! Discover more about personality types, self-awareness, and personal 
                  development on Instagram @onethoughtformentalhealth
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <Home className="w-5 h-5" strokeWidth={1.5} />
            Back to Home
          </button>
          
          <button
            onClick={() => navigate(`/assessment/${assessmentId}`)}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-card border-2 border-border text-foreground rounded-full font-body font-semibold hover:border-primary hover:bg-primary/5 transition-all"
          >
            <RefreshCcw className="w-5 h-5" strokeWidth={1.5} />
            Retake Test
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-muted/30 rounded-2xl p-6 text-center"
        >
          <p className="text-sm text-muted-foreground font-body mb-3">
            This is a simplified MBTI assessment for self-discovery and entertainment purposes. 
            For a comprehensive personality analysis, consider taking the official MBTI test with a certified practitioner.
          </p>
          <p className="text-xs text-muted-foreground font-body">
            <strong>Mental Health Support (India):</strong> Tele MANAS: 14416 | Vandrevala Foundation: 1860-2662-345
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsMBTI;
