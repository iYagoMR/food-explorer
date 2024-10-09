import axios from "axios";

export const api = axios.create({
  baseURL: 'https://hvzp4y5nx8.execute-api.us-east-1.amazonaws.com/prod'
});
