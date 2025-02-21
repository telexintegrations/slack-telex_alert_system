import { Application, Request, Response, Router } from "express";
import { integrationJson } from "../data/telexJsonData";
import { handleIncomingMessageService } from "../service/integration.service";
import { ResponsePayloadType } from "../types/integration.types";
import { TelexApiCLient } from "../config/api";
import { envConfig } from "../config/envConfig";
import rateLimiter from "../middleware/rateLimit.middleware";

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
  rateLimiter,
  async (req: Request, res: Response<any>) => {
    try {
      const { body } = req;
      console.log(`reqBody: ${JSON.stringify(req.body)}`);
      if (!/^\/slack/gi.test(body.message)) return;

      const response = await handleIncomingMessageService(body);

      if (response.status == "error") {
        const telexResponse = await TelexApiCLient.post(
          envConfig.TELEX_CHANNEL_ID,
          response
        );

        // if (telexResponse.data.status == "success") {
        //   return;
        // }
      } else {
        console.log(`Response to Telex: ${JSON.stringify(response)}`);
        const telexResponse = await TelexApiCLient.post(
          envConfig.TELEX_CHANNEL_ID,
          response
        );

        console.log(
          `Response from Telex: ${JSON.stringify(telexResponse.data)}`
        );

        // if (telexResponse.data.status == "success") {
        //   res.status(200).json(response);
        // }
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
);

export default integrationRouter;
