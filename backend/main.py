# demonstration level python code
# goal: get a spotify album cover and store it in mongodb

import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv
from pymongo import MongoClient
import json
import requests
import base64

def main(): 
    # load envs from .env for spotify creds
    load_dotenv()
    
    # connect to mongo db
    mongo_uri = "mongodb://{}:{}@{}:{}".format(
        os.getenv('MONGO_ROOT_USER'),
        os.getenv('MONGO_ROOT_PASSWORD'),
        os.getenv('MONGO_CONTAINER_NAME'),
        os.getenv('MONGO_PORT'),
        )
    mongo_client = MongoClient(mongo_uri)
    mongo_db = mongo_client.albumart_db
    mongo_collection = mongo_db.art
    
    # get access token for spotify
    spotify = spotipy.Spotify(
        client_credentials_manager=SpotifyClientCredentials()
        )
    
    # sample value to query spotify for
    lz_uri = 'spotify:artist:36QJpDe2go2KgaRleHCDTp'
    
    # hit spotify
    results = spotify.artist_albums(lz_uri, country="US")
#    print(json.dumps(results))

    for album in results['items']:
        artist = album["artists"][0]["name"]
        album_name = album["name"]
        art_url = album["images"][0]["url"]
        
        art_request = requests.get(art_url, allow_redirects=True)
        art_b64 = base64.b64encode(art_request.content)
        document = {
            "artist": artist,
            "album_name": album_name,
            "albumart_base64": art_b64
            }
        # store in collection
        document_id = mongo_collection.insert_one(document).inserted_id
        print(album_name + " album art inserted into mongo.")
    
if __name__ == '__main__':
  main()
