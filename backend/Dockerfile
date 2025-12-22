FROM node:20-bullseye


WORKDIR /nodeapp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "dev"]
