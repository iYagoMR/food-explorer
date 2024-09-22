import axios from "axios";

export const api = axios.create({
  baseURL: 'https://n5iacyjb69.execute-api.us-east-1.amazonaws.com/prod'
});
