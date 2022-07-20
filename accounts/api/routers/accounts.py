from sqlite3 import connect
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


class DogIn(BaseModel):
    dog_name: str
    dog_breed: str
    dog_age: int
    dog_gender: str
    dog_photo: str
    dog_temperament: str
    dog_about: str
    dog_size: str
    dog_weight: int
    spayed_neutered: bool
    vaccination_history: str
    account_id: int


class DogOut(BaseModel):
    dog_name: str
    dog_breed: str
    dog_age: int
    dog_gender: str
    dog_photo: str
    dog_temperament: str
    dog_about: str
    dog_size: str
    dog_weight: int
    spayed_neutered: bool
    vaccination_history: str
    account_id: int


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
    try:
        print("okay we tried")
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                        """
                        SELECT first_name, last_name, email, username,
                        date_of_birth, city, state, gender,
                            photo_url, about
                        FROM accounts
                        WHERE account_id = %s;
                        """, [account_id],
                    )
                row = cur.fetchone()
                print("lookhere", (cur.description))
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Account not found"}
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc.message)

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

@router.get("/api/accounts/{account_id}/events")
def get_associated_events_of_user(account_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT events.event_id, events.event_name
                FROM events
                WHERE
                events.account_id = %s

                """, [account_id]
            )
            results = []
            for row in cur.fetchall():
                record = {}
                print("whatever")
                for i, column in enumerate(cur.description):
                    print(i)
                    record[column.name] = row[i]
                    print(record)
                results.append(record)
            return results


@router.post("/api/dog/create")
def create_dog(dog: DogIn, response_model: DogOut):
    with psycopg.connect() as conn:
        with conn.cursor() as curr:
            curr.execute(
                """
                    INSERT INTO public.dogs (dog_name, dog_breed, dog_age,
                    dog_gender, dog_photo, dog_temperament, dog_about,
                    dog_size, dog_weight, spayed_neutered,
                    vaccination_history, account_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, FALSE, %s, %s)
                    RETURNING dog_id;
                """,
                [dog.dog_name, dog.dog_breed, dog.dog_age,
                    dog.dog_gender, dog.dog_photo,
                    dog.dog_temperament, dog.dog_about,
                    dog.dog_size, dog.dog_weight,
                    dog.vaccination_history,
                    dog.account_id]
                    )
            row = curr.fetchone()
            record = {}
            for i, column in enumerate(curr.description):
                record[column.name] = row[i]
            return record


@router.get("/api/dog/{dog_id}")
def get_dog(dog_id: int, response: Response):
    try:
        with psycopg.connect() as conn:
            with conn.cursor() as curr:
                curr.execute(
                    """SELECT dog_name, dog_breed, dog_age, dog_gender,
                                dog_photo, dog_temperament, dog_about,
                                dog_size, dog_weight, dog_medical_history,
                                account_id
                        FROM public.dogs
                        WHERE dog_id = %d;""",
                        [dog_id],
                )
        row = curr.fetchone()
        if row is None:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"message": "Dog not found"}
        record = {}
        for i, column in enumerate(curr.description):
            record[column.name] = row[i]
        return record
    except psycopg.InterfaceError as exc:
        print(exc.message)



@router.get("/api/accounts/{account_id}/dogs")
def get_account_dogs(account_id: int, response: Response):
    with psycopg.connection() as conn:
        with conn.cursor() as curr:
            try:
                curr.exectue("""
                    SELECT d.dog_id, d.dog_name, d.dog_about
                    FROM public.dogs AS d
                    LEFT JOIN public.accounts AS a
                        ON(d.account_id = a.account_id)
                """, [account_id])
                row = curr.fetchone()
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "No dogs registered yet"}
                record = {}
                for i, column in enumerate(curr.description):
                    record[column.name] = row[i]
                return record
            except psycopg.InterfaceError as exc:
                print(exc.message)

# This is a new line that ends the file.
