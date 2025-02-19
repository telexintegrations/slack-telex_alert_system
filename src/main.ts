import express, { Express, Request, Response } from "express";
import { envConfig } from "./config/envConfig";
import integrationRouter from "./routes/telex-config.route";

const app: Express = express();

app.use(express.json());

app.use("/integration", integrationRouter);

app.get("/", (req: Request, res: Response) => {
  res.send({ statusCode: 200, message: "success" });
});

const PORT = envConfig.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
