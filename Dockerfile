FROM node:20-alpine

WORKDIR /app

ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

ARG NEXT_PUBLIC_YANDEX_API_KEY
ENV NEXT_PUBLIC_YANDEX_API_KEY=$NEXT_PUBLIC_YANDEX_API_KEY

# pnpm yoqamiz
RUN corepack enable

# fayllarni ko‘chiramiz
COPY . .

# dependency o‘rnatamiz
RUN pnpm install

# build qilamiz
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]

