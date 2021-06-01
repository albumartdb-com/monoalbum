# get mvp python running via docker

FROM archlinux:latest
RUN pacman -Syyu --noconfirm
RUN pacman -S --noconfirm npm
WORKDIR /project/
COPY ./myapp entrypoint.sh /project/
ENTRYPOINT ["/bin/sh", "entrypoint.sh"]
