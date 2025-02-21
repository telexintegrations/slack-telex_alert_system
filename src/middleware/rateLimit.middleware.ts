import express from "express";
// import rateLimit from "express-rate-limit";

// const rateLimiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 1,
//   message: "Time Out",
//   headers: true,
// });

// export default rateLimiter;
// JSON.stringify({
//   status: "error",
//   message:
//     'Invalid Prompt. \nMessage Prompt - Should be in this format: "/slack-[slack channel]"',
//   event_name: `Slack Messenger Error`,
//   username: "Slack Alert",
// });

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
    console.log({ error: "Too many requests. Try again later." });
    res.end();
    return;
  }

  if (tracker.timeout) clearTimeout(tracker.timeout);

  tracker.timeout = setTimeout(() => {
    delete requestCounts[clientIP];
  }, TIMEOUT_MS);

  next();
};
