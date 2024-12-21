# Устанавливаем базовый образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Устанавливаем netcat для проверки доступности порта
RUN apk add --no-cache netcat-openbsd

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы
COPY . .

# Добавляем скрипт для проверки готовности базы данных
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Указываем переменную окружения для базы данных
ENV DB_HOST=postgres
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=challenge-db

# Открываем порт для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["/wait-for-it.sh", "postgres:5432", "--", "npm", "start"]
