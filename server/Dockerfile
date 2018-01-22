FROM mhart/alpine-node:8.9.4

WORKDIR /usr/src/app
COPY package.json .

RUN yarn install
RUN yarn global add nodemon

COPY . .

CMD [ "yarn","start-dev" ]