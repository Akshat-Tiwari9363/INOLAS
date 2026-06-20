import os
import sys

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from fastapi.testclient import TestClient

import main


client = TestClient(main.app)

signup = client.post(
    "/api/auth/signup",
    json={
        "name": "Smoke Test",
        "email": "smoke@example.com",
        "password": "test1234",
        "role": "student",
    },
)
print("signup", signup.status_code, signup.json())

login = client.post(
    "/api/auth/login",
    json={
        "email": "smoke@example.com",
        "password": "test1234",
    },
)
print("login", login.status_code, login.json())
