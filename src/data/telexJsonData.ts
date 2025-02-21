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
        "An Alert system that sends important messages to Telex channels",
      app_logo:
        "https://cdn.pixabay.com/photo/2015/06/12/18/31/cute-807306_1280.png",
      app_url: "https://slack-messenger.onrender.com/",
      background_color: "#fff",
    },
    is_active: true,
    integration_type: "modifier",
    integration_category: "Email & Messaging",
    key_features: ["log important information"],
    author: "Diligwe",
    settings: [
      {
        label: "channel",
        type: "text",
        required: true,
        default: "/slack-announcements",
      },
    ],
    target_url: envConfig.TARGET_URL,
  },
};
