# 📨 Slack Announcement Channel Integration

🚀 **Automate and Forward Slack Announcements to Another Software**

This integration listens to messages posted in a designated Slack **#announcements** channel and forwards them to another system via a webhook or API.

## 📌 Features

- ✅ Fetch messages from Slack’s **#announcements** channel
- ✅ Filter messages based on time or specific keywords
- ✅ Forward messages to an external API or database
- ✅ Handle retries for failed message deliveries
- ✅ Secure authentication with Slack OAuth tokens

## 🛠️ Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/slack-announcement-integration.git
   cd slack-announcement-integration

   ```

2. **Install Dependencies**

   ```bash
   npm install

   ```

3. **Set Up Environment Variables**
   PORT=port-number
   TARGET_URL=https://slack-messenger.onrender.com/integration/slack-messages
   TELEX_CHANNEL_ID=
   TELEX_CHANNEL_WEBHOOK=
   SLACK_BOT_TOKEN=
   SLACK_CHANNEL_ID=
   SLACK_API_WEBHOOK=

## 🚀 Usage

1.  Start Application

    ```bash
    npm start

    ```

2.  Fetch Messages Manually

    - Request Type:

      ```
      {
        channel_id: string;
        settings:{
          label: string;
          type: "text";
          description: string;
          default: string;
          required: boolean;
        };
        message: string;
      };
      ```

    - Response Type:
      ```
      {
          message: string;
          status: string;
          event_name: string;
          username: string;
      }
      ```

## 🔗 End Points

- GET https://slack-messenger.onrender.com/integration/slack-messages  
   Fetches messages from the announcement channel on slack

## ⚙️ Configuration

- SLACK_BOT_TOKEN: Required to authenticate API requests from Slack
- SLACK_CHANNEL_ID: Specifies which Slack channel to monitor
- SLACK_API_WEBHOOK: The Slack api url
- Designated Channel ID (TELEX_CHANNEL_ID): The external system where messages are forwarded
- Channel Webhook (TELEX_CHANNEL_WEBHOOK): The external system where messages are forwarded

## 🔒 Security Considerations

- Store credentials securely in environment variables
- Implement rate limiting to avoid API abuse

## 🛠️ Built With

- Node.js & Express - Backend API
- Slack API - Fetching and processing messages
- Axios - Handling API requests
- Dotenv - Managing environment variables

## 📜 License

This project is licensed under the MIT License – feel free to modify and use it.
