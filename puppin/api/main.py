from fastapi import FastAPI
from fastapi.security import OAuth2PasswordBearer
from routers import accounts, events, reviews
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()


origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(accounts.router)
app.include_router(events.router)
app.include_router(reviews.router)