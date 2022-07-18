from fastapi import APIRouter, Response, status, Depends
from pydantic import BaseModel
from typing import Union
import psycopg
router = APIRouter()


class EventReviewIn(BaseModel):
    review_id: int
    reviewer_username: int
    review_event_id: int
    review_description: str



@router.post("/api/reviews/create")
def create_event_review(review: EventReviewIn, response: Response):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """ INSERT INTO reviews (review_id, reviewer_username, account_id, 
                        review_event, event_id, attendee rating, review_description, 
                        location_zip, location_rating)
                        VALUES (%s, %s, %s, %s)
                RETURNING account_id;
                """,
                    [review.review_id, review.reviewer_username,
                        review.review_event_id, review.review_description]
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



@router.get("/api/reviews/{review_id}")
def get_account(review_id: int, response: Response):
    try:
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                        """
                        SELECT (review_id, reviewer_username, account_id, 
                        review_event, event_id, attendee rating, review_description, 
                        location_zip, location_rating)
                        FROM reviews
                        WHERE review_id = %s;
                        """, [review_id],
                    )
                row = cur.fetchone()
                print("lookhere", (cur.description))
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Account not found"}
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc.message)
