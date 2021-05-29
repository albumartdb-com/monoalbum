# integrating flask
# goal: get a spotify album cover and store it in mongodb
# BASED on specific request artist album combo via REST api

import os
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from dotenv import load_dotenv
from pymongo import MongoClient
import json
import requests
import base64
from flask import Flask, jsonify, make_response
from flask_restful import Resource, Api, reqparse
import pdb
import logging

def connect_to_mongo():
    mongo_uri = "mongodb://{}:{}@{}:{}".format(
        os.getenv('MONGO_ROOT_USER'),
        os.getenv('MONGO_ROOT_PASSWORD'),
        os.getenv('MONGO_CONTAINER_NAME'),
        os.getenv('MONGO_PORT'),
        )
    mongo_client = MongoClient(mongo_uri)
    return mongo_client.albumart_db

def connect_to_spotify():
    return spotipy.Spotify(
        client_credentials_manager=SpotifyClientCredentials()
        )

def query_mongo(q):
    collection = connect_to_mongo().art
    document = {}
    document = collection.find_one({
        "name": q,
        })
    if bool(document):
        document.pop("_id")
        logging.info("item " + document["name"] + " retrieved from local collection.")
    return document

def query_spotify(q, query_type):
#    artist_collection = connect_to_mongo().artist
    spotify = connect_to_spotify()

    api_return = spotify.search(q, type=query_type, market="US")
    ret_list = []
    for retrieved_item in api_return[query_type + "s"]["items"]: 
        name = retrieved_item["name"]
        artist_id = retrieved_item["id"]
        image_url = retrieved_item["images"][0]["url"]
        image_request = requests.get(image_url, allow_redirects=True)
        image_str = base64.b64encode(image_request.content).decode('utf-8')
        document = {
            "name": name,
            "image_encoded": image_str,
            "type": query_type,
            "source": "spotify",
            "id": artist_id
            }
        ret_list.append(document)
#        document_id = artist_collection.insert_one(document).inserted_id
        logging.info(query_type + name + " retrieved from spotify.")
#        document.pop("_id")
    return ret_list

class Q(Resource):
    def get(self):
        parser = reqparse.RequestParser() # init
        parser.add_argument('q', required=True)
        args = parser.parse_args() # to dict

#        pdb.set_trace()
        result = query_spotify(args["q"], "artist")
        result.append(query_spotify(args["q"], "album"))
        result.append(query_spotify(args["q"], "playlist"))

        return make_response(jsonify(result), 200)

def main():
    logging.basicConfig(filename='art-aggregator.log')
    load_dotenv() 
    app = Flask(__name__)
    api = Api(app)
    api.add_resource(Q, '/q')
    app.run()
    
if __name__ == '__main__':
  main()
