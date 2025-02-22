import express from "express";
import logger from "../config/logger";

interface RequestTracker {
  count: number;
  timeout?: NodeJS.Timeout;
}

const requestCounts: Record<string, RequestTracker> = {};
const MAX_REQUESTS = 3;
const TIMEOUT_MS = 30000;

export const requestLimiter: express.RequestHandler = (req, res, next) => {
  const clientIP = req.ip || "unknown";

  if (!requestCounts[clientIP]) {
    requestCounts[clientIP] = { count: 0 };
  }

  const tracker = requestCounts[clientIP];
  tracker.count += 1;

  if (tracker.count > MAX_REQUESTS) {
    logger.error({ error: "Too many requests. Try again later." });
    res.end();
    return;
  }

  if (tracker.timeout) clearTimeout(tracker.timeout);

  tracker.timeout = setTimeout(() => {
    delete requestCounts[clientIP];
  }, TIMEOUT_MS);

  next();
};
