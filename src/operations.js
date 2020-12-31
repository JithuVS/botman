const api = require('./verify');
const payloads = require('./components');
const fs = require('fs');
const path = require('path');

const loadFile = (filename) => {
  try{
    const dataBuffer = fs.readFileSync(filename),
    dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  }
  catch(e){
      return [];
  }
}

const getData = (urgency) => {
  let current_datetime = new Date(),
  formatted_date = current_datetime.getDate() +''+ (current_datetime.getMonth() + 1) +''+ current_datetime.getFullYear();

  let filename = path.join(__dirname, '../logs', urgency + formatted_date + '.txt');
  return loadFile(filename);
}

const checkAndWriteLogs = async(report) => {
  let current_datetime = new Date(),
  formatted_date = current_datetime.getDate() +''+ (current_datetime.getMonth() + 1) +''+ current_datetime.getFullYear();

  let filename = path.join(__dirname, '../logs', report.urgency + formatted_date + '.txt');
  
  let data = loadFile(filename);
  data.push(report);
  fs.writeFileSync(filename, JSON.stringify(data));  
} 

const sendConfirmation = async (report) => {
  let channel = await api.callAPIMethod('conversations.open', {
    users: report.userId
  })

  let message = payloads.confirmation({
    channel_id: channel.channel.id,
    title: report.title,
    description: report.description,
    urgency: report.urgency
  });

  let result = await api.callAPIMethod('chat.postMessage', message);
};

const create = async (userId, view) => {
  let values = view.state.values;
  let result = await api.callAPIMethod('users.info', {
    user: userId
  });

  let report = {
    userId,
    title: values.title_block.title.value,
    description: values.description_block.description.value || '_empty_',
    urgency: values.urgency_block.urgency.selected_option && values.urgency_block.urgency.selected_option.text.text || 'not assigned'
  };

  checkAndWriteLogs(report);
  await sendConfirmation(report);
};

module.exports = { create, sendConfirmation, getData };
