---
name: database
description: Design, manage, and optimize relational database using SQLModel and Neon DB for a full-stack application.
---

# Database Skill

## Responsibilities

- Design database schema for all entities (tasks, users, sessions, etc.).
- Implement relationships and constraints to ensure data integrity.
- Use SQLModel for ORM-based interactions with Neon DB.
- Handle migrations and versioning of database schema.
- Optimize queries for performance and scalability.
- Ensure sensitive data (passwords, tokens) is securely stored.
- Backup and restore database when necessary.
- Integrate database with backend APIs efficiently.

## Best Practices

- Normalize tables to reduce redundancy.
- Use **indexes** on frequently queried fields.
- Store passwords using **secure hashing algorithms** (e.g., bcrypt).
- Use **UUIDs** or sequential IDs appropriately for primary keys.
- Validate all data before writing to the database.
- Keep database schema modular and maintainable.
- Avoid storing unnecessary sensitive information.

## Example Structure

```python
# SQLModel + Neon DB example
from sqlmodel import SQLModel, Field, create_engine, Session
from typing import Optional

# Database engine
engine = create_engine("postgresql+psycopg://user:password@host:port/dbname")

# User model
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    email: str
    hashed_password: str

# Task model
class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    completed: bool = False
    user_id: int = Field(foreign_key="user.id")

# Creating tables
SQLModel.metadata.create_all(engine)

# Session example
with Session(engine) as session:
    user = User(username="haroon", email="haroon@example.com", hashed_password="hashed_pass")
    session.add(user)
    session.commit()
