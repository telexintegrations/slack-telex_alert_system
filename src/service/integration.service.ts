import {
  IntegrationSettingType,
  RequestPayloadType,
} from "../types/integration.types";
import { envConfig } from "../config/envConfig";
import { SlackApiCLient } from "../config/api";
import { formatDate } from "../utils/date.utils";

const slackChannels = (settings: IntegrationSettingType[]): string[] => {
  const allowedSlackChannels = settings.reduce(
    (channelsArr: string[], setting) => {
      if (setting.label === "channel") {
        const channelName = setting.default.split("-")[1];
        channelsArr = [...channelsArr, channelName];
      }

      return channelsArr;
    },
    []
  );

  console.log(allowedSlackChannels);

  return allowedSlackChannels;
};

export const handleIncomingMessageService = async (
  reqBody: RequestPayloadType
) => {
  try {
    const isValidPrompt = /\/slack-[a-z]*/gi.test(reqBody.message);

    console.log(`IsValidPrompt: ${isValidPrompt}`);
    if (!isValidPrompt) {
      return {
        status: "error",
        message:
          'Invalid Prompt. \nMessage Prompt - Should be in this format: "/slack-[slack channel]"',
        event_name: `Slack Messenger Error`,
        username: "Slack Alert",
      };
    }

    const refinedPrompt = reqBody.message.replace(/[<p>\/<\/p>]/gi, "");
    const channelFromPrompt = refinedPrompt.split("-")[1];
    console.log(`channelPrompt: ${channelFromPrompt}`);
    const allowedSlackChannels = slackChannels(reqBody.settings);

    if (!allowedSlackChannels.includes(channelFromPrompt)) {
      console.log(`ChannelNotAllowed: ${channelFromPrompt}`);
      return {
        status: "error",
        message:
          "Invalid Prompt. \nSlack Channel - Check settings for allowed slack channels",
        event_name: `Slack Messenger Error`,
        username: "Slack Alert",
      };
    }

    console.log(
      `IsAllowedChannels: ${allowedSlackChannels.includes(channelFromPrompt)}`
    );

    const slackResponse = await SlackApiCLient.get("conversations.history", {
      headers: { Authorization: `Bearer ${envConfig.SLACK_BOT_TOKEN}` },
      params: { channel: envConfig.SLACK_CHANNEL_ID, limit: 5 },
    });

    const textToTelex: string[] = slackResponse.data.messages.reduce(
      (msgArr: any, msgData: any) => {
        if (msgData.client_msg_id) {
          const timeStamp = msgData.ts * 1000;
          const formattedTimeStamp = formatDate(new Date(timeStamp));
          const slackText = `${formattedTimeStamp}\n${msgData.text}\n\n\n`;
          msgArr = [...msgArr, slackText];
        }

        return msgArr;
      },
      []
    );

    const messages = slackResponse.data.messages[0];
    const timeStamp = slackResponse.data.messages[0].ts * 1000;
    const formattedTimeStamp = formatDate(new Date(timeStamp));

    console.log(`SlackData: ${JSON.stringify(formattedTimeStamp)}`);

    return {
      status: "success",
      message: textToTelex.join(),
      event_name: `Slack ${channelFromPrompt}`,
      username: "Slack Alert",
    };
  } catch (error) {
    console.log(`Service Error: ${error}`);

    return {
      status: "failed",
      message: "Internal Server Error",
      event_name: `Slack Messenger Error`,
      username: "Slack Alert",
    };
  }
};
