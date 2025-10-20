import json
import os
from datetime import datetime
from typing import List, Dict

CHATS_FILE = "chats_history.json"

def save_chat(assistant_id: str, assistant_name: str, messages: List[Dict], user_email: str, user_name: str):
    """Save a chat conversation with user info"""
    chats = load_all_chats()
    
    chat_entry = {
        "id": f"{assistant_id}_{datetime.now().timestamp()}",
        "assistant_id": assistant_id,
        "assistant_name": assistant_name,
        "messages": messages,
        "timestamp": datetime.now().isoformat(),
        "preview": messages[-1]["content"][:100] if messages else "",
        "user_email": user_email,
        "user_name": user_name
    }
    
    chats.append(chat_entry)
    
    with open(CHATS_FILE, 'w') as f:
        json.dump(chats, f, indent=2)
    
    return chat_entry

def load_all_chats(user_email: str = None) -> List[Dict]:
    """Load all saved chats, optionally filtered by user"""
    if not os.path.exists(CHATS_FILE):
        return []
    
    try:
        with open(CHATS_FILE, 'r') as f:
            chats = json.load(f)
            if user_email:
                return [c for c in chats if c.get("user_email") == user_email]
            return chats
    except:
        return []

def get_chat_by_id(chat_id: str, user_email: str = None) -> Dict:
    """Get a specific chat by ID"""
    chats = load_all_chats(user_email)
    for chat in chats:
        if chat["id"] == chat_id:
            return chat
    return None
