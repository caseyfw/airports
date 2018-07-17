FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --update --no-cache git python make g++ && \
    npm install && \
    apk del git python make g++ && \
    rm -rf /var/cache/apk
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
