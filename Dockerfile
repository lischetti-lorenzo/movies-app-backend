FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY tsconfig.json ./
COPY ./src ./src

RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start:migrate:dev" ]