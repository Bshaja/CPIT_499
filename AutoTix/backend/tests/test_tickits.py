def test_create_ticket(client):
    payload = {
        "title": "Test Ticket",
        "description": "Sample description",
        "priority": "medium",
        "email": "test@example.com"
    }

    response = client.post("/tickets", json=payload)

    assert response.status_code == 200
    data = response.json()["ticket"]

    assert data["title"] == "Test Ticket"
    assert data["priority"] == "medium"
    assert data["email"] == "test@example.com"


def test_get_tickets(client):
    response = client.get("/tickets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_ticket_status(client):
    # create ticket
    ticket = client.post("/tickets/", json={
        "title": "Status Test",
        "description": "Checking update",
        "priority": "low",
        "email": "user@test.com"
    }).json()["ticket"]

    # update
    res = client.put(f"/tickets/{ticket['id']}/status", json={"status": "closed"})
    assert res.status_code == 200
    assert res.json()["status"] == "closed"

def test_delete_ticket(client):
    # 1. Create a temporary ticket
    payload = {
        "title": "Delete Ticket",
        "description": "To be deleted",
        "priority": "low",
        "email": "delete@test.com"
    }

    create_response = client.post("/tickets", json=payload)
    assert create_response.status_code == 200

    ticket_id = create_response.json()["ticket"]["id"]

    # 2. Delete it
    delete_response = client.delete(f"/tickets/{ticket_id}")
    assert delete_response.status_code == 200

    # 3. Ensure it's gone
    check_response = client.get("/tickets")
    ids = [t["id"] for t in check_response.json()]

    assert ticket_id not in ids