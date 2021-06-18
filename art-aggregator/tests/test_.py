# fledgling pytest framework

# std or pip modules
import sys
import pytest
import json

# add parent dir files to path for import to access
sys.path.append('../')

# local modules
from api_calls import *

# valid query should not raise exception
def test_query_spotify():
    results = query_spotify("Train", limit=5)
    assert results.status_code == 200
