import { notifyError } from "../components/toast/notify";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/svg+xml"];
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_DATA_BYTES = 2 * 1024 * 1024;

export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
      <rect width="640" height="400" fill="#e2eaed"/>
      <rect x="24" y="24" width="592" height="352" rx="16" fill="#f8fbfb" stroke="#97b0ba" stroke-dasharray="8 8"/>
      <text x="320" y="190" text-anchor="middle" fill="#4f7382" font-family="Sora,sans-serif" font-size="22" font-weight="600">Upload an image</text>
      <text x="320" y="222" text-anchor="middle" fill="#688d9a" font-family="IBM Plex Mono,monospace" font-size="13">PNG, JPG, GIF, WEBP, SVG</text>
    </svg>`
  );

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Could not read file"));
    reader.readAsText(file);
  });
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

function coerceValue(raw) {
  const value = String(raw == null ? "" : raw).trim();
  if (value === "") {
    return "";
  }
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return value;
}

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      cells.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(current);
  return cells;
}

export function parseCsv(text) {
  const lines = String(text || "")
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "");
  if (lines.length < 2) {
    throw new Error("CSV needs a header row and at least one data row");
  }
  const headers = parseCsvLine(lines[0]).map((h) => h.trim());
  if (headers.some((h) => !h)) {
    throw new Error("CSV headers cannot be empty");
  }
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = coerceValue(cells[index]);
    });
    return row;
  });
}

export function parseJsonDataset(text) {
  const parsed = JSON.parse(text);
  if (Array.isArray(parsed)) {
    if (parsed.length === 0) {
      throw new Error("JSON array is empty");
    }
    if (parsed.every((row) => row && typeof row === "object" && !Array.isArray(row))) {
      return parsed;
    }
    throw new Error("JSON must be an array of objects");
  }
  if (parsed && typeof parsed === "object" && Array.isArray(parsed.data)) {
    return parseJsonDataset(JSON.stringify(parsed.data));
  }
  throw new Error("JSON must be an array of objects");
}

export function classifyColumns(rows) {
  const dimensions = [];
  const measures = [];
  const first = rows && rows[0];
  if (!first) {
    return { dimensions, measures };
  }
  Object.keys(first).forEach((key) => {
    if (typeof first[key] === "number") {
      measures.push(key);
    } else {
      dimensions.push(key);
    }
  });
  return { dimensions, measures };
}

export async function readImageFile(file) {
  if (!file) {
    throw new Error("No file selected");
  }
  if (!IMAGE_TYPES.includes(file.type) && !/\.(png|jpe?g|gif|webp|svg)$/i.test(file.name)) {
    throw new Error("Choose an image file (PNG, JPG, GIF, WEBP, or SVG)");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 4MB or smaller");
  }
  return readAsDataURL(file);
}

export async function readDatasetFile(file) {
  if (!file) {
    throw new Error("No file selected");
  }
  if (file.size > MAX_DATA_BYTES) {
    throw new Error("Data file must be 2MB or smaller");
  }
  const text = await readAsText(file);
  const name = String(file.name || "").toLowerCase();
  let rows;
  if (name.endsWith(".csv") || file.type === "text/csv") {
    rows = parseCsv(text);
  } else if (name.endsWith(".json") || file.type === "application/json") {
    rows = parseJsonDataset(text);
  } else {
    try {
      rows = parseJsonDataset(text);
    } catch (jsonErr) {
      try {
        rows = parseCsv(text);
      } catch (csvErr) {
        throw new Error("Upload a .csv or .json file with rows of data");
      }
    }
  }
  if (!rows.length) {
    throw new Error("No rows found in file");
  }
  return {
    rows,
    fileName: file.name,
    ...classifyColumns(rows),
  };
}

export async function safeReadImage(file) {
  try {
    return await readImageFile(file);
  } catch (err) {
    notifyError((err && err.message) || "Could not read image");
    return null;
  }
}

export async function safeReadDataset(file) {
  try {
    return await readDatasetFile(file);
  } catch (err) {
    notifyError((err && err.message) || "Could not read data file");
    return null;
  }
}
