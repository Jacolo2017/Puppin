from fastapi import APIRouter, Response, status
from pydantic import BaseModel
import psycopg

router = APIRouter()


@router.post("/api/create-user/{user_id}")
def createAccount(user_id: int, username: str, password: str):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            try:

