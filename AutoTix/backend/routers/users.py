from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
from backend import models
from backend.schemas.users import UserCreate
from backend.auth_utils import hash_password
from backend.schemas.users import UserLogin
from backend.auth_utils import verify_password, create_access_token
from fastapi import HTTPException
router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/")
def create_user_api(user: UserCreate, db: Session = Depends(get_db)):

    new_user = models.User(
        uid=user.uid,
        email=user.email,
        display_name=user.display_name,
        department_id=user.department_id,
        organization_id=user.organization_id,
        role=user.role,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = create_access_token(
        data={"uid": db_user.uid, "role": db_user.role}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "uid": db_user.uid,
            "email": db_user.email,
            "display_name": db_user.display_name,
            "role": db_user.role
        }
    }

