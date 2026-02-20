# One Thought for Therapy - Product Requirements Document

## Overview
Mental health assessment website for a psychologist's Instagram page "One Thought for Therapy" (@onethoughtformentalhealth). The website allows followers to take standardized mental health screenings and receive immediate, confidential results.

## User Persona
- **Primary User:** Instagram followers seeking mental health self-assessment
- **Owner:** Psychologist with Instagram presence
- **Technical Level:** Non-technical users; simple, clear UX required

## Core Requirements
1. **Assessments:** Provide standardized mental health and personality assessments
2. **Privacy:** No user data storage; all calculations are session-only
3. **No Authentication:** No registration or login required
4. **Instagram Integration:** Prominent link to Instagram page
5. **Follow Gate:** Encourage Instagram follows before showing detailed results
6. **India-Specific Resources:** Include local crisis hotlines (Tele MANAS, Vandrevala Foundation)

---

## What's Been Implemented

### December 2025 - Critical Bug Fix & Deployment Prep

#### Bug Fixes
- ✅ **Critical Navigation Bug Fixed**: App was redirecting to homepage instead of results page after assessment submission. Fixed by adding `hasProcessedState` ref to prevent premature redirects in Results.js and ResultsMBTI.js

#### Features Completed
- ✅ 11 mental health assessments (PHQ-9, GAD-7, Social Anxiety, OCD, PTSD, ASRS, Burnout, Bipolar, Sleep Quality, DASS-21, MBTI)
- ✅ Two-step results page with Instagram "follow gate"
- ✅ Detailed result explanations for all assessments
- ✅ India-specific crisis hotlines
- ✅ Warm, professional UI design
- ✅ Mobile responsive layout
- ✅ Render.com deployment configuration files created

#### Files Modified
- `/app/frontend/src/pages/Results.js` - Navigation fix
- `/app/frontend/src/pages/ResultsMBTI.js` - Navigation fix
- `/app/frontend/src/pages/Home.js` - Copyright year update

#### Files Created
- `/app/render.yaml` - Render.com deployment blueprint
- `/app/DEPLOYMENT.md` - Step-by-step deployment guide for user

---

## Tech Stack
- **Frontend:** React 18, React Router v6, Framer Motion
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Styling:** Tailwind CSS, custom CSS

## Architecture
```
/app
├── backend/
│   └── server.py         # FastAPI with /api/assessments endpoints
└── frontend/
    └── src/
        ├── App.js        # React Router setup
        ├── data/
        │   └── assessments.js  # All 11 assessments data
        └── pages/
            ├── Home.js
            ├── Assessment.js
            ├── Results.js
            └── ResultsMBTI.js
```

## API Endpoints
- `GET /api/assessments` - List all assessments
- `GET /api/assessment/{id}` - Get specific assessment details

---

## Prioritized Backlog

### P0 - Completed
- ✅ Fix navigation bug
- ✅ Create Render.com deployment files

### P1 - Ready for User Action
- [ ] User to deploy on Render.com using DEPLOYMENT.md guide

### P2 - Future Enhancements
- [ ] Add custom domain configuration
- [ ] Implement assessment analytics (optional)
- [ ] Add share results feature
- [ ] Add more assessments

---

## Testing Status
- **Test Report:** `/app/test_reports/iteration_1.json`
- **Success Rate:** 100% frontend tests passing
- **Verified Flows:** PHQ-9 complete flow, MBTI complete flow, navigation, follow gate

---

## Deployment
- **Target Platform:** Render.com (free tier)
- **Configuration:** render.yaml in repository root
- **Guide:** DEPLOYMENT.md with step-by-step instructions

---

## Notes
- The app does not store any user data (privacy-compliant)
- Free tier on Render.com has cold start delays (~30s after inactivity)
- Custom domain can be added for free on Render
