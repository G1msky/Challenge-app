# Устанавливаем базовый образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы
COPY . .

# Указываем переменную окружения для базы данных
ENV DB_HOST=161.35.29.112
ENV DB_USER=postgres
ENV DB_PASSWORD=postgres
ENV DB_NAME=challenge-db

# Открываем порт для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
