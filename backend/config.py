from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # OpenAI Configuration
    openai_api_key: str
    openai_model: str = "gpt-4o-mini"
    
    # Azure OpenAI (optional)
    azure_openai_api_key: Optional[str] = None
    azure_openai_endpoint: Optional[str] = None
    azure_openai_deployment: Optional[str] = None
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    environment: str = "development"
    
    # Database
    database_url: str = "sqlite:///./pointercreek.db"
    
    # CORS
    frontend_url: str = "http://localhost:5173"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
