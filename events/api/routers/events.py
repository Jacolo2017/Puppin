from datetime import datetime
from xmlrpc.client import DateTime
from fastapi import APIRouter, Response, status, Depends
from pydantic import BaseModel
import psycopg

router = APIRouter()


class EventIn(BaseModel):
    event_name: str
    event_location: str
    event_date_time: datetime



@router.get("/api/events")
def events_list(page: int= 0):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT event_id, event_name, event_date_time, account_id
                FROM events
                ORDER BY event_id
                LIMIT 100 OFFSET %s;
            """,
                [page * 100],
            )
            results = []
            for row in cur.fetchall():
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                results.append(record)
            cur.execute(
                """
                SELECT COUNT(*) FROM accounts;
            """
            )
            raw_count = cur.fetchone()[0]
            page_count = (raw_count // 100) + 1
            print("goated")
            # return Accounts(page_count=page_count, accounts=results)
            return results




@router.post("/api/events/{leader_id}/{dog_id}")
def create_event(event: EventIn, response: Response, leader_id: int, dog_id: int):
    print("at least we started")
    with psycopg.connect() as conn:
        print("we got to psyco connect")
        with conn.cursor() as cur:
            list_of_all_dogvalues = [value for elem in get_account_dogs(leader_id, response) for value in elem.values()]
            if dog_id in list_of_all_dogvalues:
                print("now we got to cur")
                print("gothere")
                cur.execute(
                    """INSERT INTO events (account_id, event_name, event_location,
                        event_date_time)
                        VALUES (%s, %s, %s, %s)
                        RETURNING event_id;""",
                            [leader_id,
                                event.event_name,
                                event.event_location,
                                event.event_date_time]
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
                    cur.execute("""INSERT INTO dogsinevents (event_id, account_id, dog_id)
                    VALUES(%s, %s, %s)
                    """, [row[0], leader_id, dog_id])
                except psycopg.errors.UniqueViolation:
                    pass
                return record
            else:
                return {"this aint yo dog wtf u doin!"}

@router.get("/api/events/{event_id}")
def get_event(event_id: int, response: Response):
    try:
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT event_name, event_location, event_date_time
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

@router.get("/api/events/{event_id}/users")
def get_all_users_and_dogs_from_event(event_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT euj.account_id, accounts.first_name, dogs.dog_name, dogs.dog_photo
                FROM eventsusersjunction AS euj
                INNER JOIN accounts ON euj.account_id = accounts.account_id
                INNER JOIN dogsinevents ON euj.account_id = dogsinevents.account_id
                INNER JOIN dogs ON dogsinevents.dog_id = dogs.dog_id
                WHERE euj.event_id = %s;
                """, [event_id])
                   
            results = []
            for row in cur.fetchall():
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                results.append(record)
                print("get_all_users_from_event output: ", results)
            return results


@router.get("/api/events/myevents={account_id}/")
def get_all_events_by_user(
    response: Response,
    account_id: int
):
    print("ping")
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT event_id, event_name, event_date_time, account_id
                FROM events
                WHERE account_id = %s;
                """, [account_id]
            )
            results = []
            rows = cur.fetchall()
            for row in rows:
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                results.append(record)
            if rows is None:
                response.status_code = status.HTTP_404_NOT_FOUND
                return {"message": "User has no events"}
            return results



@router.post("/api/events/{event_id}/") 
def join_event(event_id: int, account_id: int, response: Response, dog_id: int):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            list_of_all_dogvalues = [value for elem in get_account_dogs(account_id, response) for value in elem.values()]
            if dog_id in list_of_all_dogvalues:
                try:
                    cur.execute(
                        """
                        INSERT INTO eventsusersjunction (event_id, account_id)
                        VALUES(%s, %s)
                        RETURNING event_id;""", [event_id, account_id]
                    )
                    record = {}
                    row = cur.fetchone()
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    cur.execute("""INSERT INTO dogsinevents (event_id, account_id, dog_id)
                    VALUES(%s, %s, %s)
                    """, [event_id, account_id, dog_id])
                    
                    return record
                except psycopg.errors.UniqueViolation:
                    return {"duplicate join"}
            else:
                return {"You don't own this dog, wtf u doin!"}

@router.post("/api/events/{event_id}/dogs")
def add_dog_to_event(event_id: int, account_id, dog_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            list_of_all_dogvalues = [value for elem in get_account_dogs(event_id, response) for value in elem.values()]
            if account_id in get_all_users_from_event(event_id) and dog_id in list_of_all_dogvalues:
                cur.execute("""INSERT INTO dogsinevents (event_id, account_id, dog_id)
                    VALUES(%s, %s, %s)
                    RETURNING dog_id, event_id, acount_id
                    """, [event_id, account_id, dog_id])
            record = {}
            row = cur.fetchone()
            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
                return record


def get_account_dogs(account_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as curr: 
            curr.execute("""
                SELECT d.dog_id, d.dog_name, d.dog_about
                FROM public.dogs AS d
                    WHERE (d.account_id = %s)
            """, [account_id])
            results = []
            for row in curr.fetchall():
                record = {}
                print("whatever")
                for i, column in enumerate(curr.description):
                    print(i)
                    record[column.name] = row[i]
                    print(record)
                results.append(record)
            return results

            
# need to check that dog belongs to you when adding it to event. accoutn for adddogto event, joinevent, create event
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

