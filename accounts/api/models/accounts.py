from multiprocessing.reduction import steal_handle
from pydantic import BaseModel
from typing import Union

class AccountCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    date_of_birth = date | None
    