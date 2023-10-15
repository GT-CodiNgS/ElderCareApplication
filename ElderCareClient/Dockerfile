### STAGE 1: Build ###
FROM node:18.16-alpine AS build
WORKDIR /usr/src/app
COPY Web/package.json Web/package-lock.json ./
RUN npm install
COPY Web/. .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:stable-alpine
COPY Web/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/ososerp-web /usr/share/nginx/html