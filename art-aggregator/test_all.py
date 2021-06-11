# currently rudimentary, will use a real framework later

from api_calls import *
import json

SAVE_JSON = True
artist = "aesop rock"
total_results = 5

def custom_api_tests():
    results = query_spotify(artist, limit=total_results)

    # save to disk
    if (SAVE_JSON):
        with open(artist + '.json', 'w') as f:
            json.dump(results, f)

custom_api_tests()