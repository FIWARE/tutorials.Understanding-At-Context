ARG  NODE_VERSION=14-slim
FROM node:${NODE_VERSION}

COPY . /usr/src/app

# Create app directory
WORKDIR /usr/src/app

RUN npm install --production && \
    rm -rf /root/.npm/cache/* &&\
    chmod +x entrypoint.sh

VOLUME ["/files"]
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]