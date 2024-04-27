FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install -g npm@10.6.0

COPY . .

CMD [ "npm", "run", "build" ]
