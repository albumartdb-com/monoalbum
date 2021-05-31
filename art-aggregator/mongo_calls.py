import os, logging
from pymongo import MongoClient

def connect_to_mongo():
    mongo_uri = "mongodb://{}:{}@{}:{}".format(
        os.getenv('MONGO_ROOT_USER'),
        os.getenv('MONGO_ROOT_PASSWORD'),
        os.getenv('MONGO_CONTAINER_NAME'),
        os.getenv('MONGO_PORT'),
        )
    mongo_client = MongoClient(mongo_uri)
    return mongo_client.albumart_db

def mongo_get(query):
    collection = connect_to_mongo().art
    document = {}
    document = collection.find_one({
        "name": query,
        })
    if bool(document):
        document.pop("_id")
        logging.info("item " + document["name"] + " retrieved from local collection.")
    return document

def mongo_post(json_file):
    # this function still needs to be tested

    db = connect_to_mongo().str(json_file["type"])

    document = { "name": json_file["name"],
        "image_url": json_file["images"][0]["url"],
        "type": json_file["type"],
        "source": "spotify",
        "id": json_file["id"]
        }

    db.insert_one(document)
    logging.info("item " + document["name"] + " added to local collection.")
