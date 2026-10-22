import axios from "axios";
const URL = "http://localhost:8080";
export const PROJECTS_PATH =
  "/Users/shalmaleeshenolikar/Documents/Application-builder/build/Projects/";

export function save_file(data) {
  axios
    .post(`${URL}/save`, data, {
      params: {
        path: PROJECTS_PATH,
      },
    })
    .then((response) => {
      alert('Your application "' + data.name + '" is ' + response.data);
    })
    .catch(function (error) {
      alert("This is an error in saving whole application");
    });
}
export function getApplicationList() {
  return axios
    .get(`${URL}/getall`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      alert(error);
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
      console.log(response.data);
      console.log(response.data.components);
      return response.data;
    })
    .catch(function (error) {
      alert("Cannot retrieve json data");
    });
}
