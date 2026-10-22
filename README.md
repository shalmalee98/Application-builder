# Application Builder

Visual page studio for assembling interactive apps with drag-and-drop components, events, and a live preview.

Originally bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The UI now uses Tailwind CSS alongside Material UI v4 components.

## Requirements

- **Node.js** 18+ (Node 20 works; the start script sets the OpenSSL legacy provider for CRA 2)
- **Java 8 or 11** for the Spring Boot API jar (OpenJDK 11 via Homebrew works well on Apple Silicon)
- **npm**

## Quick start

Run these three processes from the repo root (separate terminals):

### 1. Install dependencies

```bash
npm install
```

### 2. Frontend (port 3000)

```bash
npm start
```

This builds Tailwind CSS, watches for style changes, and starts the React app at [http://localhost:3000](http://localhost:3000).

### 3. Backend API (port 8080)

```bash
export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"
java -jar original-SpringFileProj-1-0.0.1-SNAPSHOT.jar
```

The API handles save / list / load for projects under `build/Projects/`.

### 4. Preview server (port 8081)

Saved apps are written into `build/Projects/<appName>/`. Serve that folder so the **Run** button works:

```bash
mkdir -p build/Projects
npx http-server ./build -p 8081 -c-1 --cors
```

Preview URL pattern:

```text
http://localhost:8081/Projects/<appName>/index.html
```

If you see `EADDRINUSE` on 8081, something is already serving that port — open the URL above, or free it with:

```bash
kill $(lsof -tiTCP:8081 -sTCP:LISTEN)
```

## Production build

```bash
npm run build
```

Creates an optimized CRA build (after compiling Tailwind) in `build/`. Keep using the Spring jar + `http-server` for save/preview as above.

## Project notes

- Saved applications live in `build/Projects/`.
- The projects path used by the frontend is configured in `src/services/services.js` (`PROJECTS_PATH`). Update it if you move the repo.
- After restarting the Spring jar, save an app once before relying on **Open existing** / recent list (the API remembers the projects folder after the first save in that process).
- Key scripts:
  - `npm start` — Tailwind watch + React dev server
  - `npm run build:css` — one-shot Tailwind compile
  - `npm run build` — production frontend build

## Stack

- React 16 + Create React App 2
- Tailwind CSS 3
- Material UI 4
- Spring Boot executable jar (`original-SpringFileProj-1-0.0.1-SNAPSHOT.jar`)
