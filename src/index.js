const express = require('express');
const bodyParser = require('body-parser');
const report = require('./operations');
const api = require('./verify');
const payloads = require('./components');
const app = express();
let allowedtext = ['high', 'medium', 'low'];

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.post('/command', async (req, res) => {  
  if (!api.isVerified(req)) {
    console.log('Verification token mismatch');
    return res.status(404).send();
  }

  const { trigger_id, command, text, channel_id } = req.body;
  if(command == '/report'){  
    let view = payloads.modal({
      trigger_id
    });
    let result = await api.callAPIMethod('views.open', view);
    return res.send('');
  }

  else if(command == '/severity'){
    if(allowedtext.includes(text.toString().toLowerCase())){

      // <@${payload.event.user}>
      let data = report.getData(text), temp = '';
      for(let i=0; i<data.length; i++){
          temp += `Title:${data[i].title} \n Description:${data[i].description}\n\n\n`;
      }

      let message = payloads.severity({
        channel_id: channel_id,
        data: temp,
        urgency: text
      });
      let result = api.callAPIMethod('chat.postMessage', message);
      return res.send('');
    }    
  }
  
});


app.post('/interactive', (req, res) => {
  if (!api.isVerified(req)) {
    console.log('Verification token mismatch');
    return res.status(404).send();
  }
  const body = JSON.parse(req.body.payload);
  res.send('');
  report.create(body.user.id, body.view);
});

app.post("/", function(req, res, next) {
  let payload = req.body;
  if (payload.type === "url_verification") {
    let data = {};
    data.challenge = payload.challenge;
    res.send(data);
  }
  else
  if (payload.event.type === "app_mention") {
     let result = api.callAPIMethod('chat.postMessage', {channel: payload.event.channel, text: `Welcome <@${payload.event.user}>`});
     return res.send('');
  }
});

const server = app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
