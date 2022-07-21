<<<<<<< HEAD
from fastapi import FastAPI
=======
from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
>>>>>>> bd18f6439613b674e520613d5539ff331da5061a
from routers import accounts
from fastapi.middleware.cors import CORSMiddleware
import os
app = FastAPI()

<<<<<<< HEAD
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

=======
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
>>>>>>> bd18f6439613b674e520613d5539ff331da5061a

app.include_router(accounts.router)
