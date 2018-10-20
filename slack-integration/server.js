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
            url: 'https://slack.com/api/oauth.access',
            qs: {code: req.query.code, client_id: clientId, client_secret: clientSecret},
            method: 'GET', 

        }, function (error, response, body) {
            if (error) {
                console.log(error);
            } else {
                res.json(body);

            }
        })
    }
});

app.post('/kudos', function(req, res) {
    const { text, trigger_id } = req.body;

    // create dialog for kudos
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
            hint: 'Write something nice about your fellow co-worker.',
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

    // open dialog for creating kudos
    axios.post('https://slack.com/api/dialog.open', qs.stringify(dialog))
      .then((result) => {
        res.send('');
      }).catch((err) => {
        console.log("500")
        res.sendStatus(500);
      });
  
});

// create kudos and send it as a message using the interactive slack component
app.post('/interactive', (req, res) => {
  const body = JSON.parse(req.body.payload);
   res.send('');
  // create kudos
  kudos.create(body.user.id, body.submission);
});


app.post('/testCommand', function(req, res) {
    res.send('Receiving your test command!');
});