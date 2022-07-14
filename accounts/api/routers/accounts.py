from fastapi import APIRouter, Response, status
from pydantic import BaseModel
import psycopg

router = APIRouter()


# @router.post("/api/create-user/{user_id}")
# def createAccount(user_id: int, username: str, password: str):
#     with psycopg.connect() as conn:
#         with conn.cursor() as cur:
            
def row_to_account(row):
    return {
        "account_id": row[0],
        "first_name": row[1],
        "last_name": row[2],
        "email": row[3],
        "username": row[4],
        "password": row[5],
        "date_of_birth": row[6],
    }

@router.get(
    "api/puppin/accounts",
    response_model=AccountsList,
)
def get_accounts(query=Depends(AccountQueries)):
    rows = get.