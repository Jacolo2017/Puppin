from fastapi import APIRouter, Response, status, Depends
from pydantic import BaseModel
from models.common import ErrorMessage
from typing import Union
import psycopg

router = APIRouter()


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str
    date_of_birth: str
    city: str
    state: str
    gender: str
    photo_url: str
    about: str


class AccountOut(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    date_of_birth: str
    city: str
    state: str
    gender: str
    photo_url: str
    about: str


class Accounts(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str

# @router.post("/api/create-user/{user_id}")
# def createAccount(user_id: int, username: str, password: str):
#     with psycopg.connect() as conn:
#         with conn.cursor() as cur:

@router.post("/api/accounts")
def create_account(account: AccountIn, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """INSERT INTO accounts (first_name, last_name, email, username,
                        password, date_of_birth, city, state, gender,
                        photo_url, about)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING account_id;
                """,
                    [account.first_name, account.last_name,
                        account.email, account.username,
                        account.password, account.date_of_birth,
                        account.city, account.state,
                        account.gender, account.photo_url,
                        account.about]
                )
            except psycopg.errors.UniqueViolation:
                # status values at https://github.com/encode/starlette/blob/master/starlette/status.py
                response.status_code = status.HTTP_409_CONFLICT
                return {
                    "message": "That usernames taken dawg",
                }
            row = cur.fetchone()
            record = {}
            print(type(record))
            print(type(row))

            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record

@router.get("/api/accounts/{account_id}")
def get_account(account_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT first_name, last_name, email, username,
                date_of_birth, city, state, gender,
                    photo_url, about
                FROM accounts
                WHERE account_id = %s
                """, [account_id],
            )
        row = cur.fetchone()
        if row is None:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"message": "Category not found"}
        record = {}
        for i, column in enumerate(cur.description):
            record[column.name] = row[i]
        return record

@router.get("/api/accounts")
def accounts_list(page: int = 0):
    # Uses the environment variables to connect
    # In development, see the docker-compose.yml file for
    #   the PG settings in the "environment" section
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT account_id, first_name, last_name, email, username
                FROM accounts
                ORDER BY account_id
                LIMIT 100 OFFSET %s;
            """,
                [page * 100],
            )

            results = []
            for row in cur.fetchall():
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                results.append(record)

            cur.execute(
                """
                SELECT COUNT(*) FROM accounts;
            """
            )
            raw_count = cur.fetchone()[0]
            page_count = (raw_count // 100) + 1
            print("goated")
            # return Accounts(page_count=page_count, accounts=results)
            return results

# This is a new line that ends the file.