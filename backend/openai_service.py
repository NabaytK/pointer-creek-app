from google import genai
from config import settings
import os

os.environ['GEMINI_API_KEY'] = settings.openai_api_key
client = genai.Client()

async def get_ai_response(messages):
    try:
        prompt = "\n".join([f"{m.role}: {m.content}" for m in messages])
        
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp",
            contents=prompt
        )
        
        return response.text
    except Exception as e:
        print(f"❌ Gemini API error: {e}")
        return f"Error: {str(e)}"