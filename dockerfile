FROM node:alpine

ENV PORT=80

RUN apk add --update git && \
  rm -rf /tmp/* /var/cache/apk/*

ADD package.json /tmp/package.json
ADD yarn.lock /tmp/yarn.lock
RUN cd /tmp && yarn install
RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app

ADD . /usr/app

WORKDIR '/usr/app'
RUN npm run build

CMD [ "npm", "start" ]