### STAGE 1: Build ###
FROM node:18.14-alpine AS build
WORKDIR /usr/src/app
COPY ElderCareClient/package.json ElderCareClient/package-lock.json ./
RUN npm install
COPY ElderCareClient/. .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:stable-alpine
COPY ElderCareClient/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/elder-care-client /usr/share/nginx/html