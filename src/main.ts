import express, { Express, Request, Response } from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send({ statusCode: 200, message: "success" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
