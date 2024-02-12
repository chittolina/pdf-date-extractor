from fastapi import FastAPI, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from app.api.api import api_router

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version="0.1.0",
    contact={"name": settings.author_name, "email": settings.author_email},
)

app.mount(
    f"/{settings.public_folder}",
    StaticFiles(directory=settings.public_folder),
    name=settings.public_folder,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
