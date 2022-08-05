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


class FakeDogQueries:
    def get_dog(self, dog_id):
        return {
            "dog_name": "Mary_Puppins",
            "dog_breed": "bulldog, english",
            "dog_age": 25,
            "dog_gender": "female",
            "dog_photo": "photo_address",
            "dog_temperament": "Excessively british",
            "dog_about": "kind, witty, sweet, and fairly pretty",
            "dog_size": "large",
            "dog_weight": 60,
            "spayed_neutered": False,
            "vaccination_history": "Spoon Full of Sugar",
            "account_id": 1,
        }


client = TestClient(app)


def test_get_dog_returns_404():
    app.dependency_overrides[DogQueries] = EmptyDogQueries
    response = client.get("/api/dog/1")
    print("from test: ", response)
    assert response.status_code == 404
    app.dependency_overrides = {}


def test_get_dog_returns_200():
    app.dependency_overrides[DogQueries] = FakeDogQueries
    response = client.get("/api/dog/1")
    print("from test: ", response)
    assert response.status_code == 200
    app.dependency_overrides = {}
