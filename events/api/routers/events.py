from fastapi import APIRouter, Response, status
from pydantic import BaseModel
import psycopg

router = APIRouter()

def row_to_event(row):
    event = {
        "id": row[0],
        "event_name": row[1],
        "event_location": row[2],
        "event_accounts": row[3],
        "event_date": row[4],
        "event_time": row[5],
    }
    return event


@router.post(
    "api/postgres/event/create",
    response_model=Union[EventOut, ErrorMessage],
    responses ={
        200: {"model": EventOut},
        409: {"model": ErrorMessage},
    }
)

# def createEvent(
#     event: EventIn,
#     response: Response,
#     query=Depends(EventQuerries),
# ):
#     try:
#         row = query.insert_event(event.event_name)
#         return row_to_event(row)
#     except DuplicateName:
#         response.status_code = status.HTTP_409_CONFLICT
#         return {"message": f"Event already named {event.event_name}!"}



# @router.put("/api/events/{event_id}")
# def addAttendee(account_id: int, event_id: int response: Response):
#     with psycopg.connect() as conn:
#         with conn.cursor() as cur:
#             cur.execute(
#                 f"""
#                 UPDATE events
#                 SET attendees = %s
#                 WHERE events_id = %s
#                 """,
#                     [account_id, event_id],
#             )
            