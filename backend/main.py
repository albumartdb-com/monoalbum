# demonstration level python code
# goal: get a spotify album cover and store it in mongodb

import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv
from pymongo import MongoClient
import json

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
    results = spotify.artist_top_tracks(lz_uri)
    
    # results
    for track in results['tracks'][:10]:
        print(track['album']['images'][0]['url'])
        document = {
            "name": track['album']['name'],
            "albumart_url": track['album']['images'][0]['url']
            }
        # store in collection
        document_id = mongo_collection.insert_one(document).inserted_id
    
    #for track in results['tracks']:
    #    print(track)
        #print(json.dumps(track))
    
if __name__ == '__main__':
  main()
