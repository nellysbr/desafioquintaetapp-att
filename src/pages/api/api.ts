import axios from "axios";

const api = axios.create({
  baseURL: "https://us-central1-desafio-quinta-etapa.cloudfunctions.net/api",
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default api;
