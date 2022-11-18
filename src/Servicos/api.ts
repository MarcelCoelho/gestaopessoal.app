import axios from "axios";

export const api = axios.create({
  //baseURL: "http://localhost:7000",
  baseURL: "https://localhost:7018",
});