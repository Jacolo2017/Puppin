from fastapi import FastAPI
from routers import accounts, events, reviews
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()


origins = [
    "http://localhost:3000",
    "https://purely-puptonic.gitlab.io/puppin/",
    "https://puppin.herokuapp.com/",
]
# os.environ.get("CORS_HOST", None),
# os.environ["CORS_HOST"],

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
