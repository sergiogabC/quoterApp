# Imagen base con Node.js y Java
FROM node:22-bullseye

# Instalar JDK (para tu .jar)
RUN apt-get update && apt-get install -y openjdk-21-jre && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de Node
RUN npm install --only=production

# Copiar el código de tu app
COPY . .

# Exponer el puerto de Express
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]