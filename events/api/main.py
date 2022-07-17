from fastapi import FastAPI

from routers import events
app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World this is accounts"}
