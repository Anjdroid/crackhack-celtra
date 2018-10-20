# Slack integration

## Setup

#### Setup the server with
```bash
npm install
npm run dev
```

#### Setup `ngrok` proxy.
* [Download](https://ngrok.com/download)
* Unzip it
* Run
```bash
./ngrok http 8000
```

#### Setup Slack
* Create a new Slack app https://api.slack.com/apps
* Get OAuth token by opening `Install app` in your apps settings
* Enable the feature you need and you are good to go :)

## Resources
* [Slack API](https://api.slack.com/)
* [Using ngrok with Slack](https://api.slack.com/tutorials/tunneling-with-ngrok)
* [Slack message builder](https://api.slack.com/docs/messages/builder)