from pydantic import BaseModel
from datetime import date


class ProfileOut(BaseModel):
    first_name: str
    last_name: str
    date_of_birth = date 
    dog_name: str
    dog_breed: str
    dog_age: str
    dog_gender: str
    dog_photo: str
    dog_temperament: str
    dog_about: str
    dog_size: str
    dog_weight: int
    spayed_neutered: bool
    vaccination_history: str

class ProfileList(BaseModel):
    page_count: int
    profiles: list[ProfileOut]

    