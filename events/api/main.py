from fastapi import FastAPI

from routers import events, reviews
app = FastAPI()

app.include_router(events.router)
app.include_router(reviews.router)
