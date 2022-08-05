from fastapi import FastAPI
from fastapi.testclient import TestClient
from starlette.testclient import TestClient
from accounts.api.main import app

app = FastAPI

client = TestClient(app)


print("look at me!")


def test_read_main():
    print("look at me!")
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}
