from pydantic import BaseModel,
from datetime import date, time

class EventCreate(BaseModel):
    event_name: str
    events_location: str
    event_date: date
    event_time: time

class EventOut():
    event_name: str
    events_location: str
    event_date: date
    event_time: time


class EventList():
    page: int
    events: list[EventOut]



