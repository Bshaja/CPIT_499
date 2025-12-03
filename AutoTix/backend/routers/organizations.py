from fastapi import APIRouter, Depends
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