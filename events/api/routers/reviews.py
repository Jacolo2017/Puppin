from .events import get_all_users_from_event
from fastapi import APIRouter, Response, status, Depends
from pydantic import BaseModel
from typing import Union
import psycopg



router = APIRouter()


class EventReviewIn(BaseModel):
    reviewer_username: str
    account_id: int
    review_event_id: int
    review_event: str
    review_description: str
    attendee_rating: bool
    location_zip: int
    location_rating: int



@router.post("/api/event/reviews/create")
def create_event_review(review: EventReviewIn, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """ INSERT INTO reviews (reviewer_username, account_id, 
                        event_id, review_event, review_description, attendee_rating,
                        location_zip, location_rating)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING account_id;
                """,
                    [review.reviewer_username, review.account_id, review.review_event_id,
                    review.review_event, review.review_description, review.attendee_rating, 
                    review.location_zip, review.location_rating]
                )
            except psycopg.errors.UniqueViolation:
                # status values at https://github.com/encode/starlette/blob/master/starlette/status.py
                response.status_code = status.HTTP_409_CONFLICT
                return {
                    "message": "Already reviewed"
                }
            row = cur.fetchone()
            record = {}

            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record



@router.get("/api/event/reviews/{review_id}")
def get_review(review_id: int, response: Response):
    try:
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                        """
                        SELECT (review_id, reviewer_username, account_id, 
                        review_event, event_id, attendee_rating, review_description, 
                        location_zip, location_rating)
                        FROM reviews
                        WHERE review_id = %s;
                        """, [review_id],
                    )
                row = cur.fetchone()
                print(cur.description)
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Review not found"}
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc.message)

@router.post("/api/event/reviews/{reviewed_id}/{reviewer_id}")
def rate_person_in_attended_event(reviewer_id: int, reviewed_id: int, event_id: int, rating: bool, response: Response):
    with psycopg.connect() as conn:
            with conn.cursor() as cur:
                # print(any(reviewed_id == reviewer_id for reviewed_id in get_all_users_from_event(event_id, response)))
                # if any(x == reviewer_id for x in get_all_users_from_event(event_id, response)) and any(x == reviewed_id for x in 
                #                 get_all_users_from_event(event_id, response)):
                list_of_all_values = [value for elem in get_all_users_from_event(event_id, response) for value in elem.values()]
                if reviewer_id in list_of_all_values and reviewed_id in list_of_all_values:
                    cur.execute(
                    """
                    INSERT INTO ratingaccountsinevents (reviewer_id, reviewed_id, event_id, rating)
                        VALUES(%s, %s, %s, %s)
                        RETURNING event_id, reviewer_id, reviewed_id, rating
                    """,[reviewer_id, reviewed_id, event_id, rating])
                    row = cur.fetchone()
                    print(cur.description)
                    if row is None:
                        response.status_code = status.HTTP_404_NOT_FOUND
                        return {"message": "Event or account not found"}
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return record
                else:
                    return "if failed"

                    
#end of file