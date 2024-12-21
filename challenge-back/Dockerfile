# challenge-back/Dockerfile
FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Выполнение миграций
RUN npx sequelize-cli db:migrate

EXPOSE 3000

CMD ["npm", "run", "start"]