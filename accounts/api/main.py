from fastapi import FastAPI

from routers import accounts

app = FastAPI()

app.include_router(accounts.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
