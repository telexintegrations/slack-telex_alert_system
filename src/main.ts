import express, { Express, Request, Response } from "express";
import { envConfig } from "./config/envConfig";
import integrationRouter from "./routes/telex-config.route";
import cors from "cors";

const app: Express = express();

app.set("trust proxy", 1);

app.use(cors<Request>());
app.use(express.json());

app.use((req, res, next) => {
  req.setTimeout(5000, () => {
    res.status(408).send("Request Timeout");
  });
  next();
});

app.use("/integration", integrationRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({ statusCode: 200, message: "success" });
});

const PORT = envConfig.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
