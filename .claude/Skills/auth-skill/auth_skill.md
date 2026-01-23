name: auth-skill
description: Build secure authentication flow with signup, password hashing, and JWT token management.

---

# Authentication Skill

## Instructions

1. **Signup Flow**
   - Collect user email and password
   - Validate email format and password strength
   - Hash passwords before storing
   - Store user in database (Neon DB + SQLModel)

2. **Login Flow**
   - Verify user email exists
   - Compare password hash
   - Generate JWT token upon successful login
   - Return token to frontend

3. **JWT Token Handling**
   - Use a secret key to sign tokens
   - Set token expiry (e.g., 1 hour)
   - Validate token on every protected route
   - Refresh token mechanism if needed

4. **Security Best Practices**
   - Use strong hashing algorithms (e.g., bcrypt)
   - Never store plain passwords
   - Securely handle JWT secret keys
   - Validate input to prevent injection attacks

## Example Backend Structure
```python
from fastapi import FastAPI, HTTPException, Depends
from passlib.context import CryptContext
from jose import jwt
from sqlmodel import SQLModel, Field, Session, create_engine

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    email: str
    hashed_password: str

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
