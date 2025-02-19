import { Request, Response, Router } from "express";
import { integrationJson } from "../data/telexJsonData";
import { readFileSync } from "fs";
import path from "path";

const integrationRouter = Router();

integrationRouter.get("/telex-config", (req: Request, res: Response) => {
  //   const filePath = path.join(__dirname, "../data/telexIntegration.json");
  //   console.log(filePath);

  //   const jsonData = readFileSync(filePath, "utf-8");

  res.status(200).json(integrationJson);
});

export default integrationRouter;
