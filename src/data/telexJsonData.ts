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
        "An Alert system - \nThis integration checks for trigger commands such as ``/slack_announcements`` made on your channel and fetches messages from the designated Slack channel and forwards them to your system via a webhook or API. This works only for the slack announcement channel messages in this version. \n\nYou can go on to the settings to set configurations necessary for this integration to work seamlessly.",
      app_logo: "https://img.icons8.com/nolan/64/slack-new.png",
      app_url: "https://slack-messenger.onrender.com/",
      background_color: "#fff",
    },
    is_active: true,
    integration_type: "modifier",
    integration_category: "Email & Messaging",
    key_features: [
      "Log Slack announcement channel messages",
      "Accepts configurations to target different slack channels.",
      " Here are descriptions of what you would find and the expected values: \n\n1) Channel Id - The software channel id where the integration would log the messages. Add to environment variable \n2) Channel webhook - The software webhook base-url that the integration would send to. Add to environment variable \n3) Slack Bot Token - You are expected have a slack bot in your slack workspace and have generated a bot_token. Go to settings \n4) Slack Channel Id - The id to the announcement channel in your slack workspace. Go to settings. \n5) Slack APi Webwook - The slack webhook base-url. Go to settings",
    ],
    author: "Diligwe",
    settings: [
      {
        label: "channel",
        type: "text",
        required: true,
        default: "/slack-announcements",
      },
      {
        label: "slack_bot_token",
        type: "text",
        required: true,
        default: envConfig.SLACK_BOT_TOKEN,
      },
      {
        label: "slack_channel_id",
        type: "text",
        required: true,
        default: envConfig.SLACK_CHANNEL_ID,
      },
      {
        label: "slack_api_webhook",
        type: "text",
        required: true,
        default: envConfig.SLACK_API_WEBHOOK,
      },
    ],
    target_url: envConfig.TARGET_URL,
  },
};
