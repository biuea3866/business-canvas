FROM node:16

WORKDIR /open-api-server

COPY package*.json /open-api-server
COPY tsconfig.json /open-api-server
COPY /src /open-api-server/src

RUN npm install
RUN npm run tsc

CMD ["npm", "start"]

EXPOSE 3000