# Базовый образ для Vue.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы
COPY . .

# Строим проект
RUN npm run build

# Устанавливаем NGINX для обслуживания фронтенда
FROM nginx:alpine

# Копируем собранные файлы в папку nginx
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

# Открываем порт для nginx
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
