#!/usr/bin/env sh
set -eu

ROOT_DIR="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
JAR="${JAR_PATH:-$ROOT_DIR/original-SpringFileProj-1-0.0.1-SNAPSHOT.jar}"
PROJECTS_DIR="${PROJECTS_DIR:-/data/Projects}"
API_PORT="${API_PORT:-18080}"
PORT="${PORT:-8080}"

mkdir -p "$PROJECTS_DIR"

echo "Starting Spring Boot jar on ${API_PORT}..."
java -jar "$JAR" --server.port="$API_PORT" &
JAVA_PID=$!

cleanup() {
  kill "$JAVA_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

i=0
until curl -sf "http://127.0.0.1:${API_PORT}/" >/dev/null 2>&1; do
  i=$((i + 1))
  if [ "$i" -gt 90 ]; then
    echo "Spring Boot failed to become ready"
    exit 1
  fi
  sleep 1
done

echo "Spring Boot is ready. Starting public proxy on ${PORT}..."
export API_ORIGIN="http://127.0.0.1:${API_PORT}"
export PROJECTS_DIR
export PORT
exec node "$ROOT_DIR/scripts/proxy-server.js"
