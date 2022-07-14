from pydantic import BaseModel,
from datetime import date, time
from .profiles import ProfileOut

class EventCreate(BaseModel):
    event_name: str
    events_location: str
    event_date: date
    event_time: time

class EventOut(BaseModel):
    event_name: str
    events_location: str
    event_date: date
    event_time: time

class EventUpdate()
    event_name: str
    events_location: str
    event_date: date
    event_time: time
    event_accounts: list[ProfileOut]


class EventList(BaseModel):
    page: int
    events: list[EventOut]



