const trimSlash = (value) => String(value || "").replace(/\/+$/, "");

export const API_URL = trimSlash(
  process.env.REACT_APP_API_URL || "http://localhost:8080"
);

export const PREVIEW_URL = trimSlash(
  process.env.REACT_APP_PREVIEW_URL || "http://localhost:8081"
);

export const PROJECTS_PATH =
  process.env.REACT_APP_PROJECTS_PATH ||
  "/Users/shalmaleeshenolikar/Documents/Application-builder/build/Projects/";

export function previewAppUrl(appName) {
  return `${PREVIEW_URL}/Projects/${encodeURIComponent(appName)}/index.html`;
}
