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