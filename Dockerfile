FROM node:argon

COPY . /deploy

WORKDIR /deploy
RUN npm install

CMD node app.js

