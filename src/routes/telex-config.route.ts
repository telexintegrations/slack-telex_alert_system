import { Application, Request, Response, Router } from "express";
import { integrationJson } from "../data/telexJsonData";
import { handleIncomingMessageService } from "../service/integration.service";
import { ResponsePayloadType } from "../types/integration.types";

const integrationRouter = Router();

integrationRouter.get("/telex-config", (_req: Request, res: Response<any>) => {
  try {
    res.status(200).json(integrationJson);
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: "Failed to read json data" });
  }
});

integrationRouter.post(
  "/slack-messages",
  (req: Request, res: Response<any>) => {
    try {
      const { body } = req;
      console.log(req.body);

      const response = handleIncomingMessageService(body);

      if (response.status == "failed") {
        res.status(400).json(response);
      } else {
        console.log(`Response back to Telex: ${JSON.stringify(response)}`);
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default integrationRouter;
