# Development stage
FROM node:18-alpine3.16 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY tsconfig.json ./
COPY ./src ./src

COPY ./docker-entrypoint.sh .
ENTRYPOINT ["sh", "docker-entrypoint.sh"]

# Builder stage
FROM development as builder

WORKDIR /usr/src/app

RUN npm run build

RUN rm -rf node_modules
RUN npm ci --only=production

# Production stage
FROM node:18-alpine3.16 as production
RUN apk --no-cache add nodejs ca-certificates
WORKDIR /root/
COPY --from=builder /usr/src/app ./

COPY ./docker-entrypoint.sh .
ENTRYPOINT ["sh", "docker-entrypoint.sh"]
CMD [ "node", "dist/main" ]