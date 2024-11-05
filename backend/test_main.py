from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_users():
    response = client.get("/users")
    assert response.status_code == 200
    assert "users" in response.json()

def test_update_user():
    update_data = {"lastName": "UpdatedName"}
    response = client.put("/users/1", json=update_data)
    assert response.status_code == 200
    assert response.json()["lastName"] == "UpdatedName"
