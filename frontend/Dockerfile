# get mvp express js running via docker

FROM archlinux:latest
EXPOSE 3000
RUN pacman -Syyu --noconfirm
RUN pacman -S --noconfirm nodejs npm
WORKDIR /project/
RUN npm install express --save
# test packages
RUN pacman -S --noconfirm vi
COPY myapp/ entrypoint.sh /project/
#RUN npx -y express-generator
WORKDIR /project/myapp
RUN npm install
ENTRYPOINT ["/bin/sh", "/project/entrypoint.sh"]
