from fastapi.testclient import TestClient
import sys

sys.path.append("../")
# from db.dogs import DogQueries
from unittest import TestCase
from routers.accounts import update_dog
from main import app

client = TestClient(app)


class DogInfo(TestCase):
    def update_dog(self):
        return []


async def override_update_dog():
    return {
        "dog_id": 1,
        "dog_name": "string",
        "dog_breed": "string",
        "dog_age": 0,
        "dog_gender": "string",
        "dog_photo": "string",
        "dog_temperament": "string",
        "dog_about": "string",
        "dog_size": "string",
        "dog_weight": 0,
        "spayed_neutered": "true",
        "vaccination_history": "string",
    }


app.dependency_overrides[update_dog] = override_update_dog
# app.dependency_overrides[get_current_user] = override_get_fake_user


def test_update_dog():
    print("test_update_dog called")
    # app.dependency_overrides[ProfileQueries] = DogInfo
    # app.dependency_overrides[get_current_user] = override_get_fake_user
    # r = client.put(
    #     "api/dog/{dog_id}",
    #     json={
    #         "dog_name": "string",
    #         "dog_breed": "string",
    #         "dog_age": 0,
    #         "dog_gender": "string",
    #         "dog_photo": "string",
    #         "dog_temperament": "string",
    #         "dog_about": "string",
    #         "dog_size": "string",
    #         "dog_weight": 0,
    #         "spayed_neutered": true,
    #         "vaccination_history": "string",
    #     },
    # )
    # d = r.json()
    # print("response: ", d)
    # assert r.status_code == 200

    app.dependency_overrides = {}
