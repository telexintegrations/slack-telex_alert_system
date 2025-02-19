import { configDotenv } from "dotenv";

configDotenv();

function getEnv(envKey: string): string {
  return process.env[envKey] ?? "";
}

export const envConfig = {
  PORT: getEnv("PORT"),
  TARGET_URL: getEnv("TARGET_URL"),
  TICK_URL: getEnv("TICK_URL"),
};
