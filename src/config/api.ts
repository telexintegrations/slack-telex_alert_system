import axios, { AxiosInstance } from "axios";
import { envConfig } from "./envConfig";

export const TelexApiCLient: AxiosInstance = axios.create({
  baseURL: envConfig.TELEX_CHANNEL_WEBHOOK,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const SlackApiCLient: AxiosInstance = axios.create({
  baseURL: envConfig.SLACK_CHANNEL_WEBHOOK,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
