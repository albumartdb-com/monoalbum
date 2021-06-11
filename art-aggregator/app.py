# integrating flask
# goal: get a spotify album cover and store it in mongodb BASED on specific request artist album combo via REST api

# local files
from api_calls import *
from mongo_calls import *

from flask import Flask, jsonify, make_response
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from dotenv import load_dotenv
from configured_logger import log

class Q(Resource):
    def get(self):
        parser = reqparse.RequestParser() # init
        parser.add_argument('q', required=True)
        args = parser.parse_args() # to dict

        try:
            response = query_spotify(args['q'])
        except:
            return make_response("{}", 404)

        return make_response(jsonify(response), 200)

def main():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)
    api.add_resource(Q, '/')
    app.run(
            host="0.0.0.0",
            port=5000
            )
    
if __name__ == '__main__':
  main()
