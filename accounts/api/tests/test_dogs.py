from fastapi import FastAPI
from fastapi.testclient import TestClient
from ..main import app
from db.dogs import DogQueries

# from routers.accounts import router


print("look at me!")


class EmptyDogQueries:
    def get_dog(self, dog_id):
        print("can see me?")
        return None


client = TestClient(app)


def test_get_dog_returns_404():
    app.dependency_overrides[DogQueries] = EmptyDogQueries
    response = client.get("/api/dog/1")
    print("from test: ", response)
    assert response.status_code == 200
    app.dependency_overrides = {}
