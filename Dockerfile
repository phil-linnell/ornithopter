FROM node:5-slim
MAINTAINER Arnau Siches <asiches@gmail.com>

ENV TERM xterm-256color
ENV NODE_PATH /home/ornithopter/lib
ENV PATH $PATH:/home/ornithopter/node_modules/.bin

WORKDIR /home/ornithopter
COPY package.json /home/ornithopter/package.json
COPY .babelrc /home/ornithopter/.babelrc

RUN npm install

COPY ./lib /home/ornithopter/lib
COPY ./tests /home/ornithopter/tests
