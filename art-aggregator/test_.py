# currently rudimentary, will use a real framework later

import pytest
import json
from api_calls import *

SAVE_JSON = True
artist = "sdadsakjhdajsd"
total_results = 5

def test_query_spotify():
    results = query_spotify("", limit=total_results)

test_query_spotify()
