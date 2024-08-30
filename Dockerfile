# Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

COPY . .

EXPOSE 3000
CMD [ "node", "dist/app.js" ]
