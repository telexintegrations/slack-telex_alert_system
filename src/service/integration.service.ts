import {
  IntegrationSettingType,
  RequestPayloadType,
} from "../types/integration.types";

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

export const handleIncomingMessageService = (reqBody: RequestPayloadType) => {
  try {
    const isValidPrompt = /\/slack-[a-z]*/gi.test(reqBody.message);
    console.log(`IsValidPrompt: ${isValidPrompt}`);

    if (!isValidPrompt) {
      return {
        status: "failed",
        message: "Invalid Message Prompt",
        event_name: `Slack Messenger Error`,
        username: "Slack Alert",
      };
    }

    const channelPrompt = reqBody.message.split("-")[1];
    console.log(`channelPrompt: ${channelPrompt}`);
    const allowedSlackChannels = slackChannels(reqBody.settings);

    if (!allowedSlackChannels.includes(channelPrompt)) {
      return {
        status: "failed",
        message: "Invalid Slack Channel",
        event_name: `Slack Messenger Error`,
        username: "Slack Alert",
      };
    }

    // const ;
    return {
      status: "success",
      message: "Everybody to Room9!",
      event_name: `Slack ${channelPrompt}`,
      username: "Slack Alert",
    };
  } catch (error) {
    return {
      status: "failed",
      message: "Internal Server Error",
      event_name: `Slack Messenger Error`,
      username: "Slack Alert",
    };
  }
};
