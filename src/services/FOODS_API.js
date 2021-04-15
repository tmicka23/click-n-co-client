import axios from "axios";
const baseURL = process.env.VUE_APP_SPOONACULAR_BASE_URL;

const API = axios.create({ baseURL });
export const defaultFetcher = (relativeUrl, ...options) =>
  API.get(relativeUrl, ...options).then((res) => res.data);

const placeTokenInRequestUrl = (req) => {
  const token = process.env.VUE_APP_SPOONACULAR_KEY;
  if (token) {
    req.url = `${req.url}&apiKey=${token}`;
  }
  return req;
};

API.interceptors.request.use(placeTokenInRequestUrl);

export default API;
