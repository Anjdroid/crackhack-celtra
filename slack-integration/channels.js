const qs = require('querystring');
const axios = require('axios');

const token = "xoxp-462015900486-460518187139-460637141554-a3ffd91059caf527bc8f11265d1665d9"

const findChannel = (slackChannelId) => {
  const body = { token: token, user: slackChannelId };
  const promise = axios.post('https://slack.com/api/channels.list', qs.stringify(body));
  console.log("channel body ", body);
  return promise;
};

module.exports = { findChannel };