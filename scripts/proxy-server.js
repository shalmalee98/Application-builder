/**
 * Single public entrypoint for the Spring Boot jar + saved project previews.
 * - Proxies /save, /getall, /getjson to the jar on 8080
 * - Serves saved apps from PROJECTS_DIR at /Projects/*
 */
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 3001);
const API_ORIGIN = process.env.API_ORIGIN || "http://127.0.0.1:8080";
const PROJECTS_DIR =
  process.env.PROJECTS_DIR ||
  path.join(process.cwd(), "build", "Projects");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function sendCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, Accept"
  );
}

function proxyToApi(req, res) {
  const target = new URL(req.url, API_ORIGIN);
  const lib = target.protocol === "https:" ? https : http;
  const headers = Object.assign({}, req.headers, {
    host: target.host,
  });

  const upstream = lib.request(
    {
      protocol: target.protocol,
      hostname: target.hostname,
      port: target.port,
      path: target.pathname + target.search,
      method: req.method,
      headers,
    },
    (upRes) => {
      const outHeaders = Object.assign({}, upRes.headers);
      outHeaders["access-control-allow-origin"] = "*";
      res.writeHead(upRes.statusCode || 502, outHeaders);
      upRes.pipe(res);
    }
  );

  upstream.on("error", (err) => {
    sendCors(res);
    res.writeHead(502, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "API unavailable", detail: String(err) }));
  });

  req.pipe(upstream);
}

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const full = path.normalize(path.join(root, decoded));
  if (!full.startsWith(path.normalize(root + path.sep)) && full !== path.normalize(root)) {
    return null;
  }
  return full;
}

function serveProjects(req, res) {
  const rel = req.url.replace(/^\/Projects\/?/, "");
  const filePath = safeJoin(PROJECTS_DIR, rel || "");
  if (!filePath) {
    sendCors(res);
    res.writeHead(400);
    res.end("Bad path");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      sendCors(res);
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    let finalPath = filePath;
    if (stats.isDirectory()) {
      finalPath = path.join(filePath, "index.html");
    }

    fs.readFile(finalPath, (readErr, data) => {
      if (readErr) {
        sendCors(res);
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      const ext = path.extname(finalPath).toLowerCase();
      sendCors(res);
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
      });
      res.end(data);
    });
  });
}

function health(req, res) {
  sendCors(res);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      ok: true,
      projectsDir: PROJECTS_DIR,
      api: API_ORIGIN,
    })
  );
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    sendCors(res);
    res.writeHead(204);
    res.end();
    return;
  }

  const urlPath = (req.url || "/").split("?")[0];

  if (urlPath === "/" || urlPath === "/health") {
    health(req, res);
    return;
  }

  if (
    urlPath === "/save" ||
    urlPath === "/getall" ||
    urlPath === "/getjson" ||
    urlPath.startsWith("/save?") ||
    urlPath.startsWith("/getjson?")
  ) {
    proxyToApi(req, res);
    return;
  }

  if (urlPath === "/Projects" || urlPath.startsWith("/Projects/")) {
    serveProjects(req, res);
    return;
  }

  sendCors(res);
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found", path: urlPath }));
});

fs.mkdirSync(PROJECTS_DIR, { recursive: true });

server.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Proxy listening on ${PORT}; API=${API_ORIGIN}; Projects=${PROJECTS_DIR}`
  );
});
