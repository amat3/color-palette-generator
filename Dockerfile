# ═══════════════════════════════════════════════════════
# STAGE 1: BUILDER
# ═══════════════════════════════════════════════════════
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Compilar Next.js
RUN npm run build

# ═══════════════════════════════════════════════════════
# STAGE 2: RUNNER (Imagen final - producción)
# ═══════════════════════════════════════════════════════
FROM node:20-alpine

WORKDIR /app

# Variables de entorno para producción
ENV NODE_ENV=production

# Copiar package.json (npm start lo necesita)
COPY --from=builder /app/package*.json ./

# Copiar node_modules compilados
COPY --from=builder /app/node_modules ./node_modules

# Copiar .next compilado
COPY --from=builder /app/.next ./.next

# Copiar public (si tienes imágenes, fonts, etc.)
# COPY --from=builder /app/public ./public

# Puerto
EXPOSE 3000

# Comando
CMD ["npm", "start"]