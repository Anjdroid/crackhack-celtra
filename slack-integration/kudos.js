const axios = require('axios');
const qs = require('querystring');
const users = require('./users');
const channels = require('./channels');

const token = "xoxp-462015900486-460518187139-460637141554-a3ffd91059caf527bc8f11265d1665d9";

const sendKudosAsMessage = (kudos) => {

  // send kudos as message into #project channel
  axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
    token: token,
    channel: kudos.project,
    as_user: true,
    text: `<@${kudos.toWho}> received kudos from <@${kudos.userId}>!`,
    attachments: JSON.stringify([
      {
        fields: [
          {
            text: "*Kudos:* "+kudos.text,
          },
          {
            value: kudos.description || 'None provided',
          },
          {
            value: "*Project: *"+`<#${kudos.project}>`,
          },
          {
            value: "*To whom it may concern:* "+`<@${kudos.toWho}>`,
          }
        ],
        color: "#7CD197",
      },
    ]),
  })).then((result) => {
    console.log("Message sent to channel: ", result.data);
  }).catch((err) => {
    console.error(err);
  });

  // send kudos as message to receiving @user chat
  axios.post('https://slack.com/api/chat.postMessage', qs.stringify({
    token: token,
    channel: kudos.toWho,
    as_user: true,
    text: `You received kudos from <@${kudos.userId}>!`,
    attachments: JSON.stringify([
      {
        fields: [
          {
            text: "*Kudos:* "+kudos.text,
          },
          {
            value: kudos.description || 'None provided',
          },
          {
            value: "*Project: *"+`<#${kudos.project}>`,
          },
          {
            value: "*To whom it may concern:* "+`<@${kudos.toWho}>`,
          }
        ],
        color: "#7CD197",
      },
    ]),
  })).then((result) => {
    console.log("Message sent to receiving user: ", result.data);
  }).catch((err) => {
    console.error(err);
  });
};

// Create kudos
const create = (userId, submission) => {
  const kudos = {};
  kudos.userId = userId;
  kudos.text = submission.text;
  kudos.description = submission.description;
  kudos.project = submission.project;
  kudos.toWho = submission.toWho;
  sendKudosAsMessage(kudos);
  return kudos;
};

module.exports = { create, sendKudosAsMessage };