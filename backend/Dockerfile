# get mvp python running via docker

FROM archlinux:latest
RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm python python-pip 
COPY requirements.txt .env /project/
WORKDIR /project/
RUN pip3 install -r requirements.txt
COPY main.py /project/
#ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
