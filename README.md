# Application Builder

Visual page studio for assembling interactive apps with drag-and-drop components, events, and a live preview.

Originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The UI now uses Tailwind CSS alongside Material UI v4 components.

## Requirements

- **Node.js** 18+ (Node 20 works; the start script sets the OpenSSL legacy provider for CRA 2)
- **Java 8 or 11** for the Spring Boot API jar (OpenJDK 11 via Homebrew works well on Apple Silicon)
- **npm**

## Quick start (local)

Run these three processes from the repo root (separate terminals):

### 1. Install dependencies

```bash
npm install
```

### 2. Frontend (port 3000)

```bash
npm start
```

App: [http://localhost:3000](http://localhost:3000)

### 3. Backend API (port 8080)

```bash
export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"
java -jar original-SpringFileProj-1-0.0.1-SNAPSHOT.jar
```

### 4. Preview server (port 8081)

```bash
mkdir -p build/Projects
npx http-server ./build -p 8081 -c-1 --cors
```

Preview URL:

```text
http://localhost:8081/Projects/<appName>/index.html
```

## Production build

```bash
npm run build
```

Optional build-time env vars:

| Variable | Default | Purpose |
|---|---|---|
| `REACT_APP_API_URL` | `http://localhost:8080` | Spring Boot API base URL |
| `REACT_APP_PREVIEW_URL` | `http://localhost:8081` | Preview host for Run |
| `REACT_APP_PROJECTS_PATH` | local `build/Projects/` path | Absolute path the API writes to |

## Deploying

### Frontend (GitHub Pages)

Workflow: `.github/workflows/deploy-pages.yml`

1. Repo **Settings → Pages → Source = GitHub Actions**
2. Site: `https://shalmalee98.github.io/Application-builder/`

### Backend jar + preview (Render)

`Dockerfile` runs the Spring Boot jar and a Node proxy on one public port:

- `/save`, `/getall`, `/getjson` → jar
- `/Projects/*` → saved apps
- `/health` → health check

**Recommended:** [Deploy to Render](https://render.com/deploy?repo=https://github.com/shalmalee98/Application-builder) (uses `render.yaml`).

1. Sign up / sign in on Render (Google or email works; GitHub OAuth is optional).
2. Approve the Blueprint → create `application-builder-api`.
3. After deploy, copy the service URL (e.g. `https://application-builder-api.onrender.com`).

Point the frontend at that URL:

```bash
REACT_APP_API_URL=https://YOUR-SERVICE.onrender.com \
REACT_APP_PREVIEW_URL=https://YOUR-SERVICE.onrender.com \
REACT_APP_PROJECTS_PATH=/data/Projects/ \
npm run build
```

Free tier has no persistent disk — saves reset when the instance sleeps/restarts. Upgrade and add a disk at `/data` if you need persistence.

#### Railway (optional)

Railway sometimes disables new signups. If you already have an account:

```bash
npx @railway/cli login
npx @railway/cli init
npx @railway/cli up
npx @railway/cli domain
```

Set `PROJECTS_DIR=/data/Projects`, `API_PORT=18080`, and attach a volume at `/data`.

## Project notes

- Local saves go to `build/Projects/`.
- Config lives in `src/config.js`.
- After restarting the Spring jar, save once before relying on Open Existing (the API remembers the projects folder after the first save).

## Stack

- React 16 + Create React App 2
- Tailwind CSS 3
- Material UI 4
- Spring Boot executable jar (`original-SpringFileProj-1-0.0.1-SNAPSHOT.jar`)
