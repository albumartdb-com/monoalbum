#!/bin/sh

#build front image
#...

#build back image
docker build -f ./art-aggregator/Dockerfile -t albumartdb/art-aggregator ./art-aggregator

#run everything via docker-compose
docker-compose -f docker-compose.yml up -d

