from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware
from routers import events, reviews
app = FastAPI()

app.include_router(events.router)
app.include_router(reviews.router)

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
