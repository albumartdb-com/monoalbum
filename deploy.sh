#!/bin/sh
# This script builds all necessary images for the albumartdb project
# Then it deploys the containers via docker-compose

if [ ! -f "$PWD/.env" ] || [ ! -f "$PWD/art-aggregator/.env" ];
then
	echo "Add .env file to both project root and art-aggregator first."
	echo "Are you running this from the project root?"
	exit 1
fi

# Build the frontend image
docker build -f $PWD/frontend/Dockerfile -t albumartdb/frontend $PWD/frontend

if [ $? -ne 0 ];
then
	echo "Building the frontend image failed."
	echo "No containers (re)started."
	exit 1
fi

# Build the art-aggregator image
docker build -f $PWD/art-aggregator/Dockerfile -t albumartdb/art-aggregator $PWD/art-aggregator

if [ $? -ne 0 ];
then
	echo "Building the art-aggregator image failed."
	echo "No containers (re)started."
	exit 1
fi

# Deploy everything via docker-compose
docker-compose -f docker-compose.yml up -d

