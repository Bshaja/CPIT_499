def test_department_reports(client):
    res = client.get("/reports/departments")
    assert res.status_code == 200

    data = res.json()
    assert isinstance(data, list)

    if len(data) > 0:
        first = data[0]
        assert "department" in first
        assert "total_tickets" in first
        assert "resolved_tickets" in first