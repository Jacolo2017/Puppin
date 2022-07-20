from fastapi import APIRouter, Response, status, Depends
from pydantic import BaseModel
from typing import Union
import psycopg
router = APIRouter()


class EventReviewIn(BaseModel):
    reviewer_username: str
    review_event_id: int
    review_event: str
    review_description: str
    attendee_rating: bool
    location_zip: int
    location_rating: int

# def row_to_reviews_list(row):
#     rating = {
#         "review_id": row[0],
#         "reviewer_username": row[1],
#         "account_id": row[2],
#         "review_event": row[3],
#         "event_id": row[4],
#         "attendee_rating": row[5],
#         "review_description": row[6],
#         "location_zip": row[7],
#         "location_rating": row[8]
#     }
#     return rating



class EventReviewUpdate(BaseModel):
    reviewer_username: str
    review_event_id: int
    review_event: str
    review_description: str
    attendee_rating: bool
    location_zip: int
    location_rating: int


# --- Create new event review --- #
@router.post("/api/event/reviews/create")
def create_event_review(review: EventReviewIn, response: Response, account_id: int):
    with psycopg.connect() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """ INSERT INTO reviews 
                        reviewer_username,
                        account_id,
                        event_id,
                        review_event,
                        review_description,
                        attendee_rating,
                        location_zip,
                        location_rating
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING review_id, reviewer_username, account_id,
                        event_id, review_event, review_description,
                        attendee_rating, location_zip, location_rating;
                        """,
                    [review.reviewer_username, account_id, review.review_event_id,
                    review.review_event, review.review_description, review.attendee_rating, 
                    review.location_zip, review.location_rating]
                )
            except psycopg.errors.UniqueViolation:
                # status values at https://github.com/encode/starlette/blob/master/starlette/status.py
                response.status_code = status.HTTP_409_CONFLICT
                return {
                    "message": "Already reviewed"
                }
            # row = cur.fetchone()
            # record = {}

            # for i, column in enumerate(cur.description):
            #     record[column.name] = row[i]
            # return record

            reviews = cur.fetchall()
            return {
                "reviews": [row_to_reviews_list(row) for row in reviews]
            }


# --- Get an event review by review ID --- #
@router.get("/api/event/reviews/review={review_id}")
def get_review(review_id: int, response: Response):
    try:
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                        """
                        SELECT
                            review_id,
                            reviewer_username,
                            account_id,
                            review_event,
                            event_id,
                            attendee_rating,
                            review_description,
                            location_zip,
                            location_rating
                        FROM reviews
                        WHERE review_id = %s;
                        """, [review_id],
                    )
                row = cur.fetchone()
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Review not found"}
                record = {}
                for i, column in enumerate(cur.description):
                    print(column)
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc.message)


# --- Get all event reviews by event ID --- #
@router.get("/api/event/reviews/event={event_id}")
def get_event_reviews(event_id: int, response: Response):
    try:
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                        """
                        SELECT
                            review_id,
                            reviewer_username,
                            account_id,
                            review_event,
                            event_id,
                            attendee_rating,
                            review_description,
                            location_zip,
                            location_rating
                        FROM reviews
                        WHERE event_id= %s;
                        """, [event_id],
                    )
                results = []
                print("do you see me?")
                for row in cur.fetchall():
                    if row is None:
                        response.status_code = status.HTTP_404_NOT_FOUND
                        return {"message": "Review not found"}
                    print("row: ", row)
                    record = {}
                    for i, column in enumerate(cur.description):
                        # print("i, column: ", i, column)
                        record[column.name] = row[i]
                    results.append(record)
                return results
                # reviews = cur.fetchall()
                # print(reviews)
                # return {
                #     "reviews": [row_to_reviews_list(row) for row in reviews]
                # }
    except psycopg.InterfaceError as exc:
        print(exc.message)


# --- Update a specific review by review ID --- #
@router.put("/api/event/reviews/{review_id}")
def update_review(review: EventReviewUpdate, review_id: int, account_id: int, response: Response):
    try:
        with psycopg.connect() as conn:
            with conn.cursor() as cur:
                cur.execute(
                        """
                        UPDATE reviews
                        SET reviewer_username = %s,
                            account_id = %s,
                            review_event = %s,
                            event_id = %s,
                            attendee_rating = %s,
                            review_description = %s,
                            location_zip = %s
                            location_rating = %s
                        WHERE review_id = %s
                        RETURNING review_id, reviewer_username, account_id,
                        event_id, review_event, review_description,
                        attendee_rating, location_zip, location_rating;
                        """, [review.reviewer_username, account_id, 
                        review.review_event_id, review.review_event, 
                        review.review_description, review.attendee_rating, 
                        review.location_zip, review.location_rating, review_id]
                    )
                row = cur.fetchone()
                if row is None:
                    response.status_code = status.HTTP_404_NOT_FOUND
                    return {"message": "Review not found"}
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
    except psycopg.InterfaceError as exc:
        print(exc.message)
