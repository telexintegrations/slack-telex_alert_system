import { Request, Response, Router } from "express";
import { integrationJson } from "../data/telexJsonData";
import { readFileSync } from "fs";
import path from "path";

const integrationRouter = Router();

integrationRouter.get("/telex-config", (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "../data/telexIntegration.json");
    console.log(filePath);

    const jsonData = JSON.parse(readFileSync(filePath, "utf-8"));

    res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: "Failed to read json data" });
  }
});

export default integrationRouter;
