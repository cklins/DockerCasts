FROM node:alpine

WORKDIR '/app'

ENV MONGODB_URI=mongodb://mongo-db:27017/multi-container
ENV REDIS_URI=redis://redis-server:6379

COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]