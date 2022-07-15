from fastapi import APIRouter, Response, status, Depends
from pydantic import BaseModel
from accounts.api.db.accounts import DuplicateUsername
from models.accounts import AccountCreateIn, AccountOut
from models.common import ErrorMessage
from db.accounts import AccountQueries
from typing import Union
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


# Create new Account
@router.post(
    "/api/accounts/create",
    response_model=Union[AccountOut, ErrorMessage],
    responses={
        200: {"model": AccountOut},
        404: {"model": ErrorMessage},
        409: {"model": ErrorMessage},
    },
)
def create_account(
    account: AccountCreateIn, response: Response, query=Depends(AccountQueries)
):
    try:
        row = query.insert_account(
            account.first_name,
            account.last_name,
            account.username,
            account.email,
            account.account_password,
            account.date_of_birth,
            account.city,
            account.state,
            account.gender,
            account.photo_url,
            account.about,
        )
        return row_to_account(row)

        pass
    except DuplicateUsername:
        return {"message": f"{account.username} username taken, be more clever next time!"}
