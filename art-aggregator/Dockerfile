# Dockerfile to build the image running the art-aggregator microservice 

# base image and initial system updates
FROM debian:latest
RUN apt-get -qq -y update
RUN apt-get -qq -y full-upgrade

# required app packages
RUN apt-get -qq -y install python3 python3-pip 
# testing only packages
RUN apt-get -qq -y install jq vim curl man-db

# specific app setup
WORKDIR /project/
COPY requirements.txt /project/
RUN pip3 install -r /project/requirements.txt
COPY app.py api_calls.py mongo_calls.py .env test* /project/
ENTRYPOINT ["python3", "/project/app.py"]
