# demonstration level python code
# goal: get a spotify album cover and store it in mongodb

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv
from pymongo import MongoClient

# load envs from .env for spotify creds
load_dotenv()

# connect to mongo db
mongo_client = MongoClient('localhost', 27017)
db = mongo_client.albumart_db
collection = db.art

# get access token for spotify
spotify = spotipy.Spotify(
        client_credentials_manager=SpotifyClientCredentials()
        )

# sample value to query spotify for
lz_uri = 'spotify:artist:36QJpDe2go2KgaRleHCDTp'

# hit spotify
results = spotify.artist_top_tracks(lz_uri)

# results
for track in results['tracks'][:10]:
    print(track['album']['images'][0]['url'])
