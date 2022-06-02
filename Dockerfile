FROM node:lts-stretch-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["node", "node/app.js"]