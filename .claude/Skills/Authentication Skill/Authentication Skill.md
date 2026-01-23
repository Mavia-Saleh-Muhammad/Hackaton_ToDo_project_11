---
name: authentication
description: Implement secure user authentication using signup, password hashing, and JWT tokens in a full-stack application.
---

# Authentication Skill

## Responsibilities

- Enable **user signup and login** functionality.
- Store passwords securely using **hashing algorithms** (bcrypt or similar).
- Generate and verify **JWT tokens** for session management.
- Protect sensitive API routes with authentication checks.
- Handle **token expiration, refresh, and revocation**.
- Validate user input to prevent security vulnerabilities (e.g., SQL injection, XSS).
- Log authentication events (optional) for auditing.

## Best Practices

- Never store passwords in plain text; always hash them.
- Use **strong hashing algorithms** (bcrypt, argon2) with proper salting.
- Set **short-lived access tokens** and optional refresh tokens for security.
- Validate JWT tokens on every request to protected routes.
- Ensure HTTPS is used to protect token transmission.
- Implement proper error messages without revealing sensitive information.
- Follow the **principle of least privilege** for protected endpoints.

## Example Structure

```python
# FastAPI authentication example
from fastapi import FastAPI, Depends, HTTPException, status
from passlib.hash import bcrypt
from jose import JWTError, jwt
from sqlmodel import Session, select
from models import User, engine

app = FastAPI()
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Password hashing
def hash_password(password: str) -> str:
    return bcrypt.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.verify(password, hashed)

# JWT token creation
def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

# Signup endpoint
@app.post("/signup")
def signup(username: str, email: str, password: str):
    hashed_pass = hash_password(password)
    user = User(username=username, email=email, hashed_password=hashed_pass)
    with Session(engine) as session:
        session.add(user)
        session.commit()
    return {"message": "User created successfully"}

# Login endpoint
@app.post("/login")
def login(username: str, password: str):
    with Session(engine) as session:
        user = session.exec(select(User).where(User.username == username)).first()
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        token = create_access_token({"sub": username})
        return {"access_token": token, "token_type": "bearer"}
