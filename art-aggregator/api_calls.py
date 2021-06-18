import requests
from dotenv import dotenv_values
from configured_logger import log

def get_spotify_token():
    AUTH_URL = 'https://accounts.spotify.com/api/token'

    config = dotenv_values(".env")

    response = requests.post(AUTH_URL, {
        'grant_type': 'client_credentials',
        'client_id': config['SPOTIFY_CLIENT_ID'],
        'client_secret': config['SPOTIFY_CLIENT_SECRET'],
    })
    if response.status_code != 200:
        log.critical("Spotify API authentication request returned !200",)
        raise Exception

    return response.json()['access_token']


def query_spotify(query, limit=50):
    access_token = get_spotify_token()
    headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token)
    }

    API_URL = 'https://api.spotify.com/v1/'
    response = requests.get(
            API_URL + 'search?q=' + query + '&type=artist,album&limit=' + 
            str(limit), headers=headers
            )
    if response.status_code != 200:
        log.critical("Spotify API request returned !200",)
        raise Exception
    return response
