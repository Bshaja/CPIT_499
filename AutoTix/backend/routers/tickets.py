from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models
from backend.schemas.tickets import TicketCreate, TicketStatusUpdate
from backend.ml.predict import predict_department
from backend.models import Department

router = APIRouter(prefix="/tickets", tags=["Tickets"])



@router.post("/")
def create_ticket_api(ticket: TicketCreate, db: Session = Depends(get_db)):
    text = f"{ticket.title} {ticket.description}"


    ai_result = predict_department(text)
    predicted_dept_name = ai_result["department"]


    dept = db.query(models.Department).filter(models.Department.name == predicted_dept_name).first()

    if not dept:
        return {"error": "Predicted department not found in DB", "predicted": predicted_dept_name}

    new_ticket = models.Ticket(
        title=ticket.title,
        description=ticket.description,
        email=ticket.email,
        assigned_department_id=dept.id,
        assigned_department=dept.name,
        priority=ticket.priority
    )

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)

    return {
        "ticket": new_ticket,
        "predicted_department": predicted_dept_name
    }


@router.get("/")
def get_all_tickets(db: Session = Depends(get_db)):
    return db.query(models.Ticket).all()

@router.get("/department/{dept_id}")
def get_tickets_by_department(dept_id: int, db: Session = Depends(get_db)):
    return db.query(models.Ticket).filter(models.Ticket.assigned_department_id == dept_id).all()

@router.put("/{ticket_id}/status")
def update_ticket_status(ticket_id: int, data: TicketStatusUpdate, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()

    if not ticket:
        return {"error": "Ticket not found"}

    ticket.status = data.status
    db.commit()
    db.refresh(ticket)
    return ticket