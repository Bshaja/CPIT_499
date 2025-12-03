from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from backend.database import get_db
from backend import models
from backend.auth_utils import verify_password, create_access_token


router = APIRouter(prefix="/auth", tags=["Auth"])


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    # 1) البحث عن المستخدم
    user = db.query(models.User).filter(models.User.email == data.email).first()

    if not user:
        return {"error": "Invalid email or password"}

    # 2) التحقق من كلمة المرور
    if not verify_password(data.password, user.password_hash):
        return {"error": "Invalid email or password"}

    # 3) إنشاء توكن
    token = create_access_token({"uid": user.uid, "role": user.role})

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "uid": user.uid,
            "email": user.email,
            "role": user.role,
            "department_id": user.department_id
        }
    }