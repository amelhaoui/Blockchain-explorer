# Uses the node base image with the latest LTS version
FROM node:14.16.0
# Informs Docker that the container listens on the 
# specified network ports at runtime
EXPOSE 4000

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

# Installs npm dependencies on container
RUN npm ci
RUN npm run build

# Command container will actually run when called
CMD [ "npm","run", "start" ]