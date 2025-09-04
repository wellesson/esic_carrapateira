# ---- build (Vite) ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Passe variáveis de build com prefixo VITE_ pelo EasyPanel se precisar
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# ---- runtime (Nginx) ----
FROM nginx:1.27-alpine
# Nginx ouvindo 4005 e SPA fallback
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 4005
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:4005/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
