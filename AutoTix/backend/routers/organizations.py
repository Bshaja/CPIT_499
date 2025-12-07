from fastapi import APIRouter, Depends , HTTPException
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models
from backend.schemas.organizations import OrgCreate

router = APIRouter(prefix="/organizations", tags=["Organizations"])

@router.post("/")
def create_organization(org: OrgCreate, db: Session = Depends(get_db)):
    new_org = models.Organization(
        name=org.name,
        description=org.description
    )
    db.add(new_org)
    db.commit()
    db.refresh(new_org)
    return new_org

@router.delete("/{org_id}")
def delete_organization(org_id: int, db: Session = Depends(get_db)):
    org = db.query(models.Organization).filter(models.Organization.id == org_id).first()

    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")

    deps = db.query(models.Department).filter(models.Department.organization_id == org_id).all()
    if deps:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete organization that still has departments."
        )

    db.delete(org)
    db.commit()

    return {"message": "Organization deleted successfully", "organization_id": org_id}

@router.get("/")
def get_organizations(db: Session = Depends(get_db)):
    return db.query(models.Organization).all()