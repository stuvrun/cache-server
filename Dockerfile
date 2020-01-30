FROM node:12.14.0-alpine
LABEL MAINTAINER="i@braren.co"

# Export HTTP & Transport
EXPOSE 11211

# Environment variable
ENV NODE_ENV="production"

# Copy configuration
COPY . /home/node/app

WORKDIR /home/node/app

ENV PATH=$PATH:/home/node/.npm-global/bin

RUN chmod -R 777 /home/node/app

RUN cd /home/node/app \
  && npm install

USER node

CMD ["npm", "run", "start"]
