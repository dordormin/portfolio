FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build the application
COPY . .
RUN npm run build

# Serve with Nginx
# Pinned version (security audit 2026-10-11, M-03): no floating tags
FROM nginx:1.31.6-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# CIS 4.1: run as non-root (security audit 2026-10-11, M-02)
# Port 80 binding works thanks to Docker's default CAP_NET_BIND_SERVICE.
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx && \
    touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
