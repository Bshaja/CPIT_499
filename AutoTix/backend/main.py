from fastapi import FastAPI
from backend.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

from backend import models

# Routers
from backend.routers.organizations import router as org_router
from backend.routers.departments import router as dept_router
from backend.routers.users import router as user_router
from backend.routers.tickets import router as ticket_router
from backend.routers.auth import router as auth_router
from backend.routers.reports import router as reports_router
from backend.routers.ai import router as ai_router

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(org_router)
app.include_router(dept_router)
app.include_router(user_router)
app.include_router(ticket_router)
app.include_router(reports_router)
app.include_router(ai_router)


@app.get("/")
def home():
    return {"message": "AutoTix API is running!"}
