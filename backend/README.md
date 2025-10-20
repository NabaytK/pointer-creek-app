# Pointer Creek AI Platform - Backend

FastAPI backend with 7 specialized AI assistants powered by OpenAI GPT models.

## Setup

1. **Get OpenAI API Key:**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy it

2. **Configure Environment:**
```bash
   cp .env.example .env
   # Edit .env and add your OPENAI_API_KEY
```

3. **Install Dependencies:**
```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
```

4. **Run Server:**
```bash
   uvicorn main:app --reload --port 8000
```

5. **Test API:**
   - Open http://localhost:8000/docs
   - Try the interactive API documentation

## API Endpoints

- `POST /api/ai/marketing` - Marketing Assistant
- `POST /api/ai/social` - Social Media Assistant
- `POST /api/ai/contract` - Contract Analyzer
- `POST /api/ai/investment` - Investment Analyst
- `POST /api/ai/notetaker` - Note Taker AI
- `POST /api/ai/meeting` - Meeting Prep Assistant
- `POST /api/ai/tech` - Tech Support Assistant

## Deploy to AWS

See deployment guide for AWS EC2, ECS, or Lambda deployment options.
