from pydantic import BaseModel

class DeptCreate(BaseModel):
    organization_id: int
    name: str
    description: str | None = None