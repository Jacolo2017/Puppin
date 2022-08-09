import psycopg
from .pool import pool
from psycopg.errors import UniqueViolation
from pydantic import BaseModel
from fastapi import (
    APIRouter,
    Response,
    status,
    Depends,
    HTTPException,
    Cookie,
    Request,
)

from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")




class DuplicateUsername(RuntimeError):
    pass


class AccountQueries:
    class AccountIn(BaseModel):
        first_name: str
        last_name: str
        email: str
        username: str
        account_password: str
        date_of_birth: str
        city: str
        state: str
        gender: str
        photo_url: str
        about: str
    def insert_account(
        first_name,
        last_name,
        email,
        username,
        account_password,
        date_of_birth,
        city,
        state,
        gender,
        photo_url,
        about,
    ):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                            INSERT INTO accounts(
                                first_name, last_name, email, username,
                                account_password, date_of_birth, city, state,
                                gender, photo_url, about)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,)
                            RETURNING first_name, last_name, email, username,
                                account_password, date_of_birth, city, state,
                                gender, photo_url, about
                            """,
                        [
                            first_name,
                            last_name,
                            email,
                            username,
                            account_password,
                            date_of_birth,
                            city,
                            state,
                            gender,
                            photo_url,
                            about,
                        ],
                    )
                    return cur.fetchall()
                except UniqueViolation:
                    raise DuplicateUsername

    def get_account_from_username(self, username: str):
        with pool.connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT
                        a.account_id,
                        a.username,
                        a.account_password
                    FROM accounts AS a
                    WHERE a.username = %s
                    """,
                    [username],
                )
                account = cursor.fetchone()
                return account

    def get_user(self, username:str):
        row = self.get_account_from_username(username)
        if not row:
            return None
        return {"id": row[0], "username": row[1], "account_password": row[2]}

    def create_account(self,
                    username,
                    email, 
                    account_password, 
                    first_name, 
                    last_name,
                    date_of_birth, 
                    city, 
                    state, 
                    gender, 
                    photo_url, 
                    about, 
                    response: Response):
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """INSERT INTO accounts (first_name, last_name, email, username,
                            account_password, date_of_birth, city, state, gender,
                            photo_url, about)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING account_id;
                        """,
                        [
                            first_name,
                            last_name,
                            email,
                            username,
                            account_password,
                            date_of_birth,
                            city,
                            state,
                            gender,
                            photo_url,
                            about,
                        ],
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
