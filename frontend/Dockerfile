# get mvp python running via docker

FROM debian:latest
RUN apt-get -qq -y update
RUN apt-get -qq -y full-upgrade
RUN apt-get -qq -y install npm
WORKDIR /project/
COPY ./myapp entrypoint.sh /project/
WORKDIR /project/myapp
ENTRYPOINT ["npm", "run", "dev"]
