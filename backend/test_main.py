from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_health_score():
    response = client.get("/api/health-score")
    assert response.status_code == 200
    data = response.json()
    assert "currentScore" in data
    assert "history" in data
    assert isinstance(data["history"], list)
    assert data["currentScore"] == 85

def test_get_biomarkers():
    response = client.get("/api/biomarkers")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]
    assert "name" in data[0]
    assert "value" in data[0]
    assert "status" in data[0]
    assert "change" in data[0]

def test_get_action_items():
    response = client.get("/api/action-items")
    assert response.status_code == 200
    data = response.json()
    assert "title" in data
    assert "description" in data
    assert "DEXA scan" in data["title"]
