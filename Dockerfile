# Development stage
FROM node:18 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY tsconfig.json ./
COPY ./src ./src

CMD ["npm", "run", "start:dev" ]

# Builder stage
FROM development as builder

WORKDIR /usr/src/app

COPY prisma ./prisma/
COPY .env .env

RUN npx prisma generate

RUN npm run build

COPY ./docker-entrypoint.sh .

EXPOSE ${NODE_PORT}
ENTRYPOINT ["bash", "docker-entrypoint.sh"]