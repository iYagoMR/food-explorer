import axios from "axios";

export const api = axios.create({
  baseURL: 'https://1hsv9lpnol.execute-api.us-east-1.amazonaws.com/prod'
});
