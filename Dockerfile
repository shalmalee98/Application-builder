FROM eclipse-temurin:11-jre-jammy

RUN apt-get update \
  && apt-get install -y --no-install-recommends curl ca-certificates \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y --no-install-recommends nodejs \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY original-SpringFileProj-1-0.0.1-SNAPSHOT.jar ./original-SpringFileProj-1-0.0.1-SNAPSHOT.jar
COPY scripts/start-backend.sh ./scripts/start-backend.sh
COPY scripts/proxy-server.js ./scripts/proxy-server.js

RUN chmod +x ./scripts/start-backend.sh \
  && mkdir -p /data/Projects

ENV API_PORT=18080 \
    PROJECTS_DIR=/data/Projects \
    JAR_PATH=/app/original-SpringFileProj-1-0.0.1-SNAPSHOT.jar \
    PORT=8080

EXPOSE 8080

CMD ["./scripts/start-backend.sh"]
