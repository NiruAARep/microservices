# Utiliser Node officiel
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8081
CMD ["node", "server.js"]
