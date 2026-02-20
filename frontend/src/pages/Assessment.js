import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Assessment = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`${API}/assessment/${assessmentId}`);
        setAssessment(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assessment:", error);
        navigate("/");
      }
    };
    fetchAssessment();
  }, [assessmentId, navigate]);

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const goToNext = () => {
    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitAssessment = () => {
    // For MBTI, navigate to special results page
    if (assessmentId === 'mbti') {
      navigate(`/results-mbti/${assessmentId}`, { state: { answers, assessment } });
    } else {
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
      navigate(`/results/${assessmentId}`, { state: { score: totalScore, assessment } });
    }
  };

  if (loading || !assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-body">Loading assessment...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100;
  const currentQ = assessment.questions[currentQuestion];
  const isAnswered = answers[currentQ.id] !== undefined;
  const isLastQuestion = currentQuestion === assessment.questions.length - 1;

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body mb-6"
            data-testid="back-button"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
            {assessment.name}
          </h1>
          <p className="text-muted-foreground font-body">{assessment.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-body text-muted-foreground">
              Question {currentQuestion + 1} of {assessment.questions.length}
            </span>
            <span className="text-sm font-body text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="h-3 bg-stone-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-3xl p-8 sm:p-12 shadow-xl mb-8"
            data-testid="question-card"
          >
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-8 leading-relaxed">
              {currentQ.text}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all font-body ${
                    answers[currentQ.id] === option.value
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-transparent bg-stone-50 hover:border-primary/30 hover:bg-primary/5"
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  data-testid={`option-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{option.text}</span>
                    {answers[currentQ.id] === option.value && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between pb-20">
          <button
            onClick={goToPrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-muted-foreground hover:text-primary"
            data-testid="previous-button"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={submitAssessment}
              disabled={!isAnswered}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              data-testid="submit-button"
            >
              View Results
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={goToNext}
              disabled={!isAnswered}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-body font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              data-testid="next-button"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;