from datetime import datetime, timedelta
from jose import JWTError, jwt
import hashlib
import json
import os

SECRET_KEY = "your-secret-key-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60

USERS_FILE = "users.json"

def load_users():
    if not os.path.exists(USERS_FILE):
        return {}
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except:
        return {}

def save_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=2)

def verify_password(plain_password, hashed_password):
    return hashlib.sha256(plain_password.encode()).hexdigest() == hashed_password

def get_password_hash(password):
    return hashlib.sha256(password.encode()).hexdigest()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def register_user(email: str, password: str, name: str, department: str):
    users = load_users()
    if email in users:
        return None
    
    users[email] = {
        "email": email,
        "name": name,
        "department": department,
        "password": get_password_hash(password),
        "created_at": datetime.now().isoformat()
    }
    save_users(users)
    return users[email]

def authenticate_user(email: str, password: str):
    users = load_users()
    if email not in users:
        return None
    user = users[email]
    if not verify_password(password, user["password"]):
        return None
    return user
