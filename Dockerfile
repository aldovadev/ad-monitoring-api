FROM node:22-alpine AS build

LABEL maintainer="Aldova Guswantri <aldova811@gmail.com>"

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run test
RUN npm run build


FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules

EXPOSE 8000

CMD ["npm", "start"]
