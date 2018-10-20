const axios = require('axios');
const qs = require('querystring');

const token = "xoxp-462015900486-460518187139-460637141554-a3ffd91059caf527bc8f11265d1665d9";

const promise = require('bluebird');

const options = {
    promiseLib: promise
};

const pgp = require('pg-promise')(options);
const db = pgp("postgres://pad-por:pad-por@localhost:5432/postgres");

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

function createKudos(req, res, next, body) {

  console.log(req);
    db.one(
        'insert into kudos("beneficiary", "endorser", "message") ' +
        ' values(${beneficiary}, ${endorser}, ${message}) RETURNING id', body)
    .then(function (data) {
      console.log(data);
        res.status(200).json({
            id: data.id
        });
    }).catch(function (err) {
      console.log(err);
        //return next();
    });
};

const sendDataToBackend = (kudos) => {
  console.log("This is the path to the dark side.");
  /*const body = {
    beneficiary: kudos.toWho,
    endorser: kudos.userId,
    message: kudos.text,
  }*/
  const body = {
    beneficiary: "842eb6f0-e5ae-4754-9440-d0e96dcb5cef",
    endorser: "0fe03757-1191-472d-bde9-d69a274cb785",
    message: kudos.text,
  }
  createKudos(body);

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
  sendDataToBackend(kudos);
  return kudos;
};

module.exports = { 
  create, 
  sendKudosAsMessage };