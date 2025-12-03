from pydantic import BaseModel

class OrgCreate(BaseModel):
    name: str
    description: str | None = None