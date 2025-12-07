def test_login(client):
    payload = {
        "email": "admin@kau.edu.sa",
        "password": "admin123"
    }

    response = client.post("/auth/login", json=payload)

    assert response.status_code == 200
    assert "access_token" in response.json()

