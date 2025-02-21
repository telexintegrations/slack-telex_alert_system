import express, { Request, Response, Router } from "express";
import { integrationJson } from "../data/telexJsonData";
import { handleIncomingMessageService } from "../service/integration.service";
import { ResponsePayloadType } from "../types/integration.types";
import { TelexApiCLient } from "../config/api";
import { envConfig } from "../config/envConfig";
import { requestLimiter } from "../middleware/rateLimit.middleware";

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
  requestLimiter,
  async (req: Request, res: Response<any>) => {
    try {
      const { body } = req;
      console.log(`reqBody: ${JSON.stringify(req.body)}`);
      if (!/(\/slack-)/gi.test(body.message)) {
        res.end();
        return;
      }

      const response = await handleIncomingMessageService(body);

      if (response.status == "error") {
        await TelexApiCLient.post(envConfig.TELEX_CHANNEL_ID, response);

        res.end();
        return;
      } else {
        console.log(`Response to Telex: ${JSON.stringify(response)}`);
        const telexResponse = await TelexApiCLient.post(
          envConfig.TELEX_CHANNEL_ID,
          response
        );

        console.log(
          `Response from Telex: ${JSON.stringify(telexResponse.data)}`
        );
        res.end();
        return;
      }
    } catch (error) {
      console.log(error);
      res.end();
      return;
    }
  }
);

export default integrationRouter;
