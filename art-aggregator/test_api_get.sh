#!/bin/sh

curl "http://127.0.0.1:5000/search?q=Train" | jq .
