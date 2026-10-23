import axios from "axios";
import { notifyError, notifySuccess } from "../components/toast/notify";
import { API_URL, PROJECTS_PATH } from "../config";

export { PROJECTS_PATH };

export function save_file(data) {
  return axios
    .post(`${API_URL}/save`, data, {
      params: {
        path: PROJECTS_PATH,
      },
    })
    .then((response) => {
      notifySuccess(
        'Your application "' + data.name + '" is ' + response.data
      );
      return response.data;
    })
    .catch(function () {
      notifyError("Could not save the application");
    });
}
export function getApplicationList() {
  return axios
    .get(`${API_URL}/getall`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      notifyError(
        (error && error.message) || "Could not load application list"
      );
    });
}

export function getApplicationJson(appName) {
  return axios
    .get(`${API_URL}/getjson`, {
      params: {
        name: appName,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(function () {
      notifyError("Cannot retrieve application data");
    });
}
