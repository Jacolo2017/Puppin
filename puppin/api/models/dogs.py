from multiprocessing.reduction import steal_handle
from xml.dom import DOMSTRING_SIZE_ERR
from pydantic import BaseModel
from datetime import date
from typing import Union


class DogCreateIn(BaseModel):
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


class DogUpdateIn(BaseModel):
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


class DogOut(BaseModel):
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
