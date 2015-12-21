FROM node:5-slim
MAINTAINER Arnau Siches <asiches@gmail.com>

ENV TERM xterm-256color
ENV NODE_PATH /home/ornithopter/server
ENV PATH $PATH:/home/ornithopter/node_modules/.bin

WORKDIR /home/ornithopter
COPY package.json /home/ornithopter/package.json
COPY .babelrc /home/ornithopter/.babelrc

RUN npm install

COPY ./src /home/ornithopter/src
COPY ./tests /home/ornithopter/tests
