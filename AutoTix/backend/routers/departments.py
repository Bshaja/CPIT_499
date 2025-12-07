from fastapi import APIRouter, Depends , HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models
from backend.schemas.departments import DeptCreate


router = APIRouter(prefix="/departments", tags=["Departments"])

@router.post("/")
def create_department(dept: DeptCreate, db: Session = Depends(get_db)):
    org = db.query(models.Organization).filter(
        models.Organization.id == dept.organization_id
    ).first()

    if not org:
        return {"error": "Organization not found"}

    new_dept = models.Department(
        organization_id=dept.organization_id,
        name=dept.name,
        description=dept.description
    )
    db.add(new_dept)
    db.commit()
    db.refresh(new_dept)
    return new_dept


@router.get("/")
def get_departments(db: Session = Depends(get_db)):
    return db.query(models.Department).all()

@router.delete("/{dept_id}")
def delete_department(dept_id: int, db: Session = Depends(get_db)):
    dept = db.query(models.Department).filter(models.Department.id == dept_id).first()

    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")

    tickets = db.query(models.Ticket).filter(models.Ticket.assigned_department_id == dept_id).all()
    if tickets:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete department with assigned tickets."
        )

    db.delete(dept)
    db.commit()

    return {"message": "Department deleted successfully", "department_id": dept_id}


@router.get("/")
def get_departments(db: Session = Depends(get_db)):
    return db.query(models.Department).all()