# Используем официальный образ Node.js в качестве базового
FROM node:20-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json ./
COPY package-lock.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем остальные файлы проекта в контейнер
COPY . .

# Создаем сборку приложения
RUN npm run build

# Открываем порт, на котором будет работать Nginx
EXPOSE 3000

# Запускаем Nginx
CMD [ "npm", "start" ]
