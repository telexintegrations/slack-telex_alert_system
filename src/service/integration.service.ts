import {
  IntegrationSettingType,
  RequestPayloadType,
  SlackConfigType,
} from "../types/integration.types";
import { SlackApiCLient } from "../config/api";
import { formatDate, getUnixTimestamp } from "../utils/date.utils";
import logger from "../config/logger";
import {
  isValidSlackCommand,
  stripHtmlTags,
} from "../utils/stringFormatter.utils";

const targetedSlackChannels = (
  settings: IntegrationSettingType[]
): string[] => {
  const allowedSlackChannels = settings.reduce(
    (channelsArr: string[], setting: IntegrationSettingType) => {
      if (setting.label === "channel") {
        const channelName = setting.default.split("-")[1];
        channelsArr = [...channelsArr, channelName];
      }

      return channelsArr;
    },
    []
  );

  logger.info(`ALLOWEDCHANNELS`, { allowedSlackChannels });

  return allowedSlackChannels;
};

const getSlackConfigFromSettings = (
  settings: IntegrationSettingType[]
): SlackConfigType => {
  logger.info(`SLACKSETTINGS 1:`, { settings });
  const slackConfig = settings.reduce<SlackConfigType>(
    (slackConfigObj: SlackConfigType, setting: IntegrationSettingType) => {
      logger.info(`SLACKSETTINGS 2:`, { setting });
      logger.info(`SLACKSETTINGS TEST:`, {
        StartsWith: /^slack/gi.test(setting.label),
      });
      if (/^slack/gi.test(setting.label)) {
        logger.info(`SLACKSETTINGS_LABEL:`, { settingLabel: setting.label });

        slackConfigObj = {
          ...slackConfigObj,
          [setting.label]: setting.default,
        };
      }

      return slackConfigObj;
    },
    { slack_bot_token: "", slack_channel_id: "", slack_api_webhook: "" }
  );

  return slackConfig;
};

const getMessagesFromSlack = async (slackConfig: SlackConfigType) => {
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  logger.info(
    `SLACKCONFIG:`,
    { slackConfig },
    `TIME: ${getUnixTimestamp(oneDayAgo)},${getUnixTimestamp(now)}`
  );

  const slackResponse = await SlackApiCLient(slackConfig.slack_api_webhook).get(
    "conversations.history",
    {
      headers: { Authorization: `Bearer ${slackConfig.slack_bot_token}` },
      params: {
        channel: slackConfig.slack_channel_id,
        limit: 5,
        // oldest: getUnixTimestamp(oneDayAgo).toFixed(6),
        // latest: getUnixTimestamp(now),
      },
      paramsSerializer: (params) => {
        return Object.entries(params)
          .map(([key, val]) => `${key}=${encodeURIComponent(val as string)}`)
          .join("&");
      },
    }
  );

  const textToTelex: string[] = slackResponse.data.messages.reduce(
    (msgArr: any, msgData: any) => {
      if (msgData.client_msg_id) {
        const timeStamp = msgData.ts * 1000;
        const formattedTimeStamp = formatDate(new Date(timeStamp));
        const slackText = `✅ ${formattedTimeStamp}\n${msgData.text}\n\n\n`;
        msgArr = [...msgArr, slackText];
      }

      return msgArr;
    },
    []
  );

  return textToTelex;
};

export const handleIncomingMessageService = async (
  reqBody: RequestPayloadType
) => {
  try {
    const isValidPrompt: boolean = isValidSlackCommand(reqBody.message);

    logger.info(`IsValidPrompt:`, { isValidPrompt });
    if (!isValidPrompt) {
      return {
        status: "error",
        message:
          '❌ Invalid Prompt. \nMessage Prompt - Should be in this format: "/slack-[slack channel]"',
        event_name: `Slack Messenger Error`,
        username: "Slack Alert",
      };
    }

    const refinedPrompt: string = stripHtmlTags(reqBody.message);
    const channelFromPrompt: string = refinedPrompt.split("-")[1];
    logger.info(`channelPrompt:`, { channelFromPrompt });

    const allowedSlackChannels: string[] = targetedSlackChannels(
      reqBody.settings
    );

    if (!allowedSlackChannels.includes(channelFromPrompt)) {
      logger.info(`ChannelNotAllowed:`, { channelFromPrompt });
      return {
        status: "error",
        message:
          "❌ Invalid Prompt. \nSlack Channel - Check settings for allowed slack channels",
        event_name: `Slack Messenger Error`,
        username: "Slack Alert",
      };
    }

    logger.info(
      `IsAllowedChannels:`,
      allowedSlackChannels.includes(channelFromPrompt)
    );

    const slackConfig: SlackConfigType = getSlackConfigFromSettings(
      reqBody.settings
    );

    const slackMessages: string[] = await getMessagesFromSlack(slackConfig);

    logger.info(`SLACKMESSAGES`, slackMessages);

    return {
      status: "success",
      message: slackMessages.join(","),
      event_name: `Slack ${channelFromPrompt}`,
      username: "Slack Alert",
    };
  } catch (error) {
    logger.info(`Service Error:`, { error });

    return {
      status: "failed",
      message: "Internal Server Error",
      event_name: `Slack Messenger Error`,
      username: "Slack Alert",
    };
  }
};
