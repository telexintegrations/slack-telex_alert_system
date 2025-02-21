import express, { Express, Request, Response } from "express";
import { envConfig } from "./config/envConfig";
import integrationRouter from "./routes/telex-config.route";
import cors from "cors";

const app: Express = express();

app.set("trust proxy", 1);

app.use(cors<Request>());
app.use(express.json());

// app.use((req, res, next) => {
//   req.setTimeout(5000, () => {
//     res.status(408).send("Request Timeout");
//   });
//   next();
// });

// interface RequestTracker {
//   count: number;
//   timeout?: NodeJS.Timeout;
// }

// const requestCounts: Record<string, RequestTracker> = {};
// const MAX_REQUESTS = 1; // Max allowed requests
// const TIMEOUT_MS = 30_000; // Reset after 10 seconds

// const requestLimiter: express.RequestHandler = (req, res, next) => {
//   const clientIP = req.ip || "unknown";

//   if (!requestCounts[clientIP]) {
//     requestCounts[clientIP] = { count: 0 };
//   }

//   const tracker = requestCounts[clientIP];
//   tracker.count += 1;

//   if (tracker.count > MAX_REQUESTS) {
//     res.status(429).json({ error: "Too many requests. Try again later." });
//     return; // Explicitly stop execution here
//   }

//   if (tracker.timeout) clearTimeout(tracker.timeout);

//   tracker.timeout = setTimeout(() => {
//     delete requestCounts[clientIP];
//   }, TIMEOUT_MS);

//   next();
// };

// app.use(requestLimiter);

app.use("/integration", integrationRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({ statusCode: 200, message: "success" });
});

const PORT = envConfig.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
