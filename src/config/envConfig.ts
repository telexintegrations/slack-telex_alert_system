import { configDotenv } from "dotenv";

configDotenv();

function getEnv(envKey: string): string {
  return process.env[envKey] ?? "";
}

export const envConfig = {
  PORT: getEnv("PORT"),
  TARGET_URL: getEnv("TARGET_URL"),
  TELEX_CHANNEL_WEBHOOK: getEnv("TELEX_CHANNEL_WEBHOOK"),
  TELEX_CHANNEL_ID: getEnv("TELEX_CHANNEL_ID"),
  SLACK_BOT_TOKEN: getEnv("SLACK_BOT_TOKEN"),
  SLACK_CHANNEL_ID: getEnv("SLACK_CHANNEL_ID"),
  SLACK_API_WEBHOOK: getEnv("SLACK_API_WEBHOOK"),
};
