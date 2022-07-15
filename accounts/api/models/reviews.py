from pydantic import BaseModel


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


class ProfileReviewIn(BaseModel):
    review_id: int
    reviewer_username: int
    review_event_id: int
    review_attendee: int
    review_description: str


class ProfileReviewIn(BaseModel):
    review_id: int
    reviewer_username: int
    review_event_id: int
    review_attendee: int
    review_description: str
