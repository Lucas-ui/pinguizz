# ./client/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copie uniquement les fichiers nécessaires à l'installation
COPY package*.json ./

RUN npm install

# Ensuite, copie le reste de l'app
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
