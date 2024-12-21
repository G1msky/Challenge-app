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
ENV DB_HOST=postgres
ENV DB_USER=your_user_name
ENV DB_PASSWORD=your_password
ENV DB_NAME=your_database_name

# Открываем порт для приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
