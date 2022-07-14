from fastapi import APIRouter, Response, status
from pydantic import BaseModel
import psycopg

router = APIRouter()

