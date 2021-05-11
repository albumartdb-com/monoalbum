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

def get_artist_mongo(artist):
    artist_collection = connect_to_mongo().artist
    document = {}
    document = artist_collection.find_one({
        "artist": artist,
        })
    if bool(document):
        document.pop("_id")
        logging.info("artist " + document["artist"] + " retrieved from local collection.")
    return document

def get_album_mongo(artist, album):
    album_collection = connect_to_mongo().album
    document = {}
    document = album_collection.find_one({
        "artist": artist,
        "album_name": album
        })
    if bool(document):
        document.pop("_id")
        logging.info("album " + document["album_name"] + " retrieved from local collection.")
    return document

def get_artist_spotify(artist):
    artist_collection = connect_to_mongo().artist
    spotify = connect_to_spotify()

    api_return = spotify.search(artist, type="artist", market="US")
    artist_list = []
    for retrieved_artist in api_return["artists"]["items"]: 
        name = retrieved_artist["name"]
        artist_id = retrieved_artist["id"]
        artist_image_url = retrieved_artist["images"][0]["url"]

        image_request = requests.get(artist_image_url, allow_redirects=True)
        image_str = base64.b64encode(image_request.content).decode('utf-8')
        document = {
            "artist": name,
            "id": artist_id,
            "artist_image_encoded": image_str,
            "source": "spotify"
            }
        artist_list.append(document)
        document_id = artist_collection.insert_one(document).inserted_id
        logging.info("artist " + name + " retrieved from spotify and saved to db for future use.")
        document.pop("_id")
    return artist_list

def get_album_spotify(artist, album):
    artist_collection = connect_to_mongo().artist
    try:
        artist_id = artist_collection.find_one({
            "artist": artist,
            })["id"]
    except:
        logging.warning("need artist in mongo before asking for that artist's albums.")
        return None

    album_collection = connect_to_mongo().album
    spotify = connect_to_spotify()

    results = spotify.artist_albums(artist_id, country="US")

    document = {}
    for retrieved_album in results['items']:
        if retrieved_album["name"] == album:
            album_image_url = retrieved_album["images"][0]["url"]
            image_request = requests.get(album_image_url, allow_redirects=True)
            image_str = base64.b64encode(image_request.content).decode('utf-8')
            document = {
                "artist": artist,
                "album_name": album,
                "album_art_encoded": image_str,
                "source": "spotify"
                }
            document_id = album_collection.insert_one(document).inserted_id
            logging.info(album + " retrieved from spotify and saved to db for future use.")
            document.pop("_id")
            break
    return document

class Artist(Resource):
    def get(self):
        parser = reqparse.RequestParser() # init
        parser.add_argument('artist', required=True)
        args = parser.parse_args() # to dict

        document = get_artist_mongo(args["artist"])
        if bool(document):
            result = document 
        else:
            result = get_artist_spotify(args["artist"])
        return make_response(jsonify(result), 200)

# classes could be templated?
class Album(Resource):
    def get(self):
        parser = reqparse.RequestParser() # init
        parser.add_argument('artist', required=True)
        parser.add_argument('album', required=True)
        args = parser.parse_args() # to dict

        document = get_album_mongo(args["artist"], args["album"])
        if bool(document):
            result = document 
        else:
            result = get_album_spotify(args["artist"], args["album"])
        return make_response(jsonify(result), 200)

def main():
    logging.basicConfig(filename='art-aggregator.log')
    load_dotenv() 
    app = Flask(__name__)
    api = Api(app)
    api.add_resource(Artist, '/artist')
    api.add_resource(Album, '/album')
    app.run()
    
if __name__ == '__main__':
  main()
