from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case
from backend.database import get_db
import backend.models as models

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/departments")
def get_department_reports(db: Session = Depends(get_db)):

    # Query grouped calculations
    results = (
        db.query(
            models.Department.name.label("department"),
            func.count(models.Ticket.id).label("total_tickets"),
            func.sum(
                case(
                    (models.Ticket.status == "closed", 1),
                    else_=0
                )
            ).label("resolved_tickets")
        )
        .join(models.Ticket, models.Ticket.assigned_department_id == models.Department.id, isouter=True)
        .group_by(models.Department.id)
        .all()
    )

    # Convert SQL results → JSON
    final = []
    for row in results:
        total = row.total_tickets or 0
        resolved = row.resolved_tickets or 0
        rate = f"{(resolved / total * 100):.1f}%" if total > 0 else "0%"

        final.append({
            "department": row.department,
            "total_tickets": total,
            "resolved_tickets": resolved,
            "resolution_rate": rate
        })

    return final