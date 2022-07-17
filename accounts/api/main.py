from fastapi import FastAPI

from routers import accounts

app = FastAPI()



@app.get("/")
async def root():
    return {"message": "Hello World"}
