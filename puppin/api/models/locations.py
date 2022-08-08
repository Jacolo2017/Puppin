from pydantic import BaseModel,
from datetime import date

class LocationCreate(BaseModel):
    location_nickname: str
    location_address: str
    location_street: str
    location_city: str
    location_state: str
    location_zip : int

class LocationOut(BaseModel):
    location_id: int
    location_nickname: str
    location_address: str
    location_street: str
    location_city: str
    location_state: str
    location_zip : int

class LocationUpdate(BaseModel):
    location_id: int
    location_nickname: str
    location_address: str
    location_street: str
    location_city: str
    location_state: str
    location_zip : int

class LocationList(BaseModel):
    page: int
    locations: list[LocationOut]