import requests
from dotenv import load_dotenv, dotenv_values


def get_spotify_token():
    AUTH_URL = 'https://accounts.spotify.com/api/token'

    load_dotenv()
    config = dotenv_values(".env")

    auth_response = requests.post(AUTH_URL, {
        'grant_type': 'client_credentials',
        'client_id': config['SPOTIFY_CLIENT_ID'],
        'client_secret': config['SPOTIFY_CLIENT_SECRET'],
    })

    auth_response_data = auth_response.json()
    return auth_response_data['access_token']


def query_spotify(query, limit=50):
    access_token = get_spotify_token()
    headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token)
    }

    API_URL = 'https://api.spotify.com/v1/'
    return requests.get(API_URL + 'search?q=' + query + '&type=artist,album&limit=' + str(limit), headers=headers).json()