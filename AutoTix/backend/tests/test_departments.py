def test_create_department(client):
    org = client.post("/organizations/", json={
        "name": "Org2",
        "description": "Desc"
    }).json()

    payload = {
        "organization_id": org["id"],
        "name": "Networking",
        "description": "Handles network tasks"
    }

    res = client.post("/departments/", json=payload)
    assert res.status_code == 200

    dept = res.json()
    assert dept["name"] == "Networking"

def test_delete_department(client):
    # 1. Create organization
    org = client.post("/organizations/", json={
        "name": "DeptOrg",
        "description": "Holder"
    }).json()

    org_id = org["id"]

    # 2. Create department under that org
    dept = client.post("/departments/", json={
        "organization_id": org_id,
        "name": "ToDeleteDept",
        "description": "Test"
    }).json()

    dept_id = dept["id"]

    # 3. Delete the department
    res = client.delete(f"/departments/{dept_id}")
    assert res.status_code == 200
    assert res.json()["message"] == "Department deleted successfully"

    # 4. Verify department removed
    all_depts = client.get("/departments/").json()
    assert not any(d["id"] == dept_id for d in all_depts)

    # 5. Cleanup → delete the organization
    cleanup = client.delete(f"/organizations/{org_id}")
    assert cleanup.status_code == 200
    assert cleanup.json()["message"] == "Organization deleted successfully"


def test_get_departments(client):
    res = client.get("/departments/")
    assert res.status_code == 200
    assert isinstance(res.json(), list)