def test_create_organization(client):
    payload = {
        "name": "Test Org",
        "description": "Sample organization"
    }

    response = client.post("/organizations/", json=payload)
    assert response.status_code == 200

    data = response.json()
    assert data["name"] == "Test Org"
    assert data["description"] == "Sample organization"



def test_delete_organization(client):
    # First create an organization
    org = client.post("/organizations/", json={
        "name": "DeleteOrg",
        "description": "To be deleted"
    }).json()

    org_id = org["id"]

    # Now delete it
    res = client.delete(f"/organizations/{org_id}")
    assert res.status_code == 200
    assert res.json()["message"] == "Organization deleted successfully"

    # Ensure it's gone
    all_orgs = client.get("/organizations/").json()
    assert not any(o["id"] == org_id for o in all_orgs)