from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health-score")
def get_health_score():
    return {
        "currentScore": 85,
        "history": [
            {"name": "Jan", "score": 72},
            {"name": "Feb", "score": 75},
            {"name": "Mar", "score": 78},
            {"name": "Apr", "score": 76},
            {"name": "May", "score": 82},
            {"name": "Jun", "score": 85},
        ]
    }

@app.get("/api/biomarkers")
def get_biomarkers():
    return [
        {"id": 1, "name": "LDL Cholesterol", "value": "95 mg/dL", "status": "optimal", "change": "-12%"},
        {"id": 2, "name": "HbA1c", "value": "5.2 %", "status": "optimal", "change": "-0.1%"},
        {"id": 3, "name": "Vitamin D", "value": "28 ng/mL", "status": "warning", "change": "+2%"},
        {"id": 4, "name": "ApoB", "value": "88 mg/dL", "status": "warning", "change": "+5%"},
    ]

@app.get("/api/action-items")
def get_action_items():
    return {
        "title": "Schedule your DEXA scan",
        "description": "Your last body composition analysis was over 12 months ago."
    }

@app.get("/api/clinical-team")
def get_clinical_team():
    return [
        {
            "id": 1,
            "name": "Dr. Sarah Chen",
            "role": "Primary Preventative Physician",
            "avatarBg": "14b8a6"
        },
        {
            "id": 2,
            "name": "Marcus L.",
            "role": "Health Coach",
            "avatarBg": "8b5cf6"
        }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
