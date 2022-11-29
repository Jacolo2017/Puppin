from fastapi import FastAPI
from routers.accounts import router as a
from routers.events import  router as e
from routers.reviews import router as r
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI()


origins = [
    "http://localhost:3000",
    "http://purely-puptonic.gitlab.io",
    "https://purely-puptonic.gitlab.io",
    "http://puppin.herokuapp.com",
    "https://puppin.herokuapp.com",
    os.environ.get("REACT_APP_PUPPIN_HOST", None),
    os.environ.get("CORS_HOST", None),
    os.environ.get("PUBLIC_URL", None),
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


app.include_router(a)
app.include_router(e)
app.include_router(r)
