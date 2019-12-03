FROM node

MAINTAINER Matt Otto "matt@ottoinfo.com"

RUN mkdir -p /data/src
WORKDIR /data/src
COPY . .

EXPOSE 3002

RUN yarn
CMD yarn start
