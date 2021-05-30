# currently rudimentary, will use a real framework later

from api_calls import *
import json

SAVE_JSON = True
artist = "aesop rock"
types = ["artist", "album", "track"]
total_results = 5

def test_header(test_name):
    print("\n" + test_name + "\n")

def custom_api_tests():
    results = query_spotify(artist, limit=total_results)

    # save to disk
    if (SAVE_JSON):
        with open(artist + '.json', 'w') as f:
            json.dump(results, f)

custom_api_tests()

#print(query_spotify("aesop rock", "artist"))