from pydantic import BaseModel

class TicketCreate(BaseModel):
    title: str
    description: str
    email: str
    priority: str | None = "medium"

class TicketStatusUpdate(BaseModel):
    status: str