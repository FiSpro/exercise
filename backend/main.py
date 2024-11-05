from typing import Union

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from users import get_users

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

users = get_users() # Getting the list of users

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Endpoint to get all users
@app.get("/users")
def get_users():
    # TODO ASSIGNMENT: Return a list of users
    return {"users": users}

# Model for the fields allowed for update
class UserUpdate(BaseModel):
    firstName: str = None
    lastName: str = None
    age: int = None
    gender: str = None
    email: str = None
    phone: str = None

# Endpoint to update a user by ID
@app.put("/users/{user_id}")
def update_user(user_id: int, user_update: UserUpdate):
    user = next((user for user in users if user["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = user_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        user[key] = value

    return user