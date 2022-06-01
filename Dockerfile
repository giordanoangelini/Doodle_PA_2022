FROM node:lts-stretch-slim
COPY . .
RUN npm install
CMD ["node", "node/app.js"]