FROM node:18.19.0-bullseye-slim as builder

WORKDIR /usr/src/app

RUN npm install -g @angular/cli@17.1.1

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM builder as dev-envs

RUN apt-get update && \
apt-get install -y --no-install-recommends git

RUN useradd -s /bin/bash -m vscode && \
groupadd docker && \
usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["ng", "serve", "--host", "0.0.0.0", "--configuration", "development-docker"]
