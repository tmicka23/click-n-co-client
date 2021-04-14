import axios from "axios";
const baseURL = process.env.VUE_APP_API_BASE_URL;

const API = axios.create({ baseURL });
export const defaultFetcher = (relativeUrl, ...options) =>
  API.get(relativeUrl, ...options).then((res) => res.data);

export default API;
