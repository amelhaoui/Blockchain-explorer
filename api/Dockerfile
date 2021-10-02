# Uses the node base image with the latest LTS version
FROM node:14-alpine

RUN apk add --no-cache --update curl bash

# Informs Docker that the container listens on the 
# specified network ports at runtime

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

# Installs npm dependencies on container
RUN npm ci
RUN  ls -l
RUN npm run build

RUN adduser -D myuser
USER myuser

# Command container will actually run when called
CMD [ "npm","run", "start" ]