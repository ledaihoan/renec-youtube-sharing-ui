# Dependencies
FROM public.ecr.aws/docker/library/node:20.15.0-slim AS deps

WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases/yarn-4.3.1.cjs .yarn/releases/yarn-4.3.1.cjs
RUN yarn install

# Rebuild source
FROM public.ecr.aws/docker/library/node:20.15.0-slim AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build


# Run service
FROM public.ecr.aws/docker/library/node:20.15.0-slim AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 demogroup
RUN adduser --system --uid 1001 demouser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=demouser:demogroup /app/.next/standalone ./
COPY --from=builder --chown=demouser:demogroup /app/.next/static ./.next/static

USER demouser

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]