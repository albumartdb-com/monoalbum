#!/bin/sh
# Stops all existing docker containers

echo "Stopping all docker containers..."
docker container kill $(docker ps -q)
