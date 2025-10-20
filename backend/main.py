from fastapi import FastAPI, HTTPException, Depends, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from typing import List
from openai_service import get_ai_response
from chat_storage import save_chat, load_all_chats, get_chat_by_id
from user_auth import register_user, authenticate_user, create_access_token, verify_token
import os

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://didactic-bassoon-jj775wjwrr9whj6w4-5173.app.github.dev",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    department: str

class LoginRequest(BaseModel):
    email: str
    password: str

assistant_names = {
    "marketing": "Marketing Assistant",
    "social": "Social Media Assistant",
    "contract": "Contract Analyzer",
    "investment": "Investment Analyst",
    "notetaker": "Note Taker AI",
    "meeting": "Meeting Prep Assistant",
    "tech": "Tech Support Assistant",
}

def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.replace("Bearer ", "")
    user_data = verify_token(token)
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user_data

@app.get("/")
def root():
    return {"status": "Backend is running", "message": "Welcome to the AI Platform API!"}

@app.post("/api/auth/register")
def register(request: RegisterRequest):
    user = register_user(request.email, request.password, request.name, request.department)
    if not user:
        raise HTTPException(status_code=400, detail="User already exists")
    token = create_access_token({"email": user["email"], "name": user["name"], "department": user["department"]})
    return {"token": token, "user": {"email": user["email"], "name": user["name"], "department": user["department"]}}

@app.post("/api/auth/login")
def login(request: LoginRequest):
    user = authenticate_user(request.email, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"email": user["email"], "name": user["name"], "department": user["department"]})
    return {"token": token, "user": {"email": user["email"], "name": user["name"], "department": user["department"]}}

@app.get("/api/auth/me")
def get_me(user_data: dict = Depends(get_current_user)):
    return {"user": user_data}

@app.post("/api/ai/{assistant_id}")
async def chat_with_ai(assistant_id: str, chat_request: ChatRequest, user_data: dict = Depends(get_current_user)):
    try:
        response = await get_ai_response(chat_request.messages)
        
        messages_dict = [{"role": m.role, "content": m.content} for m in chat_request.messages]
        messages_dict.append({"role": "assistant", "content": response})
        
        save_chat(
            assistant_id=assistant_id,
            assistant_name=assistant_names.get(assistant_id, "Unknown Assistant"),
            messages=messages_dict,
            user_email=user_data["email"],
            user_name=user_data["name"]
        )
        
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/chats")
def get_chats(user_data: dict = Depends(get_current_user)):
    chats = load_all_chats(user_data["email"])
    return {"chats": chats}

@app.get("/api/chats/{chat_id}")
def get_chat(chat_id: str, user_data: dict = Depends(get_current_user)):
    chat = get_chat_by_id(chat_id, user_data["email"])
    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    return {"chat": chat}
