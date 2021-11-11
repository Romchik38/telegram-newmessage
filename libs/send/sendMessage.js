'use strict';

const exampleAnswer = {
  telegramMethod: 'sendMessage',
  answer: {
    chat_id: 'some_chat_id',
    text: 'Ваш текст',
    parse_mode: 'html',
    reply_markup: { keyboard: [['home']] }
  }
};

const headers = {
  'Content-Type': 'application/json',
};

const sendMessage = async data => ({
  data: JSON.stringify(data),
  headers
});

module.exports = sendMessage;
