FROM node:11

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app

EXPOSE 8032
# Env

ARG PORT=8032
ENV PORT=${PORT}

ARG USERNAME=root
ENV AUTH_USERNAME=${USERNAME}

ARG PASSWORD=root
ENV AUTH_PASSWORD=${PASSWORD}


CMD [ "node", "index" ]
