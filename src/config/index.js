import * as http from "axios";

export const axios = http.create({
  baseURL: "https://hiring-task-api.herokuapp.com/v1/",
  responseType: "json"
});