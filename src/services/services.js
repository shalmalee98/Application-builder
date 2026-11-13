import axios from "axios";
import { notifyError, notifySuccess } from "../components/toast/notify";
import { API_URL, PROJECTS_PATH } from "../config";

export { PROJECTS_PATH };

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function save_file(data) {
  return axios
    .post(`${API_URL}/save`, data, {
      params: {
        path: PROJECTS_PATH,
      },
      timeout: 60000,
    })
    .then((response) => {
      notifySuccess(
        'Your application "' + data.name + '" is ' + response.data
      );
      return response.data;
    })
    .catch(function (error) {
      const detail =
        (error &&
          error.response &&
          error.response.data &&
          (error.response.data.message || error.response.data.error)) ||
        (error && error.message) ||
        "Could not save the application";
      notifyError(detail);
      return null;
    });
}

export function getApplicationList() {
  return axios
    .get(`${API_URL}/getall`, { timeout: 60000 })
    .then((response) => {
      return isPlainObject(response.data) ? response.data : {};
    })
    .catch(function (error) {
      // Cold jar can 500 before the first save; treat as empty library.
      const status = error && error.response && error.response.status;
      if (status === 500 || status === 404) {
        return {};
      }
      notifyError(
        (error && error.message) || "Could not load application list"
      );
      return {};
    });
}

export function getApplicationJson(appName) {
  return axios
    .get(`${API_URL}/getjson`, {
      params: {
        name: appName,
      },
      timeout: 60000,
    })
    .then((response) => {
      return response.data || null;
    })
    .catch(function (error) {
      notifyError(
        (error && error.message) || "Cannot retrieve application data"
      );
      return null;
    });
}
