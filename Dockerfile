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

RUN npx prisma generate

RUN if [ "$NODE_ENV" = "debug" ]; then \
  npx prisma migrate dev; \
else \
  npx prisma migrate deploy; \
fi

RUN npm run build
