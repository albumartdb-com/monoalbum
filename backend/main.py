# demonstration level python code
# goal: get a spotify album cover and store it in mongodb

import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv
from pymongo import MongoClient
import json

# load envs from .env for spotify creds
load_dotenv()

# connect to mongo db
mongo_client = MongoClient(username=os.getenv('MONGO_ROOT_USER'), 
        password=os.getenv('MONGO_ROOT_PASSWORD'), host='localhost', port=27017)
mongo_db = mongo_client.albumart_db
mongo_collection = mongo_db.art

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
    document = {
            "name": track['album']['name'],
            "albumart_url": track['album']['images'][0]['url']
            }
    document_id = mongo_collection.insert_one(document).inserted_id

#for track in results['tracks']:
#    print(track)
    #print(json.dumps(track))
