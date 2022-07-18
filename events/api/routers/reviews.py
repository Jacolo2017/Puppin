from fastapi import APIRouter, Response, status, Depends
from pydantic import BaseModel
from models.common import ErrorMessage
from typing import Union
import psycopg
router = APIRouter()


class EventReviewIn(BaseModel):
    review_id: int
    reviewer_username: int
    review_event_id: int
    review_description: str


class EventReviewOut(BaseModel):
    review_id: int
    reviewer_username: int
    review_event_id: int
    review_description: str


# @router.post("/api/create-user/{user_id}")
# def createAccount(user_id: int, username: str, password: str):
#     with psycopg.connect() as conn:
#         with conn.cursor() as cur:

@router.post("/api/reviews")
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
                    "message": "That usernames taken dawg",
                }
            row = cur.fetchone()
            record = {}

            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record



@router.get("/api/accounts/{account_id}")
def get_account(account_id: int, response: Response):
    try:
        print("okay we tried")
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                        """
                        SELECT first_name, last_name, email, username,
                        date_of_birth, city, state, gender,
                            photo_url, about
                        FROM accounts
                        WHERE account_id = %s;
                        """, [account_id],
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
