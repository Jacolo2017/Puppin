from sqlite3 import connect
from unittest import result
from fastapi import (
    APIRouter,
    Response,
    status,
    Depends,
    HTTPException,
    Cookie,
    Request,
)
from pydantic import BaseModel
from models.common import ErrorMessage
from typing import Union, Optional
import psycopg
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from db.accounts import AccountQueries
from db.dogs import DogQueries
from jose import JWTError, jwt, jws, JWSError
from passlib.context import CryptContext
import os


SIGNING_KEY = os.environ["SIGNING_KEY"]
ALGORITHM = "HS256"
COOKIE_NAME = "fastapi_access_token"


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token",  auto_error=False)


class HttpError(BaseModel):
    detail: str


class TokenData(BaseModel):
    username: str


class AccessToken(BaseModel):
    token: str


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


class AccountOut(BaseModel):
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


class Accounts(BaseModel):
    id: int
    user: str
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


class DogUpdate(BaseModel):
    dog_name: Optional[str] = None
    dog_breed: Optional[str] = None
    dog_age: Optional[int] = None
    dog_gender: Optional[str] = None
    dog_photo: Optional[str] = None
    dog_temperament: Optional[str] = None
    dog_about: Optional[str] = None
    dog_size: Optional[str] = None
    dog_weight: Optional[int] = None
    spayed_neutered: Optional[bool] = None
    vaccination_history: Optional[str] = None


class Dogs(BaseModel):
    dog_name: str

class DogDelete(BaseModel):
    result: bool


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User is the current logged in account


def verify_password(password, hashed_password):
    return pwd_context.verify(password, hashed_password)


def authenticate_user(repo: AccountQueries, username: str, account_password: str):
    user = repo.get_user(username)
    if not user:
        return False
    if not verify_password(account_password, user["account_password"]):
        return False
    return user


def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SIGNING_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.get("/api/currentuser/{cookie_token}")
async def get_current_user(
    bearer_token: Optional[str] = Depends(oauth2_scheme),
    cookie_token: Optional[str] | None = (
        Cookie(default=None, alias=COOKIE_NAME)
    ),
    repo: AccountQueries = Depends(),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = bearer_token
    if not token and cookie_token:
        token = cookie_token
    try:
        payload = jwt.decode(token, SIGNING_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
    except (JWTError, AttributeError):
        raise credentials_exception
    user = repo.get_user(username)
    if user is None:
        raise credentials_exception
    return user  # User is the active account user


@router.post("/token")
async def login_for_access_token(
    response: Response,
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    repo: AccountQueries = Depends(),
):
    print(form_data)
    user = authenticate_user(repo, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user["username"]},
    )
    token = {"access_token": access_token, "token_type": "bearer"}
    headers = request.headers
    samesite = "none"
    secure = True
    if "origin" in headers and "localhost" in headers["origin"]:
        samesite = "lax"
        secure = False
    response.set_cookie(
        key=COOKIE_NAME,
        value=access_token,
        httponly=True,
        samesite=samesite,
        secure=secure,
    )
    return token


@router.get("/token", response_model=AccessToken)
async def get_token(request: Request):
    if COOKIE_NAME in request.cookies:
        return {"token": request.cookies[COOKIE_NAME]}


@router.delete("/token")
async def logout(request: Request, response: Response):
    samesite = "none"
    secure = True
    if (
        "origin" in request.headers
        and "localhost" in request.headers["origin"]
    ):
        samesite = "lax"
        secure = False
    response.delete_cookie(
        key=COOKIE_NAME,
        httponly=True,
        samesite=samesite,
        secure=secure,
    )

# @router.post("/api/create-user/{user_id}")
# def createAccount(user_id: int, username: str, password: str):
#     with psycopg.connect() as conn:
#         with conn.cursor() as cur:

@router.post("/api/accounts")
def create_account(account: AccountIn, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            try:
                hashed_password = pwd_context.hash(account.account_password)
                cur.execute(
                    """INSERT INTO accounts (first_name, last_name, email, username,
                        account_password, date_of_birth, city, state, gender,
                        photo_url, about)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING account_id;
                """,
                    [account.first_name, account.last_name,
                        account.email, account.username,
                        hashed_password, account.date_of_birth,
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
def create_dog(dog: DogIn, user: Accounts = Depends(get_current_user)):
    print("create_dog ping")
    with psycopg.connect() as conn:
        with conn.cursor() as curr:
            curr.execute(
                """
                    INSERT INTO public.dogs (dog_name, dog_breed, dog_age,
                    dog_gender, dog_photo, dog_temperament, dog_about,
                    dog_size, dog_weight, spayed_neutered,
                    vaccination_history, account_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %b, %s, %s)
                    RETURNING dog_id;
                """,
                [dog.dog_name, dog.dog_breed, dog.dog_age,
                    dog.dog_gender, dog.dog_photo,
                    dog.dog_temperament, dog.dog_about,
                    dog.dog_size, dog.dog_weight, dog.spayed_neutered,
                    dog.vaccination_history,
                    user['id']]
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
                                dog_size, dog_weight, spayed_neutered,
                                vaccination_history, account_id
                        FROM dogs
                        WHERE dog_id = %s;""",
                    [dog_id],
                )
                row = curr.fetchone()
                print(row)
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Dog not found"}
                record = {}
                for i, column in enumerate(curr.description):
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc)


@router.put("api/dog/{dog_id}", response_model=DogUpdate)
def update_dog(dog_id: str, dog: DogUpdate):
    with psycopg.connect() as conn:
        with conn.cursor() as curr:
            curr.execute(
                """
                INSERT INTO public.dogs (dog_name, dog_breed, dog_age,
                    dog_gender, dog_photo, dog_temperament, dog_about,
                    dog_size, dog_weight, spayed_neutered,
                    vaccination_history)
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                [dog.dog_name, dog.dog_breed, dog.dog_age,
                    dog.dog_gender, dog.dog_photo,
                    dog.dog_temperament, dog.dog_about,
                    dog.dog_size, dog.dog_weight,
                    dog.vaccination_history]
            )
            row = curr.fetchone()
            record = {}
            for i, column in enumerate(curr.description):
                record[column.name] = row[i]
            return record



@router.get("/api/accounts/{account_id}/dogs")
def get_account_dogs(account_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as curr: 
            curr.execute("""
                SELECT d.dog_id, d.dog_name, d.dog_about
                FROM public.dogs AS d
                    WHERE (d.account_id = %s)
            """, [account_id])
            results = []
            for row in curr.fetchall():
                record = {}
                print("whatever")
                for i, column in enumerate(curr.description):
                    print(i)
                    record[column.name] = row[i]
                    print(record)
                results.append(record)
            return results


@router.delete("/api/accounts/{account_id}/dogs/{dog_id}")
def delete_dog(dog: Dogs, account_id: int, dog_id: int, query=Depends(DogQueries)):
    if query.delete_dog(dog_id):
        return {"result": True}
    else:
        return {"result": False}
    
                # """
                #     DELETE FROM public.dogs
                #     WHERE dog_id = %s && account_id == %s && dog_name == %s
                # """,
                # [dog.dog_id, dog.account_id, dog.dog_name]
            

# This is a new line that ends the file.
