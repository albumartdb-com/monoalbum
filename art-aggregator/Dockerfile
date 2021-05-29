# get mvp python running via docker

FROM archlinux:latest
RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm python python-pip
# packages for testing only
RUN pacman -S --noconfirm jq vi curl
WORKDIR /project/
COPY requirements.txt /project/
RUN pip3 install -r /project/requirements.txt
COPY main.py .env entrypoint.sh test* /project/
ENTRYPOINT ["/bin/sh", "entrypoint.sh"]
