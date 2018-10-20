const express = require('express')
const request = require('request')

const http = require('http')

const clientId = '462015900486.460444501812'
const clientSecret = '6e3eaaeedc75c380b00019a11ce3ba97'

const axios = require('axios');
const bodyParser = require('body-parser');
const qs = require('querystring');
const kudos = require('./kudos');
const users = require('./users');

const app = express()

const apiUrl = 'https://slack.com/api';

const token = "xoxp-462015900486-460518187139-460637141554-a3ffd91059caf527bc8f11265d1665d9"
const port = 8000

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.listen(port, function () {
    console.log("Server listening on: http://localhost:%s", port)
})

app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

app.get('/oauth', function(req, res) {
    if (!req.query.code) {
        res.status(500);
        res.send({"Error": "Looks like we're not getting code."});
        console.log("Looks like we're not getting code.");
    } else {
        request({
            url: 'https://slack.com/api/oauth.access', //URL to hit
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret}, //Query string data
            method: 'GET', //Specify the method

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});

// Route the endpoint that our slash command will point to and send back a simple response to indicate that ngrok is working
app.post('/command', function(req, res) {
    //console.log(text)
    //console.log(trigger_id)
    console.log(req.body)
    const { text, trigger_id } = req.body;

    const dialog = {
      token: token,
      trigger_id,
      dialog: JSON.stringify({
        title: 'GIVE KUDOS',
        callback_id: 'submit-kudos',
        submit_label: 'Submit',
        elements: [
          {
            label: 'Kudos text',
            type: 'text',
            name: 'text',
            value: text,
            hint: 'Thank you for working.',
          },
          {
            label: 'Description',
            type: 'textarea',
            name: 'description',
            optional: false,
          },
          {
            label: 'Project',
            type: 'select',
            name: 'project',
            data_source: "channels",
          },
          {
            label: 'To whom it may concern',
            type: 'select',
            name: 'toWho',
            data_source: "users",
          },
        ],
      }),
    };
    //console.log("before show DIALOG PLS")

    axios.post('https://slack.com/api/dialog.open', qs.stringify(dialog))
      .then((result) => {
        //debug('dialog.open: %o', result.data);
        //console.log("SHOW DIALOG PLS")
        //console.log(result.data)
        res.send('');
      }).catch((err) => {
        //debug('dialog.open call failed: %o', err);
        console.log("500")
        res.sendStatus(500);
      });
  
});

app.post('/interactive', (req, res) => {
  const body = JSON.parse(req.body.payload);

  //console.log("form submission YES ", body.submission.trigger_id)


    // immediately respond with a empty 200 response to let
    // Slack know the command was received
    res.send('');

    // create KUDOS
    console.log("BODY ", body);
    kudos.create(body.user.id, body.submission);
  //} else {
    //debug('Token mismatch');
   //res.sendStatus(404);
  //}
});


app.post('/testCommand', function(req, res) {
    res.send('Receiving your test command!');
});