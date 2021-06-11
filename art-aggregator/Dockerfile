# Dockerfile to build the image running the art-aggregator microservice 

# base image and initial system updates
FROM debian:latest
RUN apt-get -qq -y update
RUN apt-get -qq -y full-upgrade

# required app packages
RUN apt-get -qq -y install python3 python3-pip 
# testing only packages
RUN apt-get -qq -y install jq vim curl man-db htop

# install logging shipper daemon
WORKDIR /opt/
RUN curl -L -O https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-7.13.1-amd64.deb
RUN dpkg -i filebeat-7.13.1-amd64.deb
COPY filebeat.yml /etc/filebeat/

# specific app setup
WORKDIR /project/
COPY requirements.txt /project/
RUN pip3 install -q -r /project/requirements.txt
COPY *.py log_config.yaml .env /project/

# container executable
COPY entrypoint.sh /usr/local/bin/
ENTRYPOINT ["bash", "entrypoint.sh"]
