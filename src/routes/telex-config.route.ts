import { Request, Response, Router } from "express";
import { integrationJson } from "../data/telexJsonData";
import { handleIncomingMessageService } from "../service/integration.service";

const integrationRouter = Router();

integrationRouter.get("/telex-config", (req: Request, res: Response) => {
  try {
    res.status(200).json(integrationJson);
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: "Failed to read json data" });
  }
});

integrationRouter.post("/slack-messages", (req: Request, res: Response) => {
  try {
    const { body } = req;
    console.log(req.body);

    const response = handleIncomingMessageService(body);

    if (response.status == 400) {
      res.status(400).json(response);
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default integrationRouter;
