FROM node:10.15.3-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app/

RUN yarn install

EXPOSE 3000

CMD [ "npm", "start" ]