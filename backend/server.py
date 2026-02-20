from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel
from typing import List, Dict

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

class AssessmentQuestion(BaseModel):
    id: int
    text: str
    options: List[Dict[str, int]]

class AssessmentData(BaseModel):
    id: str
    name: str
    description: str
    questions: List[AssessmentQuestion]
    interpretation: Dict[str, Dict]

@api_router.get("/")
async def root():
    return {"message": "One Thought for Therapy API"}

@api_router.get("/assessments")
async def get_assessments():
    assessments = [
        {
            "id": "phq9",
            "name": "Depression Screening",
            "short_name": "PHQ-9",
            "description": "Patient Health Questionnaire-9",
            "duration": "2-3 minutes",
            "image": "https://images.unsplash.com/photo-1747786715793-ad7400fe1b9b"
        },
        {
            "id": "gad7",
            "name": "Anxiety Screening",
            "short_name": "GAD-7",
            "description": "Generalized Anxiety Disorder-7",
            "duration": "2 minutes",
            "image": "https://images.unsplash.com/photo-1590554790703-7212ae90548c"
        },
        {
            "id": "social_anxiety",
            "name": "Social Anxiety Assessment",
            "short_name": "Social Anxiety",
            "description": "Social Phobia Screening",
            "duration": "2-3 minutes",
            "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
        },
        {
            "id": "asrs",
            "name": "ADHD Screening",
            "short_name": "ASRS",
            "description": "Adult ADHD Self-Report Scale",
            "duration": "3 minutes",
            "image": "https://images.unsplash.com/photo-1578960949728-a03ae3a61520"
        },
        {
            "id": "burnout",
            "name": "Burnout Assessment",
            "short_name": "Burnout Scale",
            "description": "Professional Burnout Inventory",
            "duration": "3 minutes",
            "image": "https://images.unsplash.com/photo-1708897721671-44f660072266"
        },
        {
            "id": "overthinking",
            "name": "Overthinking Assessment",
            "short_name": "Overthinking",
            "description": "Rumination & Worry Patterns",
            "duration": "2 minutes",
            "image": "https://images.unsplash.com/photo-1507413245164-6160d8298b31"
        },
        {
            "id": "emotional_exhaustion",
            "name": "Emotional Exhaustion",
            "short_name": "Emotional Burnout",
            "description": "Emotional Depletion Assessment",
            "duration": "2 minutes",
            "image": "https://images.unsplash.com/photo-1543466835-00a7907e9de1"
        },
        {
            "id": "nervous_system",
            "name": "Nervous System Health",
            "short_name": "Nervous System",
            "description": "Nervous System Regulation",
            "duration": "3 minutes",
            "image": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
        },
        {
            "id": "fatigue",
            "name": "Fatigue Assessment",
            "short_name": "Fatigue Scale",
            "description": "Energy & Fatigue Screening",
            "duration": "2 minutes",
            "image": "https://images.unsplash.com/photo-1541480551145-2370a440d585"
        },
        {
            "id": "people_pleasing",
            "name": "People Pleasing Patterns",
            "short_name": "People Pleasing",
            "description": "Boundary & Self-Care Assessment",
            "duration": "2-3 minutes",
            "image": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
        },
        {
            "id": "mbti",
            "name": "MBTI Personality Test",
            "short_name": "MBTI",
            "description": "Myers-Briggs Type Indicator",
            "duration": "5-7 minutes",
            "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
        }
    ]
    return assessments

@api_router.get("/assessment/{assessment_id}")
async def get_assessment_detail(assessment_id: str):
    assessments_data = {
        "phq9": {
            "id": "phq9",
            "name": "PHQ-9 Depression Screening",
            "description": "The PHQ-9 is a validated tool for screening, diagnosing, monitoring and measuring depression severity.",
            "questions": [
                {
                    "id": 1,
                    "text": "Little interest or pleasure in doing things",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 2,
                    "text": "Feeling down, depressed, or hopeless",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 3,
                    "text": "Trouble falling or staying asleep, or sleeping too much",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 4,
                    "text": "Feeling tired or having little energy",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 5,
                    "text": "Poor appetite or overeating",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 6,
                    "text": "Feeling bad about yourself or that you are a failure",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 7,
                    "text": "Trouble concentrating on things",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 8,
                    "text": "Moving or speaking slowly, or being fidgety or restless",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 9,
                    "text": "Thoughts that you would be better off dead",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                }
            ],
            "interpretation": {
                "0-4": {"level": "Minimal", "description": "Minimal or no depression. Continue monitoring your mental health and maintain healthy habits.", "color": "#4A6741"},
                "5-9": {"level": "Mild", "description": "Mild depression symptoms. Consider lifestyle changes, stress management techniques, and monitoring symptoms.", "color": "#D4A373"},
                "10-14": {"level": "Moderate", "description": "Moderate depression. Consider seeking support from a mental health professional.", "color": "#E07A5F"},
                "15-19": {"level": "Moderately Severe", "description": "Moderately severe depression. Professional support is recommended.", "color": "#D16857"},
                "20-27": {"level": "Severe", "description": "Severe depression. Please seek professional help immediately.", "color": "#B85042"}
            }
        },
        "gad7": {
            "id": "gad7",
            "name": "GAD-7 Anxiety Screening",
            "description": "The GAD-7 is a validated screening tool for generalized anxiety disorder.",
            "questions": [
                {
                    "id": 1,
                    "text": "Feeling nervous, anxious, or on edge",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 2,
                    "text": "Not being able to stop or control worrying",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 3,
                    "text": "Worrying too much about different things",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 4,
                    "text": "Trouble relaxing",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 5,
                    "text": "Being so restless that it is hard to sit still",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 6,
                    "text": "Becoming easily annoyed or irritable",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                },
                {
                    "id": 7,
                    "text": "Feeling afraid, as if something awful might happen",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "Several days", "value": 1},
                        {"text": "More than half the days", "value": 2},
                        {"text": "Nearly every day", "value": 3}
                    ]
                }
            ],
            "interpretation": {
                "0-4": {"level": "Minimal", "description": "Minimal anxiety. Your anxiety levels appear to be within a normal range.", "color": "#4A6741"},
                "5-9": {"level": "Mild", "description": "Mild anxiety. Consider stress management techniques and relaxation exercises.", "color": "#D4A373"},
                "10-14": {"level": "Moderate", "description": "Moderate anxiety. Consider consulting a mental health professional for support.", "color": "#E07A5F"},
                "15-21": {"level": "Severe", "description": "Severe anxiety. Professional support is strongly recommended.", "color": "#B85042"}
            }
        },
        "asrs": {
            "id": "asrs",
            "name": "ASRS ADHD Screening",
            "description": "The Adult ADHD Self-Report Scale (ASRS) is a validated screening tool for ADHD in adults.",
            "questions": [
                {
                    "id": 1,
                    "text": "How often do you have trouble wrapping up the final details of a project?",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Very Often", "value": 4}
                    ]
                },
                {
                    "id": 2,
                    "text": "How often do you have difficulty getting things in order?",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Very Often", "value": 4}
                    ]
                },
                {
                    "id": 3,
                    "text": "How often do you have problems remembering appointments?",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Very Often", "value": 4}
                    ]
                },
                {
                    "id": 4,
                    "text": "How often do you avoid or delay getting started on tasks?",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Very Often", "value": 4}
                    ]
                },
                {
                    "id": 5,
                    "text": "How often do you fidget or squirm when sitting?",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Very Often", "value": 4}
                    ]
                },
                {
                    "id": 6,
                    "text": "How often do you feel overly active or driven?",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Very Often", "value": 4}
                    ]
                }
            ],
            "interpretation": {
                "0-8": {"level": "Low Likelihood", "description": "Low likelihood of ADHD. Your responses suggest ADHD symptoms are minimal.", "color": "#4A6741"},
                "9-15": {"level": "Moderate", "description": "Moderate likelihood of ADHD. Consider consulting with a healthcare professional for evaluation.", "color": "#D4A373"},
                "16-24": {"level": "High Likelihood", "description": "High likelihood of ADHD symptoms. Professional evaluation is recommended.", "color": "#E07A5F"}
            }
        },
        "burnout": {
            "id": "burnout",
            "name": "Burnout Assessment",
            "description": "A screening tool to assess professional and personal burnout levels.",
            "questions": [
                {
                    "id": 1,
                    "text": "I feel emotionally drained from my work or daily activities",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 2,
                    "text": "I feel used up at the end of the day",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 3,
                    "text": "I feel tired when I wake up in the morning",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 4,
                    "text": "Working with people directly puts too much stress on me",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 5,
                    "text": "I feel frustrated with my work or daily responsibilities",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 6,
                    "text": "I feel I'm working too hard",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 7,
                    "text": "I don't really care what happens to some people",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 8,
                    "text": "I have become more callous or detached",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                }
            ],
            "interpretation": {
                "0-10": {"level": "Low Burnout", "description": "Low burnout levels. You appear to be managing stress well. Continue maintaining healthy boundaries.", "color": "#4A6741"},
                "11-20": {"level": "Moderate Burnout", "description": "Moderate burnout. Consider implementing stress management strategies and taking regular breaks.", "color": "#D4A373"},
                "21-32": {"level": "High Burnout", "description": "High burnout levels. It's important to seek support and make significant changes to reduce stress.", "color": "#E07A5F"}
            }
        },
        "overthinking": {
            "id": "overthinking",
            "name": "Overthinking Assessment",
            "description": "This assessment evaluates rumination and repetitive negative thinking patterns.",
            "questions": [
                {
                    "id": 1,
                    "text": "I find myself replaying conversations or events over and over",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 2,
                    "text": "I have difficulty making decisions because I overanalyze options",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 3,
                    "text": "My mind races with 'what if' scenarios",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 4,
                    "text": "I struggle to let go of mistakes or embarrassing moments",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 5,
                    "text": "Overthinking keeps me awake at night",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 6,
                    "text": "I second-guess myself frequently",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 7,
                    "text": "I analyze what others think about me excessively",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                }
            ],
            "interpretation": {
                "0-9": {"level": "Minimal", "description": "Minimal overthinking patterns. Your thought processes appear balanced and manageable.", "color": "#4A6741"},
                "10-17": {"level": "Moderate", "description": "Moderate overthinking tendencies. Consider mindfulness practices to help quiet racing thoughts.", "color": "#D4A373"},
                "18-28": {"level": "Significant", "description": "Significant overthinking patterns. Professional guidance can help you develop healthier thought patterns.", "color": "#E07A5F"}
            }
        },
        "emotional_exhaustion": {
            "id": "emotional_exhaustion",
            "name": "Emotional Exhaustion Assessment",
            "description": "Evaluates emotional depletion and capacity for emotional engagement.",
            "questions": [
                {
                    "id": 1,
                    "text": "I feel emotionally drained and depleted",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 2,
                    "text": "I have little energy for things I once enjoyed",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 3,
                    "text": "I feel overwhelmed by other people's emotions",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 4,
                    "text": "I need more time alone to recharge than usual",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 5,
                    "text": "I feel numb or disconnected from my feelings",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 6,
                    "text": "Small tasks feel emotionally overwhelming",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                }
            ],
            "interpretation": {
                "0-8": {"level": "Low", "description": "Low emotional exhaustion. Your emotional reserves appear healthy.", "color": "#4A6741"},
                "9-16": {"level": "Moderate", "description": "Moderate emotional exhaustion. Prioritize self-care and emotional boundaries.", "color": "#D4A373"},
                "17-24": {"level": "High", "description": "High emotional exhaustion. Consider seeking support to restore your emotional wellbeing.", "color": "#E07A5F"}
            }
        },
        "nervous_system": {
            "id": "nervous_system",
            "name": "Nervous System Health Assessment",
            "description": "Evaluates nervous system regulation and stress response patterns.",
            "questions": [
                {
                    "id": 1,
                    "text": "I feel on edge or easily startled",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 2,
                    "text": "My heart races or pounds for no clear reason",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 3,
                    "text": "I have difficulty calming down after stress",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 4,
                    "text": "I experience muscle tension or jaw clenching",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 5,
                    "text": "I feel disconnected from my body or surroundings",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 6,
                    "text": "I have digestive issues related to stress",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 7,
                    "text": "I struggle with sleep or have vivid dreams",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                }
            ],
            "interpretation": {
                "0-9": {"level": "Regulated", "description": "Well-regulated nervous system. Your stress response appears balanced.", "color": "#4A6741"},
                "10-18": {"level": "Moderately Dysregulated", "description": "Moderate dysregulation. Practice nervous system regulation techniques like breathing exercises.", "color": "#D4A373"},
                "19-28": {"level": "Significantly Dysregulated", "description": "Significant dysregulation. Consider working with a therapist specializing in nervous system regulation.", "color": "#E07A5F"}
            }
        },
        "fatigue": {
            "id": "fatigue",
            "name": "Fatigue Assessment",
            "description": "Evaluates physical and mental fatigue levels.",
            "questions": [
                {
                    "id": 1,
                    "text": "I feel tired even after adequate sleep",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 2,
                    "text": "Physical activity exhausts me quickly",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 3,
                    "text": "I struggle to concentrate due to tiredness",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 4,
                    "text": "Fatigue interferes with my daily activities",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 5,
                    "text": "I feel mentally foggy or slow",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                },
                {
                    "id": 6,
                    "text": "I lack motivation to start tasks",
                    "options": [
                        {"text": "Never", "value": 0},
                        {"text": "Rarely", "value": 1},
                        {"text": "Sometimes", "value": 2},
                        {"text": "Often", "value": 3},
                        {"text": "Always", "value": 4}
                    ]
                }
            ],
            "interpretation": {
                "0-8": {"level": "Minimal Fatigue", "description": "Minimal fatigue. Your energy levels appear adequate for daily functioning.", "color": "#4A6741"},
                "9-16": {"level": "Moderate Fatigue", "description": "Moderate fatigue. Consider lifestyle adjustments and consult a healthcare provider if persistent.", "color": "#D4A373"},
                "17-24": {"level": "Severe Fatigue", "description": "Severe fatigue. Medical evaluation is recommended to rule out underlying conditions.", "color": "#E07A5F"}
            }
        },
        "social_anxiety": {
            "id": "social_anxiety",
            "name": "Social Anxiety Assessment",
            "description": "Screens for social anxiety and discomfort in social situations.",
            "questions": [
                {
                    "id": 1,
                    "text": "I fear being judged or embarrassed in social situations",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "A little", "value": 1},
                        {"text": "Somewhat", "value": 2},
                        {"text": "Very much", "value": 3},
                        {"text": "Extremely", "value": 4}
                    ]
                },
                {
                    "id": 2,
                    "text": "I avoid social gatherings or events",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "A little", "value": 1},
                        {"text": "Somewhat", "value": 2},
                        {"text": "Very much", "value": 3},
                        {"text": "Extremely", "value": 4}
                    ]
                },
                {
                    "id": 3,
                    "text": "Speaking in front of others makes me very anxious",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "A little", "value": 1},
                        {"text": "Somewhat", "value": 2},
                        {"text": "Very much", "value": 3},
                        {"text": "Extremely", "value": 4}
                    ]
                },
                {
                    "id": 4,
                    "text": "I worry about saying or doing the wrong thing",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "A little", "value": 1},
                        {"text": "Somewhat", "value": 2},
                        {"text": "Very much", "value": 3},
                        {"text": "Extremely", "value": 4}
                    ]
                },
                {
                    "id": 5,
                    "text": "I feel uncomfortable being the center of attention",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "A little", "value": 1},
                        {"text": "Somewhat", "value": 2},
                        {"text": "Very much", "value": 3},
                        {"text": "Extremely", "value": 4}
                    ]
                },
                {
                    "id": 6,
                    "text": "I experience physical symptoms (sweating, trembling) in social settings",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "A little", "value": 1},
                        {"text": "Somewhat", "value": 2},
                        {"text": "Very much", "value": 3},
                        {"text": "Extremely", "value": 4}
                    ]
                },
                {
                    "id": 7,
                    "text": "I replay social interactions afterwards, analyzing what I said",
                    "options": [
                        {"text": "Not at all", "value": 0},
                        {"text": "A little", "value": 1},
                        {"text": "Somewhat", "value": 2},
                        {"text": "Very much", "value": 3},
                        {"text": "Extremely", "value": 4}
                    ]
                }
            ],
            "interpretation": {
                "0-8": {"level": "Minimal", "description": "Minimal social anxiety. You appear comfortable in most social situations.", "color": "#4A6741"},
                "9-17": {"level": "Moderate", "description": "Moderate social anxiety. Consider gradual exposure and cognitive strategies to build confidence.", "color": "#D4A373"},
                "18-28": {"level": "Significant", "description": "Significant social anxiety. Professional support can help you engage more comfortably in social situations.", "color": "#E07A5F"}
            }
        },
        "people_pleasing": {
            "id": "people_pleasing",
            "name": "People Pleasing Assessment",
            "description": "Evaluates people-pleasing tendencies and boundary-setting abilities.",
            "questions": [
                {
                    "id": 1,
                    "text": "I have difficulty saying 'no' to requests",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 2,
                    "text": "I prioritize others' needs over my own",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 3,
                    "text": "I worry excessively about disappointing others",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 4,
                    "text": "I apologize frequently, even when not at fault",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 5,
                    "text": "I avoid conflict at all costs",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 6,
                    "text": "I feel responsible for others' emotions",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                },
                {
                    "id": 7,
                    "text": "I struggle to express my true opinions or preferences",
                    "options": [
                        {"text": "Rarely", "value": 0},
                        {"text": "Sometimes", "value": 1},
                        {"text": "Often", "value": 2},
                        {"text": "Very Often", "value": 3},
                        {"text": "Almost Always", "value": 4}
                    ]
                }
            ],
            "interpretation": {
                "0-9": {"level": "Healthy Boundaries", "description": "Healthy balance between helping others and self-care. You maintain good boundaries.", "color": "#4A6741"},
                "10-18": {"level": "Moderate People Pleasing", "description": "Moderate people-pleasing tendencies. Work on setting boundaries and honoring your own needs.", "color": "#D4A373"},
                "19-28": {"level": "Significant People Pleasing", "description": "Significant people-pleasing patterns. Consider therapy to develop healthier boundaries and self-advocacy.", "color": "#E07A5F"}
            }
        },
        "mbti": {
            "id": "mbti",
            "name": "MBTI Personality Test",
            "description": "Discover your Myers-Briggs personality type across four dimensions: Extraversion/Introversion, Sensing/Intuition, Thinking/Feeling, and Judging/Perceiving.",
            "questions": [
                {
                    "id": 1,
                    "text": "At a party, I usually",
                    "dimension": "E/I",
                    "options": [
                        {"text": "Interact with many people, including strangers", "value": "E"},
                        {"text": "Interact with a few close friends", "value": "I"}
                    ]
                },
                {
                    "id": 2,
                    "text": "I feel more energized when",
                    "dimension": "E/I",
                    "options": [
                        {"text": "Being around people and social activities", "value": "E"},
                        {"text": "Having time alone or with one close person", "value": "I"}
                    ]
                },
                {
                    "id": 3,
                    "text": "I prefer to",
                    "dimension": "E/I",
                    "options": [
                        {"text": "Think out loud and discuss ideas with others", "value": "E"},
                        {"text": "Think things through privately before sharing", "value": "I"}
                    ]
                },
                {
                    "id": 4,
                    "text": "In a group setting, I tend to",
                    "dimension": "E/I",
                    "options": [
                        {"text": "Take the initiative and lead conversations", "value": "E"},
                        {"text": "Listen more and contribute when asked", "value": "I"}
                    ]
                },
                {
                    "id": 5,
                    "text": "I am more interested in",
                    "dimension": "S/N",
                    "options": [
                        {"text": "Facts, details, and what is real", "value": "S"},
                        {"text": "Possibilities, meanings, and what could be", "value": "N"}
                    ]
                },
                {
                    "id": 6,
                    "text": "When learning something new, I prefer",
                    "dimension": "S/N",
                    "options": [
                        {"text": "Step-by-step instructions and practical examples", "value": "S"},
                        {"text": "Understanding the big picture and theory first", "value": "N"}
                    ]
                },
                {
                    "id": 7,
                    "text": "I trust",
                    "dimension": "S/N",
                    "options": [
                        {"text": "Experience and proven methods", "value": "S"},
                        {"text": "Intuition and innovative approaches", "value": "N"}
                    ]
                },
                {
                    "id": 8,
                    "text": "I am more drawn to",
                    "dimension": "S/N",
                    "options": [
                        {"text": "Realistic and practical matters", "value": "S"},
                        {"text": "Imaginative and abstract ideas", "value": "N"}
                    ]
                },
                {
                    "id": 9,
                    "text": "When making decisions, I prioritize",
                    "dimension": "T/F",
                    "options": [
                        {"text": "Logic, objectivity, and fairness", "value": "T"},
                        {"text": "Harmony, values, and people's feelings", "value": "F"}
                    ]
                },
                {
                    "id": 10,
                    "text": "I am more comfortable with",
                    "dimension": "T/F",
                    "options": [
                        {"text": "Analyzing problems objectively", "value": "T"},
                        {"text": "Understanding people's emotional needs", "value": "F"}
                    ]
                },
                {
                    "id": 11,
                    "text": "In conflicts, I value",
                    "dimension": "T/F",
                    "options": [
                        {"text": "Finding the truth and being right", "value": "T"},
                        {"text": "Maintaining relationships and empathy", "value": "F"}
                    ]
                },
                {
                    "id": 12,
                    "text": "People describe me as more",
                    "dimension": "T/F",
                    "options": [
                        {"text": "Rational and straightforward", "value": "T"},
                        {"text": "Compassionate and tactful", "value": "F"}
                    ]
                },
                {
                    "id": 13,
                    "text": "I prefer to",
                    "dimension": "J/P",
                    "options": [
                        {"text": "Have things decided and organized", "value": "J"},
                        {"text": "Keep options open and flexible", "value": "P"}
                    ]
                },
                {
                    "id": 14,
                    "text": "My workspace is usually",
                    "dimension": "J/P",
                    "options": [
                        {"text": "Neat, structured, and well-planned", "value": "J"},
                        {"text": "Casual, adaptable, with organized chaos", "value": "P"}
                    ]
                },
                {
                    "id": 15,
                    "text": "I approach deadlines by",
                    "dimension": "J/P",
                    "options": [
                        {"text": "Planning ahead and finishing early", "value": "J"},
                        {"text": "Working closer to the deadline with flexibility", "value": "P"}
                    ]
                },
                {
                    "id": 16,
                    "text": "I feel more satisfied when",
                    "dimension": "J/P",
                    "options": [
                        {"text": "Tasks are completed and checked off", "value": "J"},
                        {"text": "Exploring new possibilities and options", "value": "P"}
                    ]
                }
            ],
            "types": {
                "INTJ": {"name": "The Architect", "description": "Strategic, analytical, and independent thinkers who love solving complex problems.", "strengths": "Innovative, determined, strategic thinking", "color": "#4A6741"},
                "INTP": {"name": "The Logician", "description": "Curious and inventive thinkers with an endless thirst for knowledge.", "strengths": "Analytical, original, open-minded", "color": "#4A6741"},
                "ENTJ": {"name": "The Commander", "description": "Bold, imaginative leaders who always find or create solutions.", "strengths": "Efficient, confident, natural leaders", "color": "#4A6741"},
                "ENTP": {"name": "The Debater", "description": "Smart, curious thinkers who love intellectual challenges.", "strengths": "Quick-witted, innovative, versatile", "color": "#4A6741"},
                "INFJ": {"name": "The Advocate", "description": "Quiet, mystical, yet inspiring idealists with a strong sense of purpose.", "strengths": "Creative, insightful, principled", "color": "#4A6741"},
                "INFP": {"name": "The Mediator", "description": "Poetic, kind, and altruistic, always seeking to help good causes.", "strengths": "Idealistic, empathetic, creative", "color": "#4A6741"},
                "ENFJ": {"name": "The Protagonist", "description": "Charismatic, inspiring leaders who captivate and motivate others.", "strengths": "Charismatic, inspiring, natural leaders", "color": "#4A6741"},
                "ENFP": {"name": "The Campaigner", "description": "Enthusiastic, creative, and sociable free spirits.", "strengths": "Enthusiastic, creative, sociable", "color": "#4A6741"},
                "ISTJ": {"name": "The Logistician", "description": "Practical and fact-minded individuals whose reliability is unshakable.", "strengths": "Responsible, organized, practical", "color": "#4A6741"},
                "ISFJ": {"name": "The Defender", "description": "Very dedicated and warm protectors, always ready to defend loved ones.", "strengths": "Supportive, reliable, patient", "color": "#4A6741"},
                "ESTJ": {"name": "The Executive", "description": "Excellent administrators, managing things and people efficiently.", "strengths": "Organized, practical, dedicated", "color": "#4A6741"},
                "ESFJ": {"name": "The Consul", "description": "Caring, social, and popular people who love helping others.", "strengths": "Caring, loyal, organized", "color": "#4A6741"},
                "ISTP": {"name": "The Virtuoso", "description": "Bold and practical experimenters, masters of tools and techniques.", "strengths": "Practical, spontaneous, adaptable", "color": "#4A6741"},
                "ISFP": {"name": "The Adventurer", "description": "Flexible, charming artists, always ready to explore new possibilities.", "strengths": "Creative, flexible, passionate", "color": "#4A6741"},
                "ESTP": {"name": "The Entrepreneur", "description": "Smart, energetic, and perceptive people who truly enjoy living on the edge.", "strengths": "Bold, perceptive, direct", "color": "#4A6741"},
                "ESFP": {"name": "The Entertainer", "description": "Spontaneous, energetic entertainers who love making others smile.", "strengths": "Spontaneous, enthusiastic, fun-loving", "color": "#4A6741"}
            }
        }
    }
    
    if assessment_id not in assessments_data:
        return {"error": "Assessment not found"}
    
    return assessments_data[assessment_id]

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()