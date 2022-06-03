FROM node:lts-stretch-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["node", "ts-built/router.js"]