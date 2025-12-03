from pydantic import BaseModel

class UserCreate(BaseModel):
    uid: str
    email: str
    display_name: str | None = None
    password: str
    department_id: int | None = None
    organization_id: int
    role: str | None = "user"


class UserLogin(BaseModel):
    email: str
    password: str