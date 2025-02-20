import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 6 * 1000,
  max: 2,
  message: JSON.stringify({
    status: "success",
    message:
      'Invalid Prompt. \nMessage Prompt - Should be in this format: "/slack-[slack channel]"',
    event_name: `Slack Messenger Error`,
    username: "Slack Alert",
  }),
  headers: true,
});

export default rateLimiter;
