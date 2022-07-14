from pydantic import BaseModel
from datetime import date

class AccountCreateIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    date_of_birth = date 

class AccountUpdateOut(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    date_of_birth = date







    