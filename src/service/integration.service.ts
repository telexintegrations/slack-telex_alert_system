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

    if (!isValidPrompt) {
      console.log(`IsValidPrompt: ${isValidPrompt}`);
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
    return {
      status: "success",
      message: "Everybody to Room9!",
      event_name: `Slack ${channelFromPrompt}`,
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
