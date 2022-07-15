from pydantic import BaseModel
from datetime import date

class AccountCreateIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    account_password: str
    date_of_birth = date
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
    date_of_birth = date
    city: str
    state: str
    gender: str
    photo_url: str
    about: str

class AccountsList(BaseModel):








    