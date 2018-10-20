const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

const token = "{{YOUR_TOKEN}}"
const port = 8000

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.post('/event', (req, res) => {
    if (req.body.type === "url_verification") {
        res.send(req.body.challenge)
    } else {
        channel = req.body.event.channel
        timestamp = req.body.event.event_ts

        request({
            url: `https://slack.com/api/chat.delete?token=${token}&channel=${channel}&ts=${timestamp}&as_user=false&pretty=1`,
            method: "POST",
            json: true
        }, function (error, response, body) {
            console.log(response.body)
        })

        res.send("OK")
    }
})

// Interactive components
app.post('/slack/ready2hack', (req, res) => {
    // Show options
    if (req.body.command) {
        res.send({
            "text": "Are you ready for Celtra Hackaton?",
            "attachments": [
                {
                    "text": "",
                    "fallback": "",
                    "callback_id": "wopr_game",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "hackaton",
                            "text": "Yes",
                            "type": "button",
                            "value": "ready"
                        },
                        {
                            "name": "hackaton",
                            "text": "I need a coffee",
                            "type": "button",
                            "value": "coffee"
                        }
                    ]
                }
            ]
        })
    } else {
        var payload = JSON.parse(req.body.payload)

        if (payload.actions[0].value === "ready") {
            res.send({
                "attachments": [
                    {
                        "pretext": "All you need for Hackaton!",
                        "title": "GitHub repo with all showcases.",
                        "title_link": "https://github.com/a42m/hackaton",
                        "text": "Good luck :slightly_smiling_face: :tada: :bulb:",
                        "color": "#7CD197"
                    }
                ]
            })
        } else {
            res.send({
                "attachments": [{
                    "text": "You're welcome.",
                    "image_url": "https://diariesofthetravelingchic.files.wordpress.com/2013/06/i-love-coffee-coffee-25055460-1280-800.jpg"
                }]
            })
        }
    }

})

app.listen(port, () => {
    console.log('We are live on ' + port);
})
