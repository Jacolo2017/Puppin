from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from routers import accounts

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.include_router(accounts.router)
