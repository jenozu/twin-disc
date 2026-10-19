FROM node:22-bookworm-slim
WORKDIR /opt/twd
COPY backend/package.json ./package.json
RUN npm install --omit=dev --no-audit --no-fund
COPY backend ./backend
COPY src/lib/rfq ./src/lib/rfq
RUN mkdir -p /srv/rfq-private && chown -R node:node /srv/rfq-private /opt/twd
USER node
ENV NODE_ENV=production
EXPOSE 4387
CMD ["node","--import","tsx","backend/src/index.ts"]
