import { envConfig } from "../config/envConfig";

export const integrationJson = {
  data: {
    date: {
      created_at: "2025-02-19",
      updated_at: "2025-02-19",
    },
    descriptions: {
      app_name: "Slack Alert",
      app_description:
        "An Alert system: \nThis integration listens to messages posted in a designated Slack Announcements channel and forwards them to another system via a webhook or API. This logs only the slack announcement channel messages. Expect other channels included in the next versions of this integration. \n\nYou can go on to the settings to set configurations necessary for this integration to work seamlessly. Here are descriptions of what you would find and the expected values: \n\n1) Channel Id - The software channel id where the integration would log the messages. \n2) Channel webhook - The software webhook base-url that the integration would send to. \n3) Slack Bot Token - You are expected have a slack bot in your slack workspace and have generated a bot_token. \n4) Slack Channel Id - The id to the announcement channel in your slack workspace. \n5) Slack APi Webwook - The slack webhook base-url",
      app_logo: "https://img.icons8.com/nolan/64/slack-new.png",
      app_url: "https://slack-messenger.onrender.com/",
      background_color: "#fff",
    },
    is_active: true,
    integration_type: "modifier",
    integration_category: "Email & Messaging",
    key_features: ["Log Slack announcement channel messages"],
    author: "Diligwe",
    settings: [
      {
        label: "channel",
        type: "text",
        required: true,
        default: "/slack-announcements",
      },
      {
        label: "channel_id",
        type: "text",
        required: true,
        default: "",
      },
      {
        label: "channel_webhook",
        type: "text",
        required: true,
        default: "",
      },
      {
        label: "slack_bot_token",
        type: "text",
        required: true,
        default: "",
      },
      {
        label: "slack_channel_id",
        type: "text",
        required: true,
        default: "",
      },
      {
        label: "slack_api_webhook",
        type: "text",
        required: true,
        default: "",
      },
    ],
    target_url: envConfig.TARGET_URL,
  },
};
