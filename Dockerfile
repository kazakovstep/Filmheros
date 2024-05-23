# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы и директории в контейнер
COPY . .

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]