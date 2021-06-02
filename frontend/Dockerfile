# Dockerfile to build the image running the frontend 

# base image and initial system updates
FROM debian:latest
RUN apt-get -qq -y update
RUN apt-get -qq -y full-upgrade

# required app packages
RUN apt-get -qq -y install npm

# specific app setup
WORKDIR /project/
COPY ./myapp /project/
WORKDIR /project/myapp
ENTRYPOINT ["npm", "run", "dev"]
