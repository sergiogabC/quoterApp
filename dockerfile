# Imagen base con Java 21
FROM openjdk:21-jdk-slim

# Instalar Node.js 22
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Crear directorio de la app
WORKDIR /quoterApp

# Copiar package.json y package-lock.json primero para aprovechar la cache
COPY package*.json ./

# Instalar dependencias de Node.js
RUN npm install --production

# Copiar el resto del proyecto (incluyendo tu .jar y tu workbook.xlsx si aplica)

COPY data/ ./data/
COPY services/ ./services/
COPY controllers/ ./controllers/
COPY models/ ./models/
COPY routes/ ./routes/
COPY utils/ ./utils/
COPY views/ ./views/
COPY app.js ./ 

# Exponer el puerto que Render usará ($PORT)
EXPOSE 3000

# Comando de arranque
CMD ["npm", "start"]
