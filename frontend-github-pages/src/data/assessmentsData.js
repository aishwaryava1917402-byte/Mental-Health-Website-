// Complete assessment data for GitHub Pages version
export const assessmentsList = [
  { id: "phq9", name: "Depression Screening", short_name: "PHQ-9", description: "Patient Health Questionnaire-9", duration: "2-3 minutes", image: "https://images.unsplash.com/photo-1747786715793-ad7400fe1b9b" },
  { id: "gad7", name: "Anxiety Screening", short_name: "GAD-7", description: "Generalized Anxiety Disorder-7", duration: "2 minutes", image: "https://images.unsplash.com/photo-1590554790703-7212ae90548c" },
  { id: "social_anxiety", name: "Social Anxiety Assessment", short_name: "Social Anxiety", description: "Social Phobia Screening", duration: "2-3 minutes", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" },
  { id: "asrs", name: "ADHD Screening", short_name: "ASRS", description: "Adult ADHD Self-Report Scale", duration: "3 minutes", image: "https://images.unsplash.com/photo-1578960949728-a03ae3a61520" },
  { id: "burnout", name: "Burnout Assessment", short_name: "Burnout Scale", description: "Professional Burnout Inventory", duration: "3 minutes", image: "https://images.unsplash.com/photo-1708897721671-44f660072266" },
  { id: "overthinking", name: "Overthinking Assessment", short_name: "Overthinking", description: "Rumination & Worry Patterns", duration: "2 minutes", image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31" },
  { id: "emotional_exhaustion", name: "Emotional Exhaustion", short_name: "Emotional Burnout", description: "Emotional Depletion Assessment", duration: "2 minutes", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1" },
  { id: "nervous_system", name: "Nervous System Health", short_name: "Nervous System", description: "Nervous System Regulation", duration: "3 minutes", image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2" },
  { id: "fatigue", name: "Fatigue Assessment", short_name: "Fatigue Scale", description: "Energy & Fatigue Screening", duration: "2 minutes", image: "https://images.unsplash.com/photo-1541480551145-2370a440d585" },
  { id: "people_pleasing", name: "People Pleasing Patterns", short_name: "People Pleasing", description: "Boundary & Self-Care Assessment", duration: "2-3 minutes", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" }
];

export const getAssessmentData = (assessmentId) => {
  const data = {
    phq9: {
      id: "phq9",
      name: "PHQ-9 Depression Screening",
      description: "The PHQ-9 is a validated tool for screening, diagnosing, monitoring and measuring depression severity.",
      questions: [
        { id: 1, text: "Little interest or pleasure in doing things", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 2, text: "Feeling down, depressed, or hopeless", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 3, text: "Trouble falling or staying asleep, or sleeping too much", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 4, text: "Feeling tired or having little energy", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 5, text: "Poor appetite or overeating", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 6, text: "Feeling bad about yourself or that you are a failure", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 7, text: "Trouble concentrating on things", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 8, text: "Moving or speaking slowly, or being fidgety or restless", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 9, text: "Thoughts that you would be better off dead", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] }
      ],
      interpretation: {
        "0-4": { level: "Minimal", description: "Minimal or no depression. Continue monitoring your mental health and maintain healthy habits.", color: "#4A6741" },
        "5-9": { level: "Mild", description: "Mild depression symptoms. Consider lifestyle changes, stress management techniques, and monitoring symptoms.", color: "#D4A373" },
        "10-14": { level: "Moderate", description: "Moderate depression. Consider seeking support from a mental health professional.", color: "#E07A5F" },
        "15-19": { level: "Moderately Severe", description: "Moderately severe depression. Professional support is recommended.", color: "#D16857" },
        "20-27": { level: "Severe", description: "Severe depression. Please seek professional help immediately.", color: "#B85042" }
      }
    },
    gad7: {
      id: "gad7",
      name: "GAD-7 Anxiety Screening",
      description: "The GAD-7 is a validated screening tool for generalized anxiety disorder.",
      questions: [
        { id: 1, text: "Feeling nervous, anxious, or on edge", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 2, text: "Not being able to stop or control worrying", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 3, text: "Worrying too much about different things", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 4, text: "Trouble relaxing", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 5, text: "Being so restless that it is hard to sit still", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 6, text: "Becoming easily annoyed or irritable", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] },
        { id: 7, text: "Feeling afraid, as if something awful might happen", options: [{ text: "Not at all", value: 0 }, { text: "Several days", value: 1 }, { text: "More than half the days", value: 2 }, { text: "Nearly every day", value: 3 }] }
      ],
      interpretation: {
        "0-4": { level: "Minimal", description: "Minimal anxiety. Your anxiety levels appear to be within a normal range.", color: "#4A6741" },
        "5-9": { level: "Mild", description: "Mild anxiety. Consider stress management techniques and relaxation exercises.", color: "#D4A373" },
        "10-14": { level: "Moderate", description: "Moderate anxiety. Consider consulting a mental health professional for support.", color: "#E07A5F" },
        "15-21": { level: "Severe", description: "Severe anxiety. Professional support is strongly recommended.", color: "#B85042" }
      }
    }
  };
  return data[assessmentId];
};
