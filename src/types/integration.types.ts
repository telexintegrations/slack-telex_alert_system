export type IntegrationSettingType = {
  label: string;
  type: "text";
  description: string;
  default: string;
  required: boolean;
};

export type RequestPayloadType = {
  channel_id: string;
  settings: IntegrationSettingType[];
  message: string;
};

export type ResponsePayloadType = {
  message: string;
  status: string;
  event_name: string;
  username: string;
};

export type SlackConfigType = {
  slack_bot_token: string;
  slack_channel_id: string;
  slack_api_webhook: string;
};
