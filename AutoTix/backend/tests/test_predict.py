def test_predict_department(client):
    payload = {
        "text": "Network issue. Internet is down."
    }

    response = client.post("/ai/predict", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert "department" in data
    assert isinstance(data["department"], str)