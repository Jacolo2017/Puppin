from fastapi import APIRouter, Response, status
from pydantic import BaseModel
import psycopg

router = APIRouter()


class EventIn(BaseModel):
    event_name: str
    event_location: str
    event_date: str
    event_time: str

@router.post("/api/events")
def create_event(event: EventIn, response: Response, leader_id: int):
    print("at least we started")
    with psycopg.connect() as conn:
        print("we got to psyco connect")
        with conn.cursor() as cur:
            print("now we got to cur")
            print("gothere")
            cur.execute(
                """INSERT INTO events (account_id, event_name, event_location,
                    event_date, event_time)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING event_id;""",
                        [leader_id,
                            event.event_name,
                            event.event_location,
                            event.event_date,
                            event.event_time]
            )
            row = cur.fetchone()
            
            print("look here", row)
            record = {}
            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            print(record)
            try:
                cur.execute(
                    """INSERT INTO eventsusersjunction (event_id, account_id)
                        VALUES(%s, %s)
                    """, [row[0], leader_id]
                )
            except psycopg.errors.UniqueViolation:
                pass
            return record

@router.get("/api/events/{event_id}")
def get_event(event_id: int, response: Response):
    try:
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT event_name, event_location, event_date, event_time
                    FROM events
                    WHERE event_id = %s;
                    """, [event_id]
                )
                row = cur.fetchone()
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Event not found"}
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc.message)



# def row_to_event(row):
#     event = {
#         "id": row[0],
#         "event_name": row[1],
#         "event_location": row[2],
#         "event_accounts": row[3],
#         "event_date": row[4],
#         "event_time": row[5],
#     }
#     return event


# @router.post(
#     "api/postgres/event/create",
#     response_model=Union[EventOut, ErrorMessage],
#     responses ={
#         200: {"model": EventOut},
#         409: {"model": ErrorMessage},
#     }
# )

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

