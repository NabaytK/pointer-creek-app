from authlib.integrations.starlette_client import OAuth
from starlette.config import Config

config = Config('.env')

oauth = OAuth(config)

# Google OAuth
oauth.register(
    name='google',
    client_id=config.get('GOOGLE_CLIENT_ID', ''),
    client_secret=config.get('GOOGLE_CLIENT_SECRET', ''),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

# Microsoft OAuth
oauth.register(
    name='microsoft',
    client_id=config.get('MICROSOFT_CLIENT_ID', ''),
    client_secret=config.get('MICROSOFT_CLIENT_SECRET', ''),
    authorize_url='https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    authorize_params=None,
    access_token_url='https://login.microsoftonline.com/common/oauth2/v2.0/token',
    access_token_params=None,
    refresh_token_url=None,
    client_kwargs={'scope': 'openid email profile'}
)
