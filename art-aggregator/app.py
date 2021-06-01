# integrating flask
# goal: get a spotify album cover and store it in mongodb
# BASED on specific request artist album combo via REST api

# local files
from api_calls import *
from mongo_calls import *

from flask import Flask, jsonify, make_response
from flask_restful import Resource, Api, reqparse
from dotenv import load_dotenv
import logging


class Q(Resource):
    def get(self):
        parser = reqparse.RequestParser() # init
        parser.add_argument('q', required=True)
        args = parser.parse_args() # to dict

        return make_response(jsonify(query_spotify(args['q'])), 200)

def main():
    logging.basicConfig(filename='art-aggregator.log')
    load_dotenv() 
    app = Flask(__name__)
    api = Api(app)
    api.add_resource(Q, '/')
    app.run(
            host="0.0.0.0",
            port=5000
            )
    
if __name__ == '__main__':
  main()
