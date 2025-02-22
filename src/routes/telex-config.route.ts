import express, { Request, Response, Router } from "express";
import { integrationJson } from "../data/telexJsonData";
import { handleIncomingMessageService } from "../service/integration.service";
import { ResponsePayloadType } from "../types/integration.types";
import { TelexApiCLient } from "../config/api";
import { envConfig } from "../config/envConfig";
import { requestLimiter } from "../middleware/rateLimit.middleware";
import logger from "../config/logger";

const integrationRouter = Router();

integrationRouter.get("/telex-config", (_req: Request, res: Response<any>) => {
  try {
    res.status(200).json(integrationJson);
  } catch (error) {
    logger.error(error);

    res.status(400).json({ error: "Failed to read json data" });
  }
});

integrationRouter.post(
  "/slack-messages",
  requestLimiter,
  async (req: Request, res: Response<any>) => {
    try {
      const { body } = req;
      logger.info(`REQBODY`, req.body);
      const expectedPromptPattern = /(\/+slack-)/gi;
      if (!expectedPromptPattern.test(body.message)) {
        res.end();
        return;
      }

      const response = await handleIncomingMessageService(body);

      if (response.status == "error") {
        await TelexApiCLient.post(envConfig.TELEX_CHANNEL_ID, response);

        // res.json(response);
        res.end();
        return;
      } else {
        logger.info(`RESPONSE TO TELEX:`, { response });
        const telexResponse = await TelexApiCLient.post(
          envConfig.TELEX_CHANNEL_ID,
          response
        );

        logger.info(`RESPONSE FROM TELEX:`, {
          telexResponseData: telexResponse.data,
        });
        // res.json(response);
        res.end();
        return;
      }
    } catch (error) {
      logger.error(error);
      res.end();
      return;
    }
  }
);

export default integrationRouter;
