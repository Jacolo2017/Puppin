from datetime import datetime
from xmlrpc.client import DateTime
from fastapi import APIRouter, Response, status, Depends
from pydantic import BaseModel
import psycopg
from db.pool import pool
router = APIRouter()


class EventIn(BaseModel):
    event_name: str
    event_location: str
    event_date_time: datetime


@router.get("/api/events")
def events_list(page: int = 0):
    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT event_id, event_name, event_date_time, events.account_id, accounts.username
                FROM events
                INNER JOIN accounts ON
                events.account_id = accounts.account_id
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
            list_of_all_dogvalues = [
                value
                for elem in get_account_dogs(leader_id, response)
                for value in elem.values()
            ]
            if dog_id in list_of_all_dogvalues:
                print("now we got to cur")
                print("gothere")
                cur.execute(
                    """INSERT INTO events (account_id, event_name, event_location,
                        event_date_time)
                        VALUES (%s, %s, %s, %s)
                        RETURNING event_id;""",
                    [
                        leader_id,
                        event.event_name,
                        event.event_location,
                        event.event_date_time,
                    ],
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
                        """,
                        [row[0], leader_id],
                    )
                    cur.execute(
                        """INSERT INTO dogsinevents (event_id, account_id, dog_id)
                    VALUES(%s, %s, %s)
                    """,
                        [row[0], leader_id, dog_id],
                    )
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
                    SELECT event_id, event_name, event_location, event_date_time
                    FROM events
                    WHERE event_id = %s;
                    """,
                    [event_id],
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


@router.get("/api/events/{event_id}/usersdogs")
def get_all_users_and_dogs_from_event(event_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT euj.account_id, accounts.first_name, dogs.dog_name, dogs.dog_photo, dogs.dog_id, accounts.username, euj.event_id
                FROM eventsusersjunction AS euj
                INNER JOIN accounts ON euj.account_id = accounts.account_id
                INNER JOIN dogsinevents ON euj.account_id = dogsinevents.account_id
                INNER JOIN dogs ON dogsinevents.dog_id = dogs.dog_id
                WHERE euj.event_id = %s;
                """,
                [event_id],
            )

            results = []
            for row in cur.fetchall():
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                results.append(record)
            i = 0
            while i < len(results) - 1:
                if results[i] in results:
                    del results[i]
                i += 1
                print("get_all_users_from_event output: ", results)
            return results


# @router.get("/api/events/{event_id}/users")
# def get_all_users_from_event(event_id: int, response: Response):
#     with psycopg.connect() as conn:
#         with conn.cursor() as cur:
#             cur.execute(
#                 """
#                 SELECT euj.account_id, accounts.username
#                 FROM eventsusersjunction AS euj
#                 INNER JOIN accounts ON accounts.account_id = euj.event_id

#                 """

# do we need this?
@router.get("/api/events/myevents={account_id}/")
def get_all_events_by_user(response: Response, account_id: int):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT e.event_id, e.event_name, e.event_date_time
                FROM events AS e
                INNER JOIN eventsusersjunction AS euj ON e.event_id = euj.event_id
                WHERE euj.account_id = %s OR e.account_id = %s
                """,
                [account_id, account_id],
            )
            results = []
            rows = cur.fetchall()
            for row in rows:
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                results.append(record)
            i = 0
            while i < len(results) - 1:
                if results[i] == results[i + 1]:
                    del results[i]
                i += 1
            # cur.execute(
            #     """
            #     SELECT e.event_id, e.event_name, e.event_date_time
            #     FROM events AS e
            #     WHERE euj.account_id = account_id
            #     """, [account_id])
            # rows = cur.fetchall()
            # record = {}
            # for i, column in enumerate(cur.description):
            #     record[column.name] = row[i]
            #     results.append(record)
            if rows is None:
                response.status_code = status.HTTP_404_NOT_FOUND
                return {"message": "User has no events"}
            print(results)
            return results


@router.post("/api/events/{event_id}/")
def join_event(event_id: int, account_id: int, response: Response, dog_id: int):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            list_of_all_dogs_user_has = [
                value
                for elem in get_account_dogs(account_id, response)
                for value in elem.values()
            ]
            # list_of_all_dogs_in_event = [d['dog_id'] for d in get_all_users_and_dogs_from_event(event_id, response) if 'dog_id' in d]
            list_of_all_dogs_in_event = [
                value
                for elem in dogs_from_events(event_id, response)
                for value in elem.values()
            ]
            list_of_all_users_in_event = [
                value
                for elem in accounts_in_events(event_id, response)
                for value in elem.values()
            ]
            print("this is a print", list_of_all_dogs_in_event)
            if (
                dog_id in list_of_all_dogs_user_has
                and dog_id not in list_of_all_dogs_in_event
                and account_id not in list_of_all_users_in_event
            ):
                try:
                    cur.execute(
                        """
                        INSERT INTO eventsusersjunction (event_id, account_id)
                        VALUES(%s, %s)
                        RETURNING event_id;""",
                        [event_id, account_id],
                    )
                    record = {}
                    row = cur.fetchone()
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    cur.execute(
                        """INSERT INTO dogsinevents (event_id, account_id, dog_id)
                    VALUES(%s, %s, %s)
                    """,
                        [event_id, account_id, dog_id],
                    )

                    return record
                except psycopg.errors.UniqueViolation:
                    return {"duplicate join"}
            elif (
                dog_id not in list_of_all_dogs_user_has
                and dog_id in list_of_all_dogs_in_event
                and account_id in list_of_all_users_in_event
            ):
                return {
                    "You don't own this dog, wt* u doin! ALSO the dog IS ALREADY IN THE EVENT.YOURE ALSO ALREADY IN IT DUDE. Uyou messed up! THIS A RARE error. "
                }
            elif account_id in list_of_all_users_in_event:
                return {"you're already in the DANG event"}
            elif dog_id in list_of_all_dogs_user_has:
                return {"THIS AIINT YOOOOO DOOGGGG"}
            elif dog_id in list_of_all_dogs_in_event:
                return {"this. dog. is. ALREADY IN THIS EVENT"}
            else:
                return {
                    "I take it back, this is the rarest error. I dont even know how you get it."
                }


@router.get("/api/events/{event_id}/dogs")
def dogs_from_events(event_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT dogsinevents.dog_id
                FROM public.dogsinevents
                WHERE (dogsinevents.event_id = %s)
                """,
                [event_id],
            )
            results = []
            for row in cur.fetchall():
                record = {}
                print("whatever")
                for i, column in enumerate(cur.description):
                    print(i)
                    record[column.name] = row[i]
                    print(record)
                results.append(record)
            return results


@router.get("/api/events/{event_id}/attendees")
def accounts_in_events(event_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT eventsusersjunction.account_id
                FROM public.eventsusersjunction
                WHERE (eventsusersjunction.event_id = %s)
                """,
                [event_id],
            )
            results = []
            for row in cur.fetchall():
                record = {}
                print("whatever")
                for i, column in enumerate(cur.description):
                    print(i)
                    record[column.name] = row[i]
                    print(record)
                results.append(record)
            return results


@router.post("/api/events/{event_id}/dogs")
def add_dog_to_event(event_id: int, account_id, dog_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            list_of_all_dogvalues = [
                value
                for elem in get_account_dogs(event_id, response)
                for value in elem.values()
            ]
            if (
                account_id in get_all_users_and_dogs_from_event(event_id)
                and dog_id in list_of_all_dogvalues
            ):
                cur.execute(
                    """INSERT INTO dogsinevents (event_id, account_id, dog_id)
                    VALUES(%s, %s, %s)
                    RETURNING dog_id, event_id, acount_id
                    """,
                    [event_id, account_id, dog_id],
                )
            record = {}
            row = cur.fetchone()
            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
                return record


def get_account_dogs(account_id: int, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as curr:
            curr.execute(
                """
                SELECT d.dog_id, d.dog_name, d.dog_about
                FROM public.dogs AS d
                    WHERE (d.account_id = %s)
            """,
                [account_id],
            )
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
