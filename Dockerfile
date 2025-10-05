# Etapa 1: Build de Angular
FROM docker.io/library/node:18-alpine AS builder
WORKDIR /app

# Copiar dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Build de producción usando environment.prod.ts
RUN npm run build -- --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar build de Angular al directorio de Nginx
COPY --from=builder /app/www /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto HTTP
EXPOSE 80

# Ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
