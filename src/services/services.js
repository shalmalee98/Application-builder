import axios from "axios";
import { notifyError, notifySuccess } from "../components/toast/notify";

const URL = "http://localhost:8080";
export const PROJECTS_PATH =
  "/Users/shalmaleeshenolikar/Documents/Application-builder/build/Projects/";

export function save_file(data) {
  return axios
    .post(`${URL}/save`, data, {
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
    .get(`${URL}/getall`)
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
    .get(`${URL}/getjson`, {
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
