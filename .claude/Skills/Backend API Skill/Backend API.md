---
name: backend-api
description: Build, manage, and optimize backend APIs using FastAPI. Handle authentication, CRUD operations, and integration with frontend seamlessly.
---

# Backend API Skill

## Responsibilities

- Design and implement RESTful APIs for all frontend requirements.
- Handle authentication, authorization, and user sessions (JWT, password hashing).
- Manage CRUD operations for tasks, users, and other entities.
- Ensure secure and validated input/output data.
- Optimize API performance and response times.
- Integrate with SQLModel and Neon DB for database operations.
- Write clear documentation for each endpoint.
- Handle error responses and proper HTTP status codes.

## Best Practices

- Keep API endpoints **RESTful and consistent**.
- Validate all incoming data using Pydantic models.
- Implement proper **error handling** for predictable failures.
- Use **JWT tokens** for secure authentication.
- Limit data exposure; never return sensitive information.
- Maintain **modular structure**: separate routers, services, and models.
- Write API tests to ensure functionality remains correct.

## Example Structure

```python
# FastAPI + SQLModel example
from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import SQLModel, Field, Session, create_engine
from typing import Optional
from auth import get_current_user  # JWT helper

app = FastAPI()

# Database model
class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    completed: bool = False

# CRUD endpoint
@app.post("/tasks/")
def create_task(task: Task, user=Depends(get_current_user)):
    with Session(engine) as session:
        session.add(task)
        session.commit()
        session.refresh(task)
    return task

@app.get("/tasks/")
def get_tasks(user=Depends(get_current_user)):
    with Session(engine) as session:
        tasks = session.query(Task).all()
    return tasks
