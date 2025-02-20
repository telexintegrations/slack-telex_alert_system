import { Request, Response, Router } from "express";
import { integrationJson } from "../data/telexJsonData";

const integrationRouter = Router();

integrationRouter.get("/telex-config", (req: Request, res: Response) => {
  try {
    res.status(200).json(integrationJson);
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: "Failed to read json data" });
  }
});

export default integrationRouter;
