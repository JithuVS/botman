const axios = require('axios');
const qs = require('querystring');
const apiUrl = 'https://slack.com/api';
const crypto = require('crypto');
const timingSafeCompare = require('tsscmp');

const callAPIMethod = async (method, payload) => {
    let data = Object.assign({ token: 'yourtoken' }, payload);
    let result = await axios.post(`${apiUrl}/${method}`, qs.stringify(data));
    return result.data;
}

const isVerified = (req) => {
  const signature = req.headers['x-slack-signature'];
  const timestamp = req.headers['x-slack-request-timestamp'];
  const hmac = crypto.createHmac('sha256', 'yoursecretsigninkey');
  const [version, hash] = signature.split('=');
  const fiveMinutesAgo = ~~(Date.now() / 1000) - (60 * 5);
  if (timestamp < fiveMinutesAgo) return false;

  hmac.update(`${version}:${timestamp}:${req.rawBody}`);
  return timingSafeCompare(hmac.digest('hex'), hash);
};

module.exports = {
    callAPIMethod, isVerified
}