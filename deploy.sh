#!/bin/sh

#build front image
docker build -f ./frontend/Dockerfile -t albumartdb/frontend ./frontend

#build back image
docker build -f ./backend/Dockerfile -t albumartdb/backend ./backend

#run everything via docker-compose
docker-compose -f docker-compose.yml up -d

