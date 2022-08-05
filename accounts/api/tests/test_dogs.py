from fastapi import FastAPI
from fastapi.testclient import TestClient
from ..main import app


print("look at me!")

client = TestClient(app)


def test_read_main():
    print("look at me!")
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}
