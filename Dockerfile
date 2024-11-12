FROM node:18.19.0-bullseye-slim as builder

WORKDIR /usr/src/app

RUN npm install -g @angular/cli@17.1.1

COPY package.json package-lock.json ./
COPY . .
RUN npm ci
RUN ng build

FROM nginx:stable-alpine3.20-slim as dev-envs

COPY --from=builder /usr/src/app/dist/productos-bancarios/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
